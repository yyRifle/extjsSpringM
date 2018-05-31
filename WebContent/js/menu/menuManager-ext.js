/**
 * 菜单管理extjs gbp 2018年1月23日 11:23:38
 */

Ext.onReady(function(){
	var menuMode = Ext.define('treeModel',{
		extend:'Ext.data.Model',
		id:"treeModelId",
		fields:[
		        {name:'id',type:'String'},
		        {name:'text',type:'String'},
		        {name:'leaf',type:'boolean'},
		        {name:'url',type:'String'},
		        {name:'iconCls',type:'String'},
		        {name:'fatherId',type:'String'}
		        ]
	});
	
	var store = Ext.create('Ext.data.Store',{
		model:menuMode,
		autoLoad: true,
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/meanAction/showALLTreeMenu.do',
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
	var mianTab = Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:store,
		height:580,
		columnLines: true,
		renderTo:Ext.getBody(),
    	//selType: "checkboxmodel",
		tbar:[
			{
				xtype:'button',
				text:'新增菜单',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						id:"addNewMenu",
					    title:'新增菜单',       //弹出窗口内布局会充满整个窗口;
					    modal: true, //是否模态窗口，默认为false
					    width:380,          //设置窗口大小;
					    height:300,
					    closeAction:'hide', //点击右上角关闭按钮后会执行的操作;
					   	closable:true,     //隐藏关闭按钮;
					    draggable:true,     //窗口可拖动;
					    resizable: false,
					    items:[newMenuTab]
					  });
					  win.show();
				}
			}
		],
		selModel: Ext.create("Ext.selection.CheckboxModel", {
		    injectCheckbox: 1,//checkbox位于哪一列，默认值为0
		    mode: "multi",//multi,simple,single；默认为多选multi
		    checkOnly: true,//如果值为true，则只用点击checkbox列才能选中此条记录
		    allowDeselect: true,//如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择
		    enableKeyNav: true
		}),
    	columns: [
    		{ header: '序号', xtype: 'rownumberer', width: 40,height:20, align: 'center', sortable: false },
    		{ text: 'id',dataIndex:'id',width:70},
	        { text: '菜单名', dataIndex: 'text',align: 'center', sortable: false },
	        { text: '是否有子节点',dataIndex:'leaf',align: 'center',width:120,
	        	renderer:function(value){
	        		if(value){
	                       return"<font color='red'><strong>有子节点</strong></font>";
	                  }else{
	                       return"<font color='green'>无子节点</font>";
	                  }
	        	}
	        },
	        { text: 'URL', dataIndex: 'url',align: 'center',width:250, sortable: false },
	        { text: '父节点', dataIndex: 'fatherId',align: 'center', sortable: false },
	        {
	        	xtype:'gridcolumn',
	        	width:120,
	        	dataIndex: 'operate',
			    text: '操作栏',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var uid = record.data.uid;
			        btnStr = '<span>'+'<a id=\"modify\" value=\"修改\" onclick=\"modeifyThisLine(\''+uid+'\')\" />修改</a></span>';
			        return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
                xtype: 'pagingtoolbar',
                store: store,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
           }],
	});
	
	//数据store
	var menuNameStore = Ext.create('Ext.data.Store',{
		fields: ["text", "id"],
		autoLoad: true,
		proxy:{
			type:'ajax',
			//actionMethods: { read: "POST" },
			url:'/extjsSpringM/meanAction/findFeatherMenu.do',
			reader:{
				type:'json'
			}
		},
		root:{
			expanded:true
		}
	});
	var isleafStore = Ext.create("Ext.data.Store", {
	    fields: ["isleafname", "isleafvalue"],
	    data: [
	        { isleafname: "存在根节点", isleafvalue: 1 },
	        { isleafname: "不存在根节点", isleafvalue: 0 }
	    ]
	});
	var jiedianStore = Ext.create("Ext.data.Store", {
	    fields: ["jiedianname", "jiedianvalue"],
	    data: [
	        { jiedianname: "是根节点", jiedianvalue: "folder" },
	        { jiedianname: "不是根节点", jiedianvalue: "elbow" }
	    ]
	});
	
	var newMenuTab = new Ext.FormPanel({
		bodyStyle:'margin-top:3px',
		layoyt:'form',
		border:false,
		height:270,
		id:"newAddMenuFormID",
		items:[{
			xtype: "combobox",              //使用xtype定义
			name: "leaf",                 //form提交时的名称
			fieldLabel: "是否存在子节点",             //显示的Label
			id:'isleafGai',
			store: isleafStore,             //绑定的Store
			editable: false,                //是否可编辑
			displayField: "isleafname",           //显示的字段
			valueField: "isleafvalue",            //值的字段
			emptyText: "--请选择--",        //当没有值时的水印文字
			queryMode: "local",
			anchor:"90%",
			listeners: {
                change: function(view, record, item, index, e) {
               		if (record == '0') {//0 表示没有根节点、可以致父类为不可用
               			Ext.getCmp('fuleiNV').disable();
               			Ext.getCmp('newJdURL').disable();
               		} else {
               			Ext.getCmp('fuleiNV').enable();
               			Ext.getCmp('newJdURL').enable();
               		}
                }
                
            }	
		},{
			xtype: "combobox",              //使用xtype定义
			name: "fatherId",                 //form提交时的名称
			fieldLabel: "父类名称",             //显示的Label
			id:'fuleiNV',
			store: menuNameStore,             //绑定的Store
			editable: false,				//是否可编辑
			triggerAction : 'all', 
			displayField: "text",           //显示的字段
			valueField: "id",            //值的字段
			emptyText: "--请选择--",        //当没有值时的水印文字
			queryMode: "local",              //查询模式
			anchor:"90%",
		},{
			xtype:'textfield',  
            fieldLabel:'新增节点名', 
            id:'newJdName',
            name:'text',  
            width:'180',  
            allowBlank:'节点名不能为空',
            anchor:"90%",
		},
		{
			xtype: "combobox",              //使用xtype定义
			name: "iconCls",               //form提交时的名称
			id:'jiedianIcon',
			fieldLabel: "节点图标",             //显示的Label
			store: jiedianStore,             //绑定的Store
			editable: false,                //是否可编辑
			displayField: "jiedianname",           //显示的字段
			valueField: "jiedianvalue",            //值的字段
			emptyText: "--请选择--",        //当没有值时的水印文字
			queryMode: "local" ,
			anchor:"90%",
		},
		{
			xtype:'textarea',  
            fieldLabel:'新增节点URL',
            id:'newJdURL',
            name:'url',  
            width:'180',  
            allowBlank:'节点的URL',
            anchor:"90%",
		}],
		buttonAlign: 'center',
		buttons: [
        {
            text: '保存',
            handler: function () {
            	var frm = Ext.getCmp("newAddMenuFormID");
            	if (!frm.getForm().isValid()){
            		return;
            	}
            	frm.getForm().submit({
            		url:'/extjsSpringM/meanAction/addMenuInfoToDb.do',
            		method:'post',
            		success: function(frm, action) {
			           Ext.Msg.alert('提示', '保存成功');
			           Ext.getCmp("addNewMenu").close(this);
			           store.load();
			         },
			        params:{
			        	fatherId:Ext.getCmp('fuleiNV').getValue()
			        },
			        failure: function(frm, action) {
			             Ext.Msg.alert('提示', '原因如下：' + action);
			        }
            		
            	});
            }
        }, {
            text: '关闭',
            handler: function () {
            	Ext.getCmp("addNewMenu").close(this);
            }
        }
      ]
	});
});