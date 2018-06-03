/**
 * 菜单管理extjs gbp 2018年1月23日 11:23:38
 */
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
		        {name:'operate',type:'String'},
		        {name:'operateTime',type:'Date',convert:function(value){  
		            var createTime = Ext.Date.format(new Date(value),"Y-m-d H:i:s");
		            return createTime;  
		        	}	
		        }]
	});
	
	var deptAnfGroupStore = Ext.create('Ext.data.Store',{
		model:deptAndGroupsModel,
		autoLoad: true,
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showAllDept.do',
			reader:{
				type:'json',
				root: 'rows',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	var tbar = Ext.create('Ext.toolbar.Toolbar',{
		height:30,
		items:[
				{
					xtype:'label',
					text:'部门名称'
				},
				{
					xtype:'textfield',
					id:'text'
				},'-',
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../images/minico/search.png',
					handler:function(){
						var menuName=Ext.getCmp('text').getValue();
						deptAnfGroupStore.load({params:{menuName:menuName,start: 0, limit: 25}});	
					}
				}]
	});
	new Ext.create('Ext.grid.Panel',{
		id:'deptAnfGroupId',
		store:deptAnfGroupStore,
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
    		{ header: '序号', xtype: 'rownumberer', width:'3%',align: 'center', sortable: false},
    		{ text: 'id', dataIndex:'dgId',hidden:true},
    		{ text: '部门名称', dataIndex: 'dgName',width:'20%',align: 'center', sortable: false},
	        { text: '操作时间', dataIndex: 'operateTime',width:'20%',align: 'center', sortable: false},
	        { text: '操作人', dataIndex:'operate',align: 'center',width:'15%'},
	        {
	        	width:'10%',
	        	dataIndex: 'button',
	        	header: '部门赋用户权限',
	        	align: 'center',
	        	renderer:function(value, metaData, record){
	        		var dgId = record.data.dgId;
	        		var dgName = record.data.dgName;
	        		param = dgId+"@@"+dgName
	        		btnStr='<span>'+'<img src="../../images/minico/setting.png" alt="权限设置" onclick=\"findGroupOrDeptAndUserPerm(\''+param+'\');\"/></span>';  
	        		return btnStr;
	        	}
	        },
	        {
	        	width:'10%',
	        	dataIndex: 'button',
	        	header: '查看用户权限',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var dgId = record.data.dgId;
			    	btnStr='<span>'+'<img src="../../images/minico/find-perm.png" alt="权限设置" onclick=\"searchUserPerm(\''+dgId+'\');\"/></span>';  
			    	return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
                xtype: 'pagingtoolbar',
                store: deptAnfGroupStore,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
           }],
	});
});
