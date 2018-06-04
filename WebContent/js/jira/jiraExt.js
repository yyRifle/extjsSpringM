/**
 * 用户管理界面的js
 * 
 */
var jiraStore;
var iHBody;
var iWBody;
Ext.onReady(function(){
	iHBody=document.body.clientHeight||document.documentElement.clientHeight;
	iWBody=document.body.clientWidth||document.documentElement.clientWidth;
	var model = Ext.define('jiraModel',{
		extend:'Ext.data.Model',
		fields:[
		        {name:'jid',type:'String'},
				{name:'username',type:'String'},
		        {name:'jiarNm',type:'String'},
		        {name:'isOnline',type:'int'},
		        {name:'isOwerSqlBat',type:'int'},
		        {name:'codeDivision',type:'String'},
		        {name:'implPrinciple',type:'String'},
		        {name:'codeLine',type:'String'},
		        {name:'codeNote',type:'String'},
		        {name:'onlineTime',type: 'string',convert:function(value){  
		            var createTime = Ext.Date.format(new Date(value),"Y-m-d");
		            return createTime;  
		        }}
		       ]
	});
	
	jiraStore = Ext.create('Ext.data.Store',{
		model:model,
		id:"jiraStore",
		autoLoad: true,
		pageSize: 20,  //页容量5条数据
		proxy:{
			type:'ajax',
			url:'/extjsSpringM/jiraAction/queryAlljira.do',
			reader:{
				type:'json',
				root: 'rows',  //数据
				totalProperty: 'total'
			}
		},
		autoLoad: true  //即时加载数据
	});
	var isSqlbatStore = Ext.create("Ext.data.Store", {
	    fields: ["SqlBatName", "SqlBatValue"],
	    data: [
	        { SqlBatName: "有sql脚本", SqlBatValue: 0 },
	        { SqlBatName: "无sql脚本", SqlBatValue: 1 }
	    ]
	});
	var isUpOnlineStore = Ext.create("Ext.data.Store", {
		fields: ["UpOnlineName", "UpOnlineValue"],
		data: [
		       { UpOnlineName: "已上线", UpOnlineValue: 0 },
		       { UpOnlineName: "未上线", UpOnlineValue: 1 }
		       ]
	});
	var codeDivisionStore = Ext.create("Ext.data.Store", {
		fields: ["codeDivisionName", "codeDivisionValue"],
		data: [
		       { codeDivisionName: "ngwf", codeDivisionValue: "ngwf" },
		       { codeDivisionName: "control", codeDivisionValue: "control" },
		       { codeDivisionName: "core", codeDivisionValue: "core" }
		       ]
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
				xtype:'label',
				text:'jira号'
			},
			{
				xtype:'textfield',
				id:'jiarNm'
			},'-',
			{
				xtype:'label',
				text:'是否已上线'
			},
			{
				xtype: "combobox",
				id:"OnlineId",
	            store: isUpOnlineStore,
	            editable: false,
	            bodyStyle:'padding-left:10px',
	            displayField: "UpOnlineName",
	            valueField: "UpOnlineValue",
	            listeners : {//初始化赋值 给下拉框
			      afterRender : function(combo) {
			      	Ext.getCmp("OnlineId").setRawValue("未上线");
			      	Ext.getCmp("OnlineId").setValue(1);
			      }
			   }
			},'-',
			{
				xtype:'label',
				text:'开始日期'
			},
			{
				xtype:'datefield',
				format : "Y-m-d H:i:s", 
				id:'beginTime'
			},'-',
			{
				xtype:'label',
				text:'结束日期'
			},
			{
				xtype:'datefield',
				format : "Y-m-d H:i:s", 
				id:'endTime'
			},'-',
			{
				text:'<span style="color:white;font-size:300">查询</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../images/minico/search.png',
				handler:function(){
					var username=Ext.getCmp('username').getValue();
					var phone=Ext.getCmp('jiarNm').getValue();
					var isenable=Ext.getCmp('beginTime').getValue();
					var email=Ext.getCmp('endTime').getValue();
					var isenableSecond="second";//添加一个区分首次加载还是查询
					
					jiraStore.load({params:{username:username,phone:phone,isenable:isenable,isenableSecond:isenableSecond,email:email,start: 0, limit: 25}});	
				}
			},'-',
			{
				text:'<span style="color:white;font-size:300">添加代码</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../images/minico/sign_add.png',
				id:'newbuttonQuery',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
					    layout: "fit", 
					    id:"addCodeLine",
					    title:'新增代码列表',
					    modal: true, //是否模态窗口，默认为false
					    height: iHBody-30,  
		                width: 520,
					    autoScroll: true, 
					   	closable:true,     //隐藏关闭按钮;
					    draggable:true,     //窗口可拖动;
					    resizable: false,
					    items:[addUserPanelAddTab]
					  });
					  win.show();
				}
			},{
				text:'<span style="color:white;font-size:300">上传文件</span>',
				style: 'background: #368ECE;border-color:#126DAF',
				icon: '../../images/minico/file_upload.png',
				id:'fileUploadExcelId',
				handler:function(){
					document.getElementById("btn_file").click(); 
				}
			}]
	});
	new Ext.create('Ext.grid.Panel',{
		id:'mianTabId',
		store:jiraStore,
		height:iHBody,
		width:iWBody,
        autoScroll:true,
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
    		{ header: '序号', xtype: 'rownumberer', width: '3%',align: 'center', sortable: false},
	        { text: '姓名', dataIndex: 'username',width:'7%',align: 'center',sortable: false},
	        { text: 'jira号',dataIndex:'jiarNm',width:'10%',align: 'center',
	        	renderer:function(value){
	        		var r = value;
	        		 return"<a href='http://192.168.100.9:9080/browse/"+r+"' target='_blank'><b>"+value+"</b></a>";
	        	}
	        },
	        { text: '上线时间', dataIndex: 'onlineTime',align: 'center',width:'10%',format:'Y年m月d日',sortable: false },
	        { 
	        	text: '是否已上线', 
	        	dataIndex: 'isOnline',
	        	align: 'center',
	        	width:'10%',
	        	renderer:function(value){
	        		 if(value=="0"){
	                         return"<font color='green'>已上线</font>";
	                  }else if(value=="1"){
	                         return"<font color='red' style='size:3'>未上线</font>";
	                  }
	        	}
	        },
	        { 
	        	text: '是否有sql脚本', 
	        	dataIndex: 'isOwerSqlBat',
	        	align: 'center',
	        	width:'10%',
	        	renderer:function(value){
	        		if(value=="0"){
	        			return"<font color='red' style='size:3'>有脚本</font>";
	        		}else if(value=="1"){
	        			return"<font color='green'>没有脚本</font>";
	        		}
	        	}
	        },
	        { text: '代码层', dataIndex: 'codeDivision',width: '10%',align: 'center', sortable: false },
	        { text: '备注信息', dataIndex: 'codeNote',width:'20%',align: 'center', sortable: false},
	        { text: 'jid',hidden:true, dataIndex: 'jid'},
	        {
	        	header:'查看列表',
	        	dataIndex:"button", 
	        	width:'5%',
	        	align: 'center',
	        	renderer:function(value, metaData, record){
	        		var uid = record.data.jid;
	        		btnStr='<span>'+'<img src="../../images/minico/search.png" alt="查看列表" onclick=\"openmsg(\''+uid+'\');\"/></span>';  
	        		return btnStr;
	        	}
	        },
	        {
	        	header:'查看原理',
	        	dataIndex:"button", 
	        	width:'5%',
	        	align: 'center',
	        	renderer:function(value, metaData, record){
	        		var uid = record.data.jid;
	        		btnStr='<span>'+'<img src="../../images/minico/search.png" alt="查看实现原理" onclick=\"openmsgYli(\''+uid+'\');\"/></span>';  
	        		return btnStr;
	        	}
	        },
	        {
	        	header:'操作栏',
	        	dataIndex:"button", 
	        	width:'7.5%',
			    align: 'center',
			    renderer:function(value, metaData, record){
			    	var uid = record.data.jid;
			    	btnStr='<span>'+'<img src="../../images/minico/sign_cacel.png" alt="删除" onclick="deleteJiarInfo('+uid+');"/>'+'&nbsp;&nbsp;'+
			    	'<img src="../../images/minico/editor.png" alt="修改" onclick="openmsgs('+uid+');"/></span>';  
			    	return btnStr;
			    }
	        }
    	],
    	bbar: [
    		{
    			xtype:'button',
    			text:'导出',
    			handler:function(){
    				alert("导出实现");
    			
    			}
    		},
    		{
                xtype: 'pagingtoolbar',
                store: jiraStore,
                displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
                emptyMsg: "没有数据",
                beforePageText: "当前页",
                afterPageText: "共{0}页",
                displayInfo: true
           }]
       
	});
	
	//创建页面点击新增时弹出的window窗体的表单信息
	var addUserPanelAddTab =new Ext.FormPanel({
		bodyStyle:'margin-top:3px',
		layoyt:'form',
		border:false,
		height: '100%',  
		id:"jiraSubmitId",
		items:[{
			xtype:'textfield',
			fieldLabel:'<font color="red">*</font>Jira号',
			name:'jiarNm',
			hight:'55',
			anchor:"90%",
			allowBlank:false,
            allowBlank:'jira号不能为空'
		},{
			xtype:'radiogroup',  
            fieldLabel:'<font color="red">*</font>是否已上线', 
            name:'isOnline',  
            anchor:"90%",
            items:[
                   new Ext.form.Radio({
                       boxLabel:'是',
                       name:'isOnline',
                       inputValue:'0'
                   }),
                   new Ext.form.Radio({
                       boxLabel:'否',
                       name:'isOnline',
                       inputValue:'1'
                   })
               ]       
		},{
            xtype: "combobox",              //使用xtype定义
			name: "isOwerSqlBat",                 //form提交时的名称
			fieldLabel: "是否有sql脚本",             //显示的Label
			store: isSqlbatStore,             //绑定的Store
			editable: false,				//是否可编辑
			triggerAction : 'all', 
			displayField: "SqlBatName",           //显示的字段
			valueField: "SqlBatValue",            //值的字段
			emptyText: "--请选择--",        //当没有值时的水印文字
			queryMode: "local",             //查询模式
			anchor:"90%",
		},{
			xtype:'datefield',  
            fieldLabel:'<font color="red">*</font>上线日期',  
            name:'onlineTime',  
            anchor:"90%",
            format: 'Y-m-d',
            allowBlank:false,
            allowBlank:'上线日期不能为空' 
		},{
			xtype:'combo',  
            fieldLabel:'<font color="red">*</font>影响代码层',  
            name:'codeDivision',
            multiSelect: true,
            editable: false,
            queryMode: 'local',
            store: codeDivisionStore,
            valueField: 'codeDivisionValue',
            displayField: 'codeDivisionName',
            triggerAction: 'all',
            anchor:"90%",
            allowBlank:false,
            allowBlank:'影响层不能为空' 
		},{
			xtype:'textarea',  
            fieldLabel:'实现原理',  
            name:'implPrinciple',  
            anchor:"90%",
            allowBlank:'实现原理不能为空'
		},{
			xtype:'htmleditor',  
            fieldLabel:'<font color="red">*</font>代码列表',  
            name:'codeLine',  
            width:'180', 
            anchor:"90%",
            allowBlank:false,
            allowBlank:'代码列表不能为空'
		},{
			xtype:'textarea',  
            fieldLabel:'备   注',  
            name:'codeNote',
            anchor:"90%",
		}],
		buttonAlign: 'center',
		buttons: [
        {
        	text:'<span style="color:white;font-size:300">保存</span>',
			style: 'background: #368ECE;border-color:#126DAF',
			icon: '../../images/minico/save.png',
            handler: function () {
            	var frm = Ext.getCmp("jiraSubmitId");
            	if (!frm.getForm().isValid()){
            		return;
            	}
            	frm.getForm().submit({
            		url:'/extjsSpringM/jiraAction/submitJirainfo.do',
            		method:'post',
            		success: function(form, action) {
			           Ext.Msg.alert('提示', '保存成功');
			           Ext.getCmp("addCodeLine").close(this);
			           jiraStore.load();
			         },
			        failure: function(form, action) {
			             Ext.Msg.alert('提示', '原因如下：' + action);
			        }
            		
            	});
            }
        }, {
        	text:'<span style="color:white;font-size:300">关闭</span>',
			style: 'background: #368ECE;border-color:#126DAF',
			icon: '../../images/minico/cancel.png',
            handler: function () {
            	Ext.getCmp("winCe").close(this);
            }
        }
      ]
	});
});
//查看该jira号提交的代码列表
function openmsg (value){
	Ext.Ajax.request({
		url:"/extjsSpringM/jiraAction/queryCodeLineByjid.do",
		mehtod:'get',
		params:{
			jid:value
		},
		success : function(response, options) {
			var jira = JSON.parse(response.responseText);
			var sis = "<font size='3'>"+jira[0].codeLine+"</font>"
			var win = Ext.create('Ext.window.Window',{
			    layout: "fit", 
			    modal: true, //是否模态窗口，默认为false
			    width:750,          //设置窗口大小;
			    height:400,
			   	closable:true,     //隐藏关闭按钮;
			    draggable:true,     //窗口可拖动;
			    resizable: false,
			    items:[
			           {
			        	   title:"代码列表",
			        	   html:sis}
			           ],
			  });
			  win.show();
		},
		failure : function() {
		
		}
	
	});
} 
//查看该jira号提交的实现原理
function openmsgYli (value){
	Ext.Ajax.request({
		url:"/extjsSpringM/jiraAction/queryShiXianByjid.do",
		mehtod:'get',
		params:{
			jid:value
		},
		success : function(response, options) {
			var jira = JSON.parse(response.responseText);
			var sis = "<font size='3'>"+jira[0].implPrinciple+"</font>"
			var win = Ext.create('Ext.window.Window',{
				layout: "fit", 
				modal: true, //是否模态窗口，默认为false
				width:550,          //设置窗口大小;
				height:300,
				closable:true,     //隐藏关闭按钮;
				draggable:true,     //窗口可拖动;
				resizable: false,
				items:[
				       {
				    	   title:"实现原理",
				    	   html:sis}
				       ],
			});
			win.show();
		},
		failure : function() {
			
		}
		
	});
} 
//删除该jira信息
function deleteJiarInfo (value){
	Ext.MessageBox.confirm("提示", "你确定要删除此项？", function(btnId){
		if (btnId == "yes") {  
			Ext.Ajax.request({
				url:"/extjsSpringM/jiraAction/deleteJiraInfoByJid.do",
				mehtod:'get',
				params:{
					jid:value
				},
				success : function(response, options) {
					Ext.Msg.alert('提示', '删除成功');
					jiraStore.load();
				},
				failure : function(response, options) {
					Ext.Msg.alert('提示', '原因如下：' + action);
				}
				
			});
		}else if (btnId == "no") {  
	       return;
	    }  
	});
}
