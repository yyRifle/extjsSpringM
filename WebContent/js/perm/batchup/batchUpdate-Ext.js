Ext.define('htdocs.js.myUx.upload.UploadPanel',{  
    extend:"Ext.panel.Panel",  
    alias:"widget.multiFileUploadPanel",  
    layout : 'fit',  
    config:{  
        //处理上传文件的服务器端页面的url地址，可以是绝对地址，也可以是相对地址，当为相对地址时相对的是当前代码所在的文档地址  
        upload_url:"",  
        //swfupload.swf文件的绝对或相对地址，相对地址是指相对于当前的页面地址。实例化swfupload后，就不能再改变该属性的值了  
        flash_url:"",  
        file_post_name:"",  
        //上传文件最大体积100MB 有效的单位有B、KB、MB、GB，默认单位是KB  
        file_size_limit:'1000MB',  
        //该属性指定了允许上传的文件类型，当有多个类型时使用分号隔开，比如：*.jpg;*.png ,允许所有类型时请使用 *.*  
        file_types:'*.*',  
        //设置文件选择对话框中显示给用户的文件描述。默认值All Files  
        file_types_description:'All Files',  
        //这里限制的是一个SWFUpload实例控制上传成功的文件总数。最大队列数，把该属性设为0时表示不限制文件的上传数量。  
        file_upload_limit:3,  
        //post_params定义了一些键/值对，允许在上传每个文件时候捎带地post给服务器  
        post_params:{}  
    },  
  
  
    initComponent:function(){  
        var me = this;  
        me.setting={  
            upload_url: me.upload_url,  
            flash_url: me.flash_url,  
            file_post_name: me.file_post_name,  
            file_size_limit: me.file_size_limit,  
            file_types: me.file_types,  
            file_types_description: me.file_types_description,  
            file_upload_limit: me.file_upload_limit,  
            file_queue_limit: me.file_queue_limit,  
            post_params: me.post_params,  
            //设置为false时post_params定义的参数为使用post方式进行上传，true为get方式上传  
            use_query_string: true,  
            //false为不开启debug模式，在flash中不会输出调试信息  
            debug: true,  
            //设置鼠标悬停在Flash Button时的光标样式，默认值是SWFUpload.CURSOR.ARROW(箭头光标),SWFUpload.CURSOR.HAND(手势)  
            button_cursor: SWFUpload.CURSOR.HAND,  
            /*设置浏览器具体以哪种模式显示该SWF影片,默认值SWFUpload.WINDOW_MODE.WINDOW,可用值在SWFUpload.WINDOW_MODE常量里面查找 
             * WINDOW 是默认模式. flash影片绘制在页面的最上层. 
             * OPAQUE 允许页面其他元素遮盖这个按钮影片。 
             * TRANSPARENT 透明。按钮的背景呈透明状，允许html元素在它下面显示 
             */  
            button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,  
            custom_settings : {//自定义参数  
                    scope_handler : me  
            },  
            //浏览器不支持某重要特性参数  
            swfupload_preload_handler:me.swfuploadPreloadHandler,  
            //通常是因为没有安装Flash Player或者它的版本低于 9.0.28  
            swfupload_load_failed_handler:me.swfuploadLoadFailedHandler,  
            //当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，那么针对每个成功加入的文件都会触发一次该事件  
            file_queued_handler:me.fileQueuedHandler,  
            //当选择文件对话框关闭时，如果选择的文件加入到上传队列中失败，那么针对每个出错的文件都会触发一次该事件  
            file_queue_error_handler:me.fileQueryErrorHandler,  
            //开始上传时触发事件  
            upload_start_handler:me.uploadStartHandler,  
            //服务端返回信息（不管是否成功或失败）都会触发该事件  
            upload_success_handler:me.uploadSuccessHandler,  
            //请求错误触发该事件  
            upload_error_handler:me.uploadErrorHandler,  
            //上传进度事件  
            upload_progress_handler:me.uploadProgressHandler  
              
        };  
          
        me.items=[Ext.create('Ext.grid.Panel',{  
            border : false,  
            autoScroll:true,  
            store: Ext.create('Ext.data.Store',{  
                storeId:"fileStoreId",  
                autoLoad : false,  
                fields : ['id','fileName','fileType','fileSize','filePercent','status']  
            }),  
            columns:[  
                {xtype: 'rownumberer',fit:1},  
                {header: '文件名',fit:1, width: 100, dataIndex: 'fileName',sortable: true, menuDisabled:true},  
                {header: '类型',fit:1, width: 100, dataIndex: 'fileType',sortable: true, menuDisabled:true},  
                {header: '大小',fit:1, width: 100, dataIndex: 'fileSize',sortable: true, menuDisabled:true,renderer:this.fileSize},  
                {header: '进度',fit:2, width: 160, dataIndex: 'filePercent',sortable: true, menuDisabled:true,renderer:this.fileProgressBar},  
                {header: '详细进度',fit:1, width: 100,dataIndex: 'filePercent',sortable: true, menuDisabled:true,renderer:this.fileDetailedProgressBar},  
                {header: '状态',fit:1, width: 100, dataIndex: 'status',sortable: true, menuDisabled:true,renderer:this.fileState},  
                {header: ' ', dataIndex: 'id',hidden:true,sortable: true, menuDisabled:true}  
            ],  
            tbar:[{  
                xtype: 'toolbar',  
                height:25,  
                id:"toolbar",  
                border:false,  
                items:[  
                {iconCls: 'icon-add',id:'btnFileAdd',text: '添加',scope: this},'-',  
                {iconCls: 'icon-upload',id:'btnFileStart',text: '开始上传',scope: this,handler:this.startUpload},'-',  
                {iconCls: 'icon-del',id:'btnFileRemove',text: '清空列表',scope: this,handler:this.removeAll}]  
            }],  
            listeners:{  
                'afterrender':function(){  
                    var em=Ext.get("btnFileAdd-btnInnerEl");  
                    var placeHolderId = Ext.id();  
                    em.createChild({  
                        id : placeHolderId  
                    });  
                      
                    me.swfupload = new SWFUpload(Ext.apply(me.setting,{  
                        button_width : em.getWidth(),  
                        button_height : em.getHeight(),  
                        button_placeholder_id :placeHolderId  
                    }));  
                      
                    Ext.get(me.swfupload.movieName).setStyle({  
                        position:'absolute',  
                        left:"0px"  
                    });  
                },  
                scope : this,  
                delay : 100  
            }  
        })];  
          
        me.callParent();  
    },  
      
    swfuploadPreloadHandler:function(){  
        if (!this.support.loading) {  
            Ext.Msg.show({  
                title : '提示',  
                msg : '浏览器不支持某重要特性参数,请升级浏览器版本',  
                width : 250,  
                icon : Ext.Msg.ERROR,  
                buttons :Ext.Msg.OK  
            });  
            return false;  
        }  
    },  
      
    swfuploadLoadFailedHandler:function(){  
        Ext.Msg.show({  
            title : '提示',  
            msg : 'Flash Player版本过低！',  
            width : 180,  
            icon : Ext.Msg.ERROR,  
            buttons :Ext.Msg.OK  
        });  
    },  
      
    //添加队列  
    fileQueuedHandler:function(file){  
        Ext.data.StoreManager.lookup("fileStoreId").add({  
            id : file.id,  
            fileName : file.name,  
            fileSize : file.size,  
            fileType : file.type,  
            status : file.filestatus,  
            filePercent : 0  
        });  
    },  
      
    //选择文件时出错函数  
    fileQueryErrorHandler:function(object,code,message){  
        var me = this;  
        var errorMessage="未知错误!";  
        switch(code){  
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED : errorMessage='队列满额,不能添加文件';  
            break;  
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT : errorMessage='超过了所限制的文件大小,最大支持'+me.settings.file_size_limit;  
            break;  
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE : errorMessage='不能上传空文件,此文件为0字节';  
            break;  
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE : errorMessage='不支持该文件类型';  
            break;  
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED : errorMessage="暂停了上传";  
            break;  
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:errorMessage="取消了上传";  
            break;  
            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL :errorMessage="没有设置上传地址";  
            break;  
            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND  :errorMessage="在硬盘中没有找到上传文件，请确认文件是否存在";  
            break;  
            default:errorMessage;  
            break;  
        }  
        Ext.Msg.show({  
            title : '提示',  
            msg : errorMessage,  
            width : 250,  
            icon : Ext.Msg.WARNING,  
            buttons :Ext.Msg.OK  
        });  
    },  
      
      
    uploadStartHandler:function(file){  
        var me = this;  
        var post_params = me.settings.post_params;   
        Ext.apply(post_params,{  
            //fileName:encodeURIComponent(file.name)  
            type:file.type,  
            size:file.size  
        });  
        me.setPostParams(post_params);  
    },  
      
    //上传进度条  
    uploadProgressHandler:function(file,complete,bytes){  
        var ds = Ext.data.StoreManager.lookup("fileStoreId");  
        var percent = Math.ceil((complete / bytes) * 100);  
        console.log("进度"+percent);  
        for(var i=0;i<ds.getCount();i++){  
            var record =ds.getAt(i);  
            if(record.get('id')==file.id){  
                record.set('filePercent', percent);  
                record.set('status', file.filestatus);  
                record.commit();  
            }  
        }  
    },  
      
    //上传成功  
    uploadSuccessHandler:function(file,data,response){  
        var me = this.customSettings.scope_handler;  
        var ds = Ext.data.StoreManager.lookup("fileStoreId");  
        var record = ds.getById(file.id);  
        if(Ext.JSON.decode(data).success){  
            record.set('status', file.filestatus);    
        }else{  
            record.set('status', SWFUpload.FILE_STATUS.ERROR);  
        }  
        record.commit();  
    },  
      
    //上传失败  
    uploadErrorHandler:function(file,code,message){  
        var ds = Ext.data.StoreManager.lookup("fileStoreId");  
        var record = ds.getById(file.id);  
        record.set('filePercent', '0');  
        record.set('status', file.filestatus);  
        record.commit();  
    },  
      
    startUpload:function(){  
        var me = this;  
        if(me.swfupload && me.swfupload.getStats().files_queued){  
            me.swfupload.startUpload();  
        }else{  
            Ext.Msg.show({  
                title : '提示',  
                msg : "请添加需要上传的文件",  
                width : 250,  
                icon : Ext.Msg.WARNING,  
                buttons :Ext.Msg.OK  
            });  
        }  
    },  
      
    removeAll : function(){  
        var ds = Ext.data.StoreManager.lookup("fileStoreId");  
        for(var i=0;i<ds.getCount();i++){  
            var record =ds.getAt(i);  
            var file_id = record.get('id');  
            this.swfupload.cancelUpload(file_id,false);           
        }  
        ds.removeAll();  
    },  
      
    //可视状态  
    fileState:function(status){  
        switch(status){  
            case SWFUpload.FILE_STATUS.QUEUED  : return '未上传';  
            break;  
            case SWFUpload.FILE_STATUS.IN_PROGRESS  : return '正在上传';  
            break;  
            case SWFUpload.FILE_STATUS.ERROR  : return '<div style="color:red;">上传失败</div>';  
            break;  
            case SWFUpload.FILE_STATUS.COMPLETE  : return '上传成功';  
            break;  
            case SWFUpload.FILE_STATUS.CANCELLED  : return '取消上传';  
            break;  
            default: return status;  
        }  
    },  
      
    //可视大小  
    fileSize : function(_v, celmeta, record) {  
        return '<div id="fileSize_' + record.data.id + '">' + Ext.util.Format.fileSize(_v) + '</div>';  
    },  
      
    //进度条  
    fileProgressBar:function(_v, cellmeta, record) {  
        var progress ='<div class="progress-bar blue stripes">'+        
                        '<span style="width:'+_v+'%;"></span>'+  
                    '</div>';  
          
        return progress;  
    },  
      
    fileDetailedProgressBar:function(_v, cellmeta, record){  
        return _v+"%";  
    }  
});  

Ext.create('Ext.window.Window',{  
    width : 750,  
    title : '多文件上传演示窗口',  
    height : 300,  
    layout : 'fit',  
    items:[{  
        xtype:'multiFileUploadPanel',  
        upload_url:'',  
        file_post_name:'file',  
        flash_url: '/resource/swf/swfupload.swf'  
    }]  
}).show();  