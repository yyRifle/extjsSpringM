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
	var indeMenuStore = Ext.create('Ext.data.TreeStore',{
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
		title:'<span style="color:black"><font>基础菜单</font></span>',
		width:180,
		minWidth:90,
		height:'100%',
		region:'west',
		store:indeMenuStore,
		collapsible: true,
		animate : true,// 动画切换效果
		rootVisible: false,//隐藏根节点
		listeners:{
			itemclick:function(view, record, item, index, e){
				i++;
				var url = record.get('url');
				var leaf = record.get('leaf');
				var tableid = record.get('id');
				var text = record.get('text');
				if (leaf) {
					var newTab = Ext.create('Ext.panel.Panel',{
						id:tableid,
						title:'<span style="color:black"><font>'+text+'</font></span>',
						closable : true,
						html:'<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="'+url+'"></iframe>'
					});
					var activeTitle = Ext.getCmp("center_id").getActiveTab().title;
					var arrayItems = Ext.getCmp("center_id").items.items;
					for (var i= 0;i < arrayItems.length;i++) {
						//当已经打开的tab里面存在的时候，再次点击是，切换到点击的tab，不重新打开
						if (text == arrayItems[i].title){
							centerMain.setActiveTab(newTab);
							return;
						} 
					}
					if (text != activeTitle) {
						centerMain.add(newTab);
						centerMain.setActiveTab(newTab);
					}
				}
			},
		scope : this
		}
	});
	
	/**
	 * 创建中心区域
	 */
	var centerMain = Ext.create('Ext.tab.Panel',{
		activeTab: 0,
		id:'center_id',
		region:'center',
		plain: true,                        //True表示tab候选栏上没有背景图片（默认为false） 
		border:false,
		height: '100%',  
        width: '100%',
		autoScroll : true,//选项卡过多时，允许滚动  
		items:[{
				title:'<span style="color:black"><font>首页</font></span>',
				icon: 'images/minico/home_with_smog_pipe.png',
				html:'<iframe width="100%" height="100%" scrolling="no" frameborder="0" src="/extjsSpringM/index.html"></iframe>'
			}]
	});
	
	//创建viewport
	new Ext.create('Ext.container.Viewport',{
		layout:'border',
		items:[{
			region:'north',
			contentEl:'topDiv',
			border:false
		},
			leftTree,centerMain
		,{
			region:'south',
			height:20,
			border:false,
			contentEl:'southDiv'
		}]
	});
});