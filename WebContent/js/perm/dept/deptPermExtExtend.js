var menuId;
function findDeptPerm(value){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var array = value.split("@@");
	menuId = array[0];
	menuName = array[1];
	//左边Model
	var deptMindModel = Ext.define('userModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'dgId',type:'String'},
		        {name:'dgName',type:'String'}
		       ]
	});
	var deptMindColumn = [
	   			{ header: '序号', xtype: 'rownumberer', width: '15%', align: 'center', sortable: false },
				{ text: 'id', dataIndex: 'dgId',hidden:true },
				{ text: '部门名称', dataIndex: 'dgName',width: '85%',align: 'center', sortable: false },
	];
	//左边Store
	var showLeftStore = Ext.create('Ext.data.Store',{
		model:deptMindModel,
		id:"deptLeft",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showExistingDept.do?menuId='+menuId,
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
		model:deptMindModel,
		id:"deptRight",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showIsNotExistingDept.do?menuId='+menuId,
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
					width:'57%'
				},
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../../images/minico/search.png',
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
		    	   width:'55%'
		       },
		       {
		    	   text:'<span style="color:white;font-size:300">查询</span>',
		    	   style: 'background: #368ECE;border-color:#126DAF',
		    	   icon: '../../../images/minico/search.png',
		    	   handler:function(){
		    		   var dgName=Ext.getCmp('dgName').getValue();
		    		   showRightStore.load({params:{dgName:dgName,start: 0, limit: 20}});	
		    	   }
		       }
		       ]
	});
	//左边的Column
	var deptLeftColumn = Ext.create('Ext.grid.Panel',{
		id:'deptLeftId',
		store:showLeftStore,
		height: iHBody,
		width:240,
		columnLines: true,
		region:'west',
		tbar:leftTbar,
		columns: deptMindColumn,
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
	   			deptId = record.data.dgId;
	   			Ext.Ajax.request({
	   				url:"/extjsSpringM/deptAction/removeMenuAndDeptByID.do",
	   				mehtod:'get',
	   				params:{
	   					"dgid":deptId,
	   					"menuid":menuId
	   				},
	   				success : function(response, options) {
	   					Ext.Msg.alert('提示', '删除成功');
	   					window.location.reload();//刷新当前页面 
	   					window.parent.location.reload();
	   					
	   				},
	   				failure : function() {
	   					Ext.Msg.alert('提示', '原因如下：' + action);
	   				}
	   			
	   			});
	            }
	            
	        }	
	});
	//右边Column
	var deptRightColumn = Ext.create('Ext.grid.Panel',{
		id:'deptRightId',
		store:showRightStore,
		height: iHBody,
		width:240,
		columnLines: true,
		region:'center',
		tbar:rightTbar,
		columns: deptMindColumn,
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
	        		deptId = record.data.dgId;
		   			Ext.Ajax.request({
		   				url:"/extjsSpringM/deptAction/addMenuAndDeptByID.do",
		   				mehtod:'get',
		   				params:{
		   					"dgid":deptId,
		   					"menuid":menuId
		   				},
		   				success : function(response, options) {
		   					Ext.Msg.alert('提示', '删除成功');
		   					window.location.reload();//刷新当前页面 
		   					window.parent.location.reload();
		   					
		   				},
		   				failure : function() {
		   					Ext.Msg.alert('提示', '原因如下：' + action);
		   				}
		   			
		   			});
	            }
	            
	        }	
	});
	
	var win = Ext.create('Ext.window.Window',{
		id:"deptAndGroups",
	    title:'<span style="color:black">菜单与部门关系</span>'+'&nbsp;&nbsp;(<font color="red">'+menuName+"</font>)",       //弹出窗口内布局会充满整个窗口;
	    layout: "border", 
	    modal: true, //是否模态窗口，默认为false
	    width:480,          //设置窗口大小;
	    height:iHBody-100,
	   	closable:true,     //隐藏关闭按钮;
	    draggable:true,     //窗口可拖动;
	    items: [deptLeftColumn,deptRightColumn]
	  });
	  win.show();
	
}

