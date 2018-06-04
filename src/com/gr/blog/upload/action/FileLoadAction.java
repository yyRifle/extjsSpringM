package com.gr.blog.upload.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * 多文件或者单文件上传的action
 * @author:巩斌鹏
 * 2018年5月22日 上午9:39:12
 */
@Controller
@RequestMapping("fileLoadAction")
public class FileLoadAction {

	@RequestMapping("fileUploadDate")
	public void batchFielUpload(HttpServletRequest request,HttpServletResponse response,
								@RequestParam("file") MultipartFile file) throws Exception{
	}
}
