/**
 * 菜单管理extjs gbp 2018年1月23日 11:23:38
 */
var iHBody;
var iWBody;
Ext.onReady(function(){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var menuMode = Ext.define('treeModel',{
		extend:'Ext.data.Model',
		id:"treeModelId",
		fields:[
		        {name:'id',type:'String'},
		        {name:'text',type:'String'},
		        {name:'url',type:'String'},
		        ]
	});
	
	var menuStore = Ext.create('Ext.data.Store',{
		model:menuMode,
		autoLoad: true,
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showUrlIsNotNullMenu.do',
			reader:{
				type:'json',
				root: 'rows',  //数据
				totalProperty: 'total'
			}
		},
		root:{
			expanded:true
		}
	});
	var tbar = Ext.create('Ext.toolbar.Toolbar',{
		height:30,
		items:[
				{
					xtype:'label',
					text:'用户名'
				},
				{
					xtype:'textfield',
					id:'username'
				},'-',
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../../images/minico/search.png',
					handler:function(){
						var username=Ext.getCmp('username').getValue();
						var phone=Ext.getCmp('jiarNm').getValue();
						var isenable=Ext.getCmp('beginTime').getValue();
						var email=Ext.getCmp('endTime').getValue();
						var isenableSecond="second";//添加一个区分首次加载还是查询
						
						menuStore.load({params:{username:username,phone:phone,isenable:isenable,isenableSecond:isenableSecond,email:email,start: 0, limit: 25}});	
					}
				}]
	});
	new Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:menuStore,
		height:iHBody,
		columnLines: true,
		renderTo:Ext.getBody(),
		tbar:tbar,
		selModel: Ext.create("Ext.selection.CheckboxModel", {
		    injectCheckbox: 1,//checkbox位于哪一列，默认值为0
		    mode: "multi",//multi,simple,single；默认为多选multi
		    checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
		    allowDeselect: true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
		    enableKeyNav: true
		}),
    	columns: [
    		{ header: '序号', xtype: 'rownumberer', width: '3%', align: 'center', sortable: false },
    		{ text: 'id',dataIndex:'id',width:70,hidden:true},
	        { text: '菜单名', dataIndex: 'text',width: '10%',align: 'center', sortable: false },
	        { text: 'URL', dataIndex: 'url',align: 'left',width: '25%', sortable: false },
	        {
	        	xtype:'gridcolumn',
	        	width:'10%',
	        	dataIndex: 'operate',
			    text: '查看权限',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var menuId = record.data.id;
			    	var menuName = record.data.text;
			    	param = menuId+"@@"+menuName
			    	btnStr='<span>'+'<img src="../../../images/minico/find-perm.png" alt="权限设置" onclick=\"findDeptPerm(\''+param+'\');\"/></span>';  
			    	return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
                xtype: 'pagingtoolbar',
                store: menuStore,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
           }],
	});
});
