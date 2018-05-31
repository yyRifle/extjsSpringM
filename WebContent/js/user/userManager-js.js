
//修改该行的数据
function modeifyThisLine(value){
	var win = new Ext.create('Ext.window.Window',{
		title:'修改用户信息',
		id:'modeifyUserInfo',
		height:300,
		width:400,
		modal: true, //是否模态窗口，默认为false
		closable:false,     //隐藏关闭按钮;
	    draggable:true,     //窗口可拖动;
	    resizable: false,
	    items:[addUserPanelModeifyTab]
	});
	win.show();
}
//添加用户地址
function addAddr(value){
	alert(value);
}

//创建页面点击新增时弹出的window窗体的表单信息
var addUserPanelModeifyTab =new Ext.FormPanel({
	bodyStyle:'margin-top:10px',
	layoyt:'form',
	border:false,
	id:"formSubmitID",
	items:[{
		xtype:'textfield',
		fieldLabel:'用户名',
		name:'username',
		width:'180',  
        allowBlank:'用户名不能为空'
	},{
		xtype:'textfield',  
        intputType:'password',  
        fieldLabel:'密  码', 
        name:'password',  
        width:'180',  
        allowBlank:'密码不能为空',  
        minLength:6,  
        minLengthText:'密码长度为[6-20]',  
        maxLength:20,  
        maxLength:'密码长度为[6-20]'
	},{
		xtype:'textfield',  
        fieldLabel:'年龄*',  
        name:'age',  
        width:'180',  
        allowBlank:'年龄不能为空',  
        minLength:1,  
        minLengthText:'年龄不能小于[10]',  
        maxLength:20,  
        maxLength:'年龄不能超过[100]'
	},{
		xtype:'textfield',  
        fieldLabel:'联系电话',  
        name:'phone',  
        width:'180',  
        allowBlank:'联系电话不能为空' 
	},{
		xtype:'textfield',  
        fieldLabel:'Email',  
        name:'email',  
        width:'180',  
        allowBlank:'email不能为空' 
	},{
		xtype:'textfield',  
        fieldLabel:'是否可用',  
        name:'isEnable',  
        width:'180',  
        allowBlank:'email不能为空' 
	},{
		xtype:'textfield',  
        fieldLabel:'省份证',  
        name:'idCard',  
        width:'180',  
        allowBlank:'省份证不能为空'
	}],
	buttonAlign: 'center',
	buttons: [
    {
        text: '保存',
        handler: function () {
        	var frm = Ext.getCmp("formSubmitID");
        	if (!frm.getForm().isValid()){
        		return;
        	}
        	frm.getForm().submit({
        		url:'/extjsSpringM/userAction/addUserInfoToDb.do',
        		mthdod:'post',
        		success: function(form, action) {
		           Ext.Msg.alert('提示', '保存成功');
		           Ext.getCmp("winCe").close(this);
		           store.load();
		         },
		        failure: function(form, action) {
		             Ext.Msg.alert('提示', '原因如下：' + action.result.errors.info);
		        }
        		
        	});
        }
    }, {
        text: '关闭',
        handler: function () {
        	Ext.getCmp("modeifyUserInfo").close(this);
        }
    }
  ]
});