package com.gr.blog.utils;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

/**
 * 公共的返回放个
 * @author:巩斌鹏
 * 2018年6月3日 上午11:55:54
 */
public class ResponseUtils {

	public static void returnResult(HttpServletResponse response,int result) throws IOException{
		if (result > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'保存失败'} }");
		}
	}
}
