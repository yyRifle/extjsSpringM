/**
 * 受页面js
 */
 
Ext.onReady(function(){
	/**
	 * 创建接受菜单数据的model
	 */
	var model = Ext.define('treeModel',{
		extend:'Ext.data.Model',
		id:"treeModelId",
		fields:[
		        {name:'id',type:'String'},
		        {name:'text',type:'String'},
		        {name:'leaf',type:'boolean'},
		        {name:'url',type:'String'},
		        {name:'iconCls',type:'String'}
		        ]
	});
	
	/**
	 * 创建承接数据的store
	 */
	var store = Ext.create('Ext.data.TreeStore',{
		model:model,
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showAllTree.do',
			reader:{
				type:'json'
			}
		},
		root:{
			expanded:true
		}
	});
	/**
	 * 加载菜单数据
	 */
	var leftTree = Ext.create('Ext.tree.Panel',{
		title:'基础菜单',
		width:180,
		minWidth:90,
		height:'100%',
		region:'west',
		store:store,
		collapsible: true,
		animate : true,// 动画切换效果
		rootVisible: false,//隐藏根节点
		listeners:{
			itemclick:function(view, record, item, index, e){
				var url = record.get('url');
				var leaf = record.get('leaf');
				var tableid = record.get('id');
				var text = record.get('text');
			},
		scope : this
		}
	});
	
	var deptmodel = Ext.define('treeModel',{
		extend:'Ext.data.Model',
		id:"treeModelId",
		fields:[
		        {name:'id',type:'String'},
		        {name:'text',type:'String'},
		        {name:'leaf',type:'boolean'},
		        {name:'url',type:'String'},
		        {name:'iconCls',type:'String'}
		        ]
	});
	
	/**
	 * 创建承接数据的store
	 */
	var deptstore = Ext.create('Ext.data.TreeStore',{
		model:deptmodel,
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showAllTree.do',
			reader:{
				type:'json'
			}
		},
		root:{
			expanded:true
		}
	});
	
	/**
	 * 创建中心区域
	 */
	var centerMain = Ext.create('Ext.tab.Panel',{
		activeTab: 0,
		id:'center_id',
		region:'center',
		border:false,
		autoScroll : true,//选项卡过多时，允许滚动  
		items:[{
				iconCls: 'House',
				title:'主页面',
				html:'<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="/extjsSpringM/index.html"></iframe>'
			}]
	});
	
	//创建viewport
	new Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[
		       leftTree,centerMain
		]
	});
});