/**
 * 用户管理界面的js
 * 
 */
Ext.onReady(function(){
	var model = Ext.define('userModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'uid',type:'String'},
		        {name:'username',type:'String'},
		        {name:'nickname',type:'String'},
		        {name:'age',type:'int'},
		        {name:'phone',type:'String'},
		        {name:'isenable',type:'int'},
		        {name:'email',type:'String'},
		        {name:'addrid',type:'String'},
		        {name:'idCard',type:'String'}
		       ]
	});
	
	var userStore = Ext.create('Ext.data.Store',{
		model:model,
		id:"allUserStore",
		autoLoad: true,
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/userAction/showAllUser.do',
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
		store:userStore,
		height:580,
		columnLines: true,
		renderTo:Ext.getBody(),
    	//selType: "checkboxmodel",
		tbar:[
			{
				xtype:'label',
				text:'用户名'
			},
			{
				xtype:'textfield',
				id:'username'
			},
			{
				xtype:'label',
				text:'手机号码'
			},
			{
				xtype:'textfield',
				id:'phone'
			},
			{
				xtype:'label',
				text:'是否可用'
			},
			{
				xtype: "combobox",
				id:"ComboBoxId",
	            store: isEnableStore,
	            editable: false,
	            displayField: "Name",
	            valueField: "isenaled",
	            listeners : {//初始化赋值 给下拉框
			      afterRender : function(combo) {
			      	Ext.getCmp("ComboBoxId").setRawValue("可用");
			      	Ext.getCmp("ComboBoxId").setValue(0);
			      }
			   }
			},
			{
				xtype:'label',
				text:'Email'
			},
			{
				xtype:'textfield',
				id:'Email'
			},
			{
				xtype:'button',
				text:'查询',
				handler:function(){
					var username=Ext.getCmp('username').getValue();
					var phone=Ext.getCmp('phone').getValue();
					var isenable=Ext.getCmp('ComboBoxId').getValue();
					var email=Ext.getCmp('Email').getValue();
					var isenableSecond="second";//添加一个区分首次加载还是查询
					
					userStore.load({params:{username:username,phone:phone,isenable:isenable,isenableSecond:isenableSecond,email:email,start: 0, limit: 25}});	
				}
			},
			{
				xtype:'button',
				text:'新增',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						id:"winCe",
					    title:'新增用户',       //弹出窗口内布局会充满整个窗口;
					    layout: "fit", 
					    modal: true, //是否模态窗口，默认为false
					    width:380,          //设置窗口大小;
					    height:280,
					    closeAction:'hide', //点击右上角关闭按钮后会执行的操作;
					   	closable:false,     //隐藏关闭按钮;
					    draggable:true,     //窗口可拖动;
					    resizable: false,
					    items:[addUserPanelAddTab]        //默认会生成Ext.Panel类型的对象;并且随窗口大小改变而改变;
					  });
					  win.show();
				}
			},{
				xtype:'button',
				text:'删除(可批量)',
				handler:function(){
					var grid = Ext.getCmp('mianTabId');
					var records = grid.getSelectionModel().getSelection();
					var ids = "";
					Ext.Array.forEach(records,function(item){
					   var uids = item.data.uid;
					   console.log(uids)
					   ids +=uids+",";
					});
					console.log("ids:"+ids);
					Ext.Ajax.request({
						type:'get',
						url:'/extjsSpringM/userAction/deleteOrBatch.do?ids='+ids,
						success: function (response, opts) {
                                Ext.MessageBox.alert('提示', '删除成功');
                                store.load();
                        },
                        failure: function (response, opts) {
                            Ext.MessageBox.alert('提示', '删除异常');
                        }
					});
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
    		{ text: 'id',dataIndex:'uid',hidden:true},
    		{ text: '姓名', dataIndex: 'username',align: 'center', sortable: false },
	        { text: '昵称', dataIndex: 'nickname',align: 'center', sortable: false },
	        { text: '年龄',dataIndex:'age',align: 'center',width:70 },
	        { text: '电话', dataIndex: 'phone',align: 'center',width:80, sortable: false },
	        { 
	        	text: '是否可用', 
	        	dataIndex: 'isenable',
	        	align: 'center',
	        	renderer:function(value){
	        		 if(value=="0"){
	                         return"<font color='green'>可用</font>";
	                  }else if(value=="1"){
	                         return"<font color='red'>不可用</font>";
	                  }
	        	}
	        },
	        { text: 'email', dataIndex: 'email',align: 'center', sortable: false },
	        { text: '用户地址(显示默认)', dataIndex: 'addrid',width:220,align: 'center', sortable: false
	        	//添加监听事件，双击时修改用户地址
//	        	listeners:{
//	        		'ondbclick':function(dataview, record, item, index, e){
//	        			alert("双击是弹出");
//	        		}
//	        	}
	        },
	        { text: '省份证', dataIndex: 'idCard',align: 'center',width:180, sortable: false },
	        {
	        	xtype:'gridcolumn',
	        	width:120,
	        	dataIndex: 'operate',
			    text: '操作栏',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var uid = record.data.uid;
			        btnStr = '<span>'+'<a id=\"modify\" value=\"修改\" onclick=\"modeifyThisLine(\''+uid+'\')\" />修改</a>&nbsp;&nbsp'
			        +'<a id=\"addAddr\" value=\"添加地址\" onclick=\"addAddr(\''+uid+'\')\" />新增地址</a></span>';
			        return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
    			xtype:'button',
    			text:'导出',
    			handler:function(){
    				alert("导出实现");
    			
    			}
    		},
    		{
                xtype: 'pagingtoolbar',
                store: userStore,
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
	var addUserPanelAddTab =new Ext.FormPanel({
		bodyStyle:'margin-top:2px',
		layoyt:'form',
		border:false,
		id:"formSubmitID",
		items:[{
			xtype:'textfield',
			fieldLabel:'用户名',
			name:'username',
			anchor:"90%",  
            allowBlank:'用户名不能为空'
		},{
			xtype:'textfield',
			fieldLabel:'昵称',
			name:'nickname',
			anchor:"90%",  
            allowBlank:'昵称必须有'
		}
		,{
			xtype:'textfield',  
            intputType:'password',  
            fieldLabel:'密  码', 
            name:'password',  
            anchor:"90%",  
            allowBlank:'密码不能为空',  
            minLength:6,  
            minLengthText:'密码长度为[6-20]',  
            maxLength:20,  
            maxLength:'密码长度为[6-20]'
		},{
			xtype:'textfield',  
            fieldLabel:'年龄',  
            name:'age',  
            anchor:"90%",  
            allowBlank:'年龄不能为空',  
            minLength:1,  
            minLengthText:'年龄不能小于[10]',  
            maxLength:20,  
            maxLength:'年龄不能超过[100]'
		},{
			xtype:'textfield',  
            fieldLabel:'联系电话',  
            name:'phone',  
            anchor:"90%",  
            allowBlank:'联系电话不能为空' 
		},{
			xtype:'textfield',  
            fieldLabel:'Email',  
            name:'email',  
            anchor:"90%",  
            allowBlank:'email不能为空' 
		},{
			xtype:'textfield',  
            fieldLabel:'省份证',  
            anchor:"90%",  
            allowBlank:'省份证不能为空'
		}],
		buttonAlign: 'center',
		buttons: [
        {
            text: '保存',
            handler: function () {
            	var frm = Ext.getCmp("formSubmitID");
            	if (!frm.getForm().isValid()){
            		return;
            	}
            	frm.getForm().submit({
            		url:'/extjsSpringM/userAction/addUserInfoToDb.do',
            		method:'post',
            		success: function(form, action) {
			           Ext.Msg.alert('提示', '保存成功');
			           Ext.getCmp("winCe").close(this);
			           userStore.load();
			         },
			        failure: function(form, action) {
			             Ext.Msg.alert('提示', '原因如下：' + action.result.errors.info);
			        }
            		
            	});
            }
        }, {
            text: '关闭',
            handler: function () {
            	Ext.getCmp("winCe").close(this);
            }
        }
      ]
	});
});
