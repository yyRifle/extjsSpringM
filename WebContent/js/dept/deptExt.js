//部门管理js add gbp

/**
 * 用户管理界面的js
 * 
 */
var deptAndGroupStore;
var iHBody;
var iWBody;
Ext.onReady(function(){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var deptAndGroupsModel = Ext.define('deptModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'dgId',type:'String'},
		        {name:'dgName',type:'String'},
		        {name:'dgType',type:'String'},
		        {name:'operate',type:'String'},
		        {name:'operateTime',type:'Date',convert:function(value){  
			            var createTime = Ext.Date.format(new Date(value),"Y-m-d H:i:s");
			            return createTime;  
		        }
		        }]
	});
	
	deptAndGroupStore = Ext.create('Ext.data.Store',{
		model:deptAndGroupsModel,
		id:"deptAndGroupsId",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showAllDept.do',
			reader:{
				type:'json',
				root: 'root',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	new Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:deptAndGroupStore,
		height:iHBody,
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
					var dgName=Ext.getCmp('dgName').getValue();
					deptAndGroupStore.load({params:{dgName:dgName,start: 0, limit: 20}});	
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
					    //closeAction:'hide', //点击右上角关闭按钮后会执行的操作;
					   	closable:false,     //隐藏关闭按钮;
					    draggable:true,     //窗口可拖动;
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
    		{ header: '序号', xtype: 'rownumberer', width:'3%',align: 'center', sortable: false},
    		{ text: 'id', dataIndex:'dgId',hidden:true},
    		{ text: '部门名称', dataIndex: 'dgName',width: '20%',align: 'center', sortable: false},
    		{ text: '部门类型', dataIndex: 'dgType',width: '20%',align: 'center', sortable: false,
    			renderer:function(value, metaData, record){
			    	var dgType = record.data.dgType;
			    	if ("common" == dgType) {
			    		return '<span>普通部门</span>';
			    	} else {
			    		return '<span>超管部门</span>';
			    	}
			    }
    		},
	        { text: '操作时间', dataIndex: 'operateTime',width: '20%',align: 'center', sortable: false},
	        { text: '操作人', dataIndex:'operate',width: '15%',align: 'center',width:70},
	        {
	        	header: '操作栏',
	        	dataIndex:'button',
	        	width: '10%',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var dgId = record.data.dgId;
			    	var btnStr='<span><img src="../../images/minico/sign_remove.png" alt="删除" onclick=\"deleteDeptAndGroupInfo(\''+dgId+'\');\"/></span>';  
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
	
	var isSuperManage = Ext.create("Ext.data.Store", {
		fields: ["isSuperName", "isSuperValue"],
		data: [
		       { isSuperName: "是超管部门/组", isSuperValue: "superDept" },
		       { isSuperName: "不是超管部门/组", isSuperValue: "common" }
		       ]
	});
	
	//创建页面点击新增时弹出的window窗体的表单信息
	var addDeptPanelAddTab =new Ext.FormPanel({
		bodyStyle:'margin-top:2px',
		layoyt:'form',
		border:false,
		id:"formSubmitID",
		closeAction: 'hide',
		items:[{
			xtype:'textfield',
			fieldLabel:'部门名称',
			name:'dgName',
			anchor:"90%",  
            allowBlank:'部门名称不能为空'
		},{
            xtype: "combobox",              //使用xtype定义
			name: "isSuperManage",                 //form提交时的名称
			fieldLabel: "是否是超管部门/组",             //显示的Label
			store: isSuperManage,             //绑定的Store
			editable: false,				//是否可编辑
			displayField: "isSuperName",           //显示的字段
			valueField: "isSuperValue",            //值的字段
			emptyText: "--请选择--",        //当没有值时的水印文字
			queryMode: "local",             //查询模式
			anchor:"90%",
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
			           Ext.Msg.alert('提示', '添加成功');
			           Ext.getCmp("winCe").hide();
			           deptAndGroupStore.load();
			         },
			        failure: function(form, action) {
			             Ext.Msg.alert('提示', '添加失败：');
			        }
            		
            	});
            }
        }, {
        	text:'<span style="color:white;font-size:300">关闭</span>',
			style: 'background: #368ECE;border-color:#126DAF',
			icon: '../../images/minico/cancel.png',
            handler: function () {
            	Ext.getCmp("winCe").hide();
            }
        }
      ]
	});
});
//删除部门或者组信息
function deleteDeptAndGroupInfo(value){
	Ext.MessageBox.confirm("提示", "你确定要删除此项？", function(btnId){
		if (btnId == "yes") {  
	        Ext.Ajax.request({
	        	url:"/extjsSpringM/deptAction/deleteDeptAndGroupInfo.do",
	        	mehtod:'get',
	        	params:{
	        		dgId:value
	        	},
	        	success : function(response, options) {
	        		Ext.Msg.alert('提示', '删除成功');
	        		deptAndGroupStore.load();
	        	},
	        	failure : function(response, options) {
	        		Ext.Msg.alert('提示', '删除失败');
	        	}
	        });
	    }  
	    else if (btnId == "no") {  
	       return;
	    }  
	});
}

