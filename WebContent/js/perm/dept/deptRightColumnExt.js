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
	//查询未拥有的
	var showIsNotExistingDept = Ext.create('Ext.data.Store',{
		model:deptAndGroupsModel,
		id:"deptAndGroupsIdLeft",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showIsNotExistingDept.do?dgId='+dgId,
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
		store:showIsNotExistingDept,
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
			{ text: '部门名称', dataIndex: 'dgName',align: 'center', sortable: false },
		],
		bbar: [
			{
	            xtype: 'pagingtoolbar',
	            store: showIsNotExistingDept,
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
});