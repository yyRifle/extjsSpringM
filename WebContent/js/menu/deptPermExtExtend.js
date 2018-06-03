var dgId;
function findDeptPerm(value){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var array = value.split("@@");
	dgId = array[0];
	deptName = array[1];
	//左边Model
	var meanMindModel = Ext.define('userModel',{
		extend:'Ext.data.Model',
		fields:[
				{name:'id',type:'String'},
		        {name:'text',type:'String'},
				{name:'url',type:'String'}
		       ]
	});
	var menuMindColumn = [
	   			{ header: '序号', xtype: 'rownumberer', width: '15%', align: 'center', sortable: false },
				{ text: 'id', dataIndex: 'id',hidden:true },
				{ text: '菜单名称', dataIndex: 'text',width: '30%',align: 'center', sortable: false },
				{ text: '菜单URL', dataIndex: 'url',width: '55%',align: 'left', sortable: false },
	];
	//左边Store
	var showLeftStore = Ext.create('Ext.data.Store',{
		model:meanMindModel,
		id:"menuLeftDate",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showLeftManuDate.do?dgId='+dgId,
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
		model:meanMindModel,
		id:"menuRightDate",
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showRightManuDate.do?dgId='+dgId,
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
					text:'菜单名称'
				},
				{
					xtype:'textfield',
					width:'49%'
				},
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../images/minico/search.png',
					handler:function(){
						var meauName = Ext.getCmp('text').getValue();
						showLeftStore.load({params:{meauName:meauName,start: 0, limit: 20}});	
					}
				}
			]
	});
	var rightTbar = Ext.create('Ext.toolbar.Toolbar',{
		height:30,
		items:[
		       {
		    	   xtype:'label',
		    	   text:'菜单名称'
		       },
		       {
		    	   xtype:'textfield',
		    	   width:'49%'
		       },
		       {
		    	   text:'<span style="color:white;font-size:300">查询</span>',
		    	   style: 'background: #368ECE;border-color:#126DAF',
		    	   icon: '../../images/minico/search.png',
		    	   handler:function(){
		    		   var meauName=Ext.getCmp('text').getValue();
		    		   showRightStore.load({params:{meauName:meauName,start: 0, limit: 20}});	
		    	   }
		       }
		       ]
	});
	//左边的Column
	var deptLeftColumn = Ext.create('Ext.grid.Panel',{
		id:'deptLeftId',
		store:showLeftStore,
		height: iHBody,
		width:335,
		columnLines: true,
		region:'west',
		tbar:leftTbar,
		columns: menuMindColumn,
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
	   			menuId = record.data.id;
	   			Ext.Ajax.request({
	   				url:"/extjsSpringM/deptAction/removeMenuAndDeptByID.do",
	   				mehtod:'get',
	   				params:{
	   					"dgid":dgId,
	   					"menuid":menuId
	   				},
	   				success : function(response, options) {
	   					Ext.Msg.alert('提示', '操作成功');
	   					showLeftStore.reload();//刷新当前页面 
	   					showRightStore.reload();
	   					
	   				},
	   				failure : function() {
	   					Ext.Msg.alert('提示', '操作失败');
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
		width:340,
		columnLines: true,
		region:'center',
		tbar:rightTbar,
		columns: menuMindColumn,
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
	   				menuId = record.data.id;
		   			Ext.Ajax.request({
		   				url:"/extjsSpringM/deptAction/addMenuAndDeptByID.do",
		   				mehtod:'get',
		   				params:{
		   					"dgid":dgId,
		   					"menuid":menuId
		   				},
		   				success : function(response, options) {
		   					Ext.Msg.alert('提示', '操作成功');
		   					showLeftStore.load();//刷新当前页面 
		   					showRightStore.load();
		   					
		   				},
		   				failure : function() {
		   					Ext.Msg.alert('提示', '操作失败');
		   				}
		   			
		   			});
	            }
	            
	        }	
	});
	
	var win = Ext.create('Ext.window.Window',{
		id:"deptAndGroups",
	    title:'<span style="color:black">部门与菜单关系</span>'+'&nbsp;&nbsp;(<font color="red">'+deptName+"</font>)",       //弹出窗口内布局会充满整个窗口;
	    layout: "border", 
	    modal: true, //是否模态窗口，默认为false
	    width:680,          //设置窗口大小;
	    height:iHBody-100,
	   	closable:true,     //隐藏关闭按钮;
	    draggable:true,     //窗口可拖动;
	    items: [deptLeftColumn,deptRightColumn]
	  });
	  win.show();
	
}

