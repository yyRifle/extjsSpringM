package com.gr.blog.upload.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 多文件或者单文件上传的action
 * @author:巩斌鹏
 * 2018年5月22日 上午9:39:12
 */
@Controller
@RequestMapping("fileLoad")
public class FileLoadAction {

	@RequestMapping("batchLoad")
	public void batchFielUpload(){
		
	}
}
