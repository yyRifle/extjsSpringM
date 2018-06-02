var dgId;
function findDeptPerm(value){
	var array = value.split("@@");
	dgId = array[0];
	dgName = array[1];
	var win = Ext.create('Ext.window.Window',{
		id:"deptAndGroups",
	    title:'<span style="color:black">菜单与部门关系</span>'+'&nbsp;&nbsp;(<font color="red">'+dgName+"</font>)",       //弹出窗口内布局会充满整个窗口;
	    layout: "fit", 
	    modal: true, //是否模态窗口，默认为false
	    width:480,          //设置窗口大小;
	    height:510,
	   // closeAction:'hide', //点击右上角关闭按钮后会执行的操作;
	   	closable:true,     //隐藏关闭按钮;
	    draggable:true,     //窗口可拖动;
	    items:[{ 
	           //layout:"column",
		    	layout: {  
		            type: 'hbox',  
		            align: 'stretch'  
		        },  
	           width: 480,  
	           height: 510, 
	           items:[
					{  
					    title: '已有的部门',  
					    flex:1, 
					    html: '<iframe width="100%" height="100%" scrolling="no" id="deptLeftPerm" frameborder="0" src="/extjsSpringM/js/perm/dept/deptLeftColumn.html"></iframe>'  
					}, {  
					    title: '没有的部门',  
					    flex:1,   
					    html: '<iframe width="100%" height="100%" scrolling="no" id="deptReightPerm" frameborder="0" src="/extjsSpringM/js/perm/dept/deptRightColumn.html"></iframe>'  
					}
	           ]
	    }],  
	  });
	  win.show();
}
