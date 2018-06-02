//部门管理js add gbp

/**
 * 用户管理界面的js
 * 
 */
Ext.onReady(function(){
	var deptAndGroupsModel = Ext.define('userModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'dgId',type:'String'},
		        {name:'dgName',type:'String'},
		        {name:'operate',type:'String'},
		        {name:'operateTime',type:'Date'}
		       ]
	});
	
	var deptAndGroupStore = Ext.create('Ext.data.Store',{
		model:deptAndGroupsModel,
		id:"deptAndGroupsId",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showAllDept.do',
			reader:{
				type:'json',
				root: 'rows',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	var isEnableStore = Ext.create("Ext.data.Store", {
	    fields: ["Name", "isenaled"],
	    data: [
	        { Name: "可用", isenaled: 0 },
	        { Name: "不可用", isenaled: 1 }
	    ]
	});
	var mianTab = Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:deptAndGroupStore,
		height:580,
		columnLines: true,
		renderTo:Ext.getBody(),
		tbar:[
			{
				xtype:'label',
				text:'部门名称'
			},
			{
				xtype:'textfield',
				id:'dgName'
			},
			{
				text:'<span style="color:white;font-size:300">查询</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../images/minico/search.png',
				handler:function(){
					var username=Ext.getCmp('username').getValue();
					var phone=Ext.getCmp('phone').getValue();
					var isenable=Ext.getCmp('ComboBoxId').getValue();
					var email=Ext.getCmp('Email').getValue();
					var isenableSecond="second";//添加一个区分首次加载还是查询
					
					deptAndGroupStore.load({params:{username:username,phone:phone,isenable:isenable,isenableSecond:isenableSecond,email:email,start: 0, limit: 25}});	
				}
			},
			{
				text:'<span style="color:white;font-size:300">新增部门</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../images/minico/sign_add.png',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						id:"winCe",
					    title:'新增部门',       //弹出窗口内布局会充满整个窗口;
					    layout: "fit", 
					    modal: true, //是否模态窗口，默认为false
					    width:380,          //设置窗口大小;
					    height:280,
					    closeAction:'hide', //点击右上角关闭按钮后会执行的操作;
					   	closable:false,     //隐藏关闭按钮;
					    draggable:true,     //窗口可拖动;
					    resizable: false,
					    items:[addDeptPanelAddTab]        //默认会生成Ext.Panel类型的对象;并且随窗口大小改变而改变;
					  });
					  win.show();
				}
			}
		],
		selModel: Ext.create("Ext.selection.CheckboxModel", {
		    injectCheckbox: 1,//checkbox位于哪一列，默认值为0
		    mode: "multi",//multi,simple,single；默认为多选multi
		    checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
		    allowDeselect: true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
		    enableKeyNav: true
		}),
    	columns: [
    		{ header: '序号', xtype: 'rownumberer', width: 40,height:20, align: 'center', sortable: false },
    		{ text: 'id',dataIndex:'dgId',hidden:true},
    		{ text: '部门名称', dataIndex: 'dgName',align: 'center', sortable: false },
	        { text: '操作时间', dataIndex: 'operateTime',align: 'center', sortable: false },
	        { text: '操作人',dataIndex:'operate',align: 'center',width:70 },
	        {
	        	xtype:'gridcolumn',
	        	width:120,
	        	dataIndex: 'operate',
			    text: '操作栏',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var dgId = record.data.dgId;
			    	btnStr='<span>'+'<img src="../../images/minico/sign_remove.png" alt="删除" onclick=\"deleteDeptAndGroupInfo(\''+dgId+'\');\"/>'+'&nbsp;&nbsp;'+
			    	'<img src="../../images/minico/editor.png" alt="修改" onclick=\"openmsgs(\''+uid+'\');\"/></span>';  
			    	return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
                xtype: 'pagingtoolbar',
                store: deptAndGroupStore,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
           }],
       	listeners: {
                'itemclick': function(view, record, item, index, e) {
               	
                	}
                
            }	
	});
	//创建页面点击新增时弹出的window窗体的表单信息
	var addDeptPanelAddTab =new Ext.FormPanel({
		bodyStyle:'margin-top:2px',
		layoyt:'form',
		border:false,
		id:"formSubmitID",
		items:[{
			xtype:'textfield',
			fieldLabel:'部门名称',
			name:'dgName',
			anchor:"90%",  
            allowBlank:'部门名称不能为空'
		}],
		buttonAlign: 'center',
		buttons: [
        {
        	text:'<span style="color:white;font-size:300">保存</span>',
			style: 'background: #368ECE;border-color:#126DAF',
			icon: '../../images/minico/save.png',
            handler: function () {
            	var frm = Ext.getCmp("formSubmitID");
            	if (!frm.getForm().isValid()){
            		return;
            	}
            	frm.getForm().submit({
            		url:'/extjsSpringM/deptAction/addDeptInfoToDb.do',
            		method:'post',
            		success: function(form, action) {
			           Ext.Msg.alert('提示', '保存成功');
			           Ext.getCmp("winCe").close(this);
			           deptAndGroupStore.load();
			         },
			        failure: function(form, action) {
			             Ext.Msg.alert('提示', '原因如下：' + action.result.errors.info);
			        }
            		
            	});
            }
        }, {
        	text:'<span style="color:white;font-size:300">关闭</span>',
			style: 'background: #368ECE;border-color:#126DAF',
			icon: '../../images/minico/cancel.png',
            handler: function () {
            	Ext.getCmp("winCe").close(this);
            }
        }
      ]
	});
});
//删除部门或者组信息
function deleteDeptAndGroupInfo(value){
	Ext.Ajax.request({
		url:"/extjsSpringM/deptAction/deleteDeptAndGroupInfo.do",
		mehtod:'get',
		params:{
			dgId:value
		},
		success : function(response, options) {
			Ext.Msg.alert('提示', '删除成功');
			jiraStore.load();
		},
		failure : function(response, options) {
			Ext.Msg.alert('提示', '原因如下：' + action);
		}
	
	});
}

