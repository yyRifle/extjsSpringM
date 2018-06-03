var dgId;
function findGroupOrDeptAndUserPerm(value){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var array = value.split("@@");
	dgId = array[0];
	dgName = array[1];
	//左边Model
	var groupOrDeptAndUserModel = Ext.define('userModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'uid',type:'String'},
				{name:'username',type:'String'},
		        {name:'nickname',type:'String'}
		       ]
	});
	var groupOrDeptAndUserColumn = [
	   			{ header: '序号', xtype: 'rownumberer', width: '15%', align: 'center', sortable: false },
				{ text: 'id', dataIndex: 'uid',hidden:true },
				{ text: '名称', dataIndex: 'username',width: '40%',align: 'center', sortable: false },
				{ text: '昵称', dataIndex: 'nickname',width: '40%',align: 'center', sortable: false },
	];
	//左边Store
	var showLeftStore = Ext.create('Ext.data.Store',{
		model:groupOrDeptAndUserModel,
		id:"groupOrDeptAndUserLeft",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/userAction/findLeftUserInfo.do?dgId='+dgId,
			reader:{
				type:'json',
				root: 'root',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	//右边Store
	var showRightStore = Ext.create('Ext.data.Store',{
		model:groupOrDeptAndUserModel,
		id:"groupOrDeptAndUserRight",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/userAction/findRightUserInfo.do?dgId='+dgId,
			reader:{
				type:'json',
				root: 'root',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	var leftTbar = Ext.create('Ext.toolbar.Toolbar',{
		height:30,
		items:[
				{
					xtype:'label',
					text:'部门名称'
				},
				{
					xtype:'textfield',
					id:'dgLName',
					width:'49%'
				},
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../images/minico/search.png',
					handler:function(){
						var dgName=Ext.getCmp('dgName').getValue();
						showLeftStore.load({params:{dgName:dgName,start: 0, limit: 20}});	
					}
				}
			]
	});
	var rightTbar = Ext.create('Ext.toolbar.Toolbar',{
		height:30,
		items:[
		       {
		    	   xtype:'label',
		    	   text:'部门名称'
		       },
		       {
		    	   xtype:'textfield',
		    	   id:'dgRName',
		    	   width:'49%'
		       },
		       {
		    	   text:'<span style="color:white;font-size:300">查询</span>',
		    	   style: 'background: #368ECE;border-color:#126DAF',
		    	   icon: '../../images/minico/search.png',
		    	   handler:function(){
		    		   var dgName=Ext.getCmp('dgName').getValue();
		    		   showRightStore.load({params:{dgName:dgName,start: 0, limit: 20}});	
		    	   }
		       }
		       ]
	});
	//左边的Column
	var dguLeftColumn = Ext.create('Ext.grid.Panel',{
		id:'groupOrDeptAndUserLeftId',
		store:showLeftStore,
		height: iHBody,
		width:235,
		columnLines: true,
		region:'west',
		tbar:leftTbar,
		columns: groupOrDeptAndUserColumn,
		bbar: [
			{
	            xtype: 'pagingtoolbar',
	            store: showLeftStore,
	            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	            emptyMsg: "没有数据",
	            beforePageText: "当前页",
	            afterPageText: "共{0}页",
	            displayInfo: true
	       }],
	   	listeners: {
	   		itemdblclick: function(view, record, item, index, e) {
	   			uid = record.data.uid;
	   			Ext.Ajax.request({
	   				url:"/extjsSpringM/userAction/removeGroupOrDeptAndUserByID.do",
	   				mehtod:'get',
	   				params:{
	   					"dgid":dgId,
	   					"uid":uid
	   				},
	   				success : function(response, options) {
	   					Ext.Msg.alert('提示', '操作成功');
	   					showLeftStore.load();//刷新当前页面 
	   					showRightStore.load();
	   					
	   				},
	   				failure : function() {
	   					Ext.Msg.alert('提示', '原因如下：');
	   				}
	   			
	   			});
	            }
	            
	        }	
	});
	//右边Column
	var dguRightColumn = Ext.create('Ext.grid.Panel',{
		id:'groupOrDeptAndUserRightId',
		store:showRightStore,
		height: iHBody,
		width:240,
		columnLines: true,
		region:'center',
		tbar:rightTbar,
		columns: groupOrDeptAndUserColumn,
		bbar: [
			{
	            xtype: 'pagingtoolbar',
	            store: showRightStore,
	            displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
	            emptyMsg: "没有数据",
	            beforePageText: "当前页",
	            afterPageText: "共{0}页",
	            displayInfo: true
	       }],
	   	listeners: {
	   		itemdblclick: function(view, record, item, index, e) {
	   			uid = record.data.uid;
		   			Ext.Ajax.request({
		   				url:"/extjsSpringM/userAction/addGroupOrDeptAndUserByID.do",
		   				mehtod:'get',
		   				params:{
		   					"dgid":dgId,
		   					"uid":uid
		   				},
		   				success : function(response, options) {
		   					Ext.Msg.alert('提示', '操作成功');
		   					showLeftStore.load();//刷新当前页面 
		   					showRightStore.load();
		   					
		   				},
		   				failure : function() {
		   					Ext.Msg.alert('提示', '原因如下：');
		   				}
		   			
		   			});
	            }
	            
	        }	
	});
	
	var win = Ext.create('Ext.window.Window',{
		id:"geoupOrDeptAndUser",
	    title:'<span style="color:black">部门与用户关系</span>'+'&nbsp;&nbsp;(<font color="red">'+dgName+"</font>)",       //弹出窗口内布局会充满整个窗口;
	    layout: "border", 
	    modal: true, //是否模态窗口，默认为false
	    width:480,          //设置窗口大小;
	    height:iHBody-100,
	   	closable:true,     //隐藏关闭按钮;
	    draggable:true,     //窗口可拖动;
	    items: [dguLeftColumn,dguRightColumn]
	  });
	  win.show();
	
}

