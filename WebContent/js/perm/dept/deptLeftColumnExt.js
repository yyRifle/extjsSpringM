var dgId = window.parent.dgId;
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
	//查询已拥有的
	var showExistingDept = Ext.create('Ext.data.Store',{
		model:deptAndGroupsModel,
		id:"deptAndGroupsIdLeft",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showExistingDept.do?dgId='+dgId,
			reader:{
				type:'json',
				root: 'root',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	var deptLeftColumn = Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:showExistingDept,
		height: 450, 
		columnLines: true,
		renderTo:Ext.getBody(),
		tbar:[
			{
				xtype:'label',
				text:'部门名称'
			},
			{
				xtype:'textfield',
				id:'dgName',
				width:120
			},
			{
				text:'<span style="color:white;font-size:300">查询</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../../images/minico/search.png',
				handler:function(){
					var username=Ext.getCmp('username').getValue();
					var phone=Ext.getCmp('phone').getValue();
					var isenable=Ext.getCmp('ComboBoxId').getValue();
					var email=Ext.getCmp('Email').getValue();
					var isenableSecond="second";//添加一个区分首次加载还是查询
					
					deptAndGroupStore.load({params:{username:username,phone:phone,isenable:isenable,isenableSecond:isenableSecond,email:email,start: 0, limit: 25}});	
				}
			}
		],
		columns: [
			{ header: '序号', xtype: 'rownumberer', width: 40,height:20, align: 'center', sortable: false },
			{ text: 'id', dataIndex: 'dgId',hidden:true },
			{ text: '部门名称', dataIndex: 'dgName',align: 'center', sortable: false },
		],
		bbar: [
			{
	            xtype: 'pagingtoolbar',
	            store: showExistingDept,
	            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	            emptyMsg: "没有数据",
	            beforePageText: "当前页",
	            afterPageText: "共{0}页",
	            displayInfo: true
	       }],
	   	listeners: {
	   		itemdblclick: function(view, record, item, index, e) {
	   			Ext.Ajax.request({
	   				url:"/extjsSpringM/jiraAction/queryCodeLineByjid.do",
	   				mehtod:'get',
	   				params:{
	   					jid:value
	   				},
	   				success : function(response, options) {
	   					var jira = JSON.parse(response.responseText);
	   					var sis = "<font size='3'>"+jira[0].codeLine+"</font>"
	   					var win = Ext.create('Ext.window.Window',{
	   					    layout: "fit", 
	   					    modal: true, //是否模态窗口，默认为false
	   					    width:750,          //设置窗口大小;
	   					    height:400,
	   					   	closable:true,     //隐藏关闭按钮;
	   					    draggable:true,     //窗口可拖动;
	   					    resizable: false,
	   					    items:[
	   					           {
	   					        	   title:"代码列表",
	   					        	   html:sis}
	   					           ],
	   					  });
	   					  win.show();
	   				},
	   				failure : function() {
	   				
	   				}
	   			
	   			});
	            	window.location.reload();//刷新当前页面 
	            	window.parent.location.reload();
	            }
	            
	        }	
	});
});