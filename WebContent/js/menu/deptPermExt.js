/**
 * 菜单管理extjs gbp 2018年1月23日 11:23:38
 */
var iHBody;
var iWBody;
Ext.onReady(function(){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var menuMode = Ext.define('deptModel',{
		extend:'Ext.data.Model',
		id:"deptMenuId",
		fields:[
		{name:'dgId',type:'String'},
		{name:'dgName',type:'String'},
		{name:'operate',type:'String'},
		{name:'operateTime',type:'Date',convert:function(value){  
		        var createTime = Ext.Date.format(new Date(value),"Y-m-d H:i:s");
		        return createTime;  
			}
		},
		{
			name:'deptMenuLink',type:'String'
		}]
	});
	
	var menuStore = Ext.create('Ext.data.Store',{
		model:menuMode,
		autoLoad: true,
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/deptAction/showAllDeptMenuLink.do',
			reader:{
				type:'json',
				root: 'root',  //数据
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
					text:'部门名称'
				},
				{
					xtype:'textfield',
					id:'dgName'
				},'-',
				{
					text:'<span style="color:white;font-size:300">查询</span>',
					style: 'background: #368ECE;border-color:#126DAF',
					icon: '../../images/minico/search.png',
					handler:function(){
						var deptName=Ext.getCmp('dgName').getValue();
						menuStore.load({params:{deptName:deptName,start: 0, limit: 25}});	
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
    		{ text: 'id',dataIndex:'dgId',width:70,hidden:true},
	        { text: '部门名', dataIndex: 'dgName',width: '10%',align: 'center', sortable: false },
	        { text: '创建人', dataIndex: 'operate',align: 'center',width: '10%', sortable: false },
	        { text: '创建时间', dataIndex: 'operateTime',align: 'center',width: '15%', sortable: false },
	        { text: '对应的菜单名称', dataIndex: 'deptMenuLink',align: 'left',width: '25%', sortable: false,
	        	renderer:function(value, metaData, record){
	        		var iconCls = record.data.deptMenuLink;
//	        		array = iconCls.split(",");
//	        		if (null != array && "" != array && array.length >0 ) {
//	        			resDML = "";
//	        			for(var i = 0;i<array.length;i++){
//	        				resDML += iconCls+"</br>"//每5个值换行
//	        				if (1 == iconCls.length%5) {
//	        					resDML = "";
//	        					break;
//	        				}
//	        			}
//	        			return resDML
//	        		}
	        		return iconCls;
	        	}
	        },
	        {
	        	xtype:'gridcolumn',
	        	width:'10%',
	        	dataIndex: 'operate',
			    text: '菜单赋部门权限',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var dgId = record.data.dgId;
			    	var deptName = record.data.dgName;
			    	param = dgId+"@@"+deptName
			    	btnStr='<span>'+'<img src="../../images/minico/setting.png" alt="权限设置" onclick=\"findDeptPerm(\''+param+'\');\"/></span>';  
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
