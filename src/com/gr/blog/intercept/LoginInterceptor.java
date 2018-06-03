package com.gr.blog.intercept;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 登录系统拦截器
 * @author:gbp
 * 2018年1月30日 下午8:49:29
 */
public class LoginInterceptor implements HandlerInterceptor{
	
	private static final Logger logger = Logger.getLogger(LoginInterceptor.class);
	/**
	 *  Handler执行完成之后调用这个方法
	 */
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
	}

	/**
	 * Handler执行之后，ModelAndView返回之前调用这个方法 
	 */
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2, ModelAndView arg3) throws Exception {
	}

	/**
	 * Handler执行之前调用这个方法 
	 */
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object args) throws Exception {
//		List<String> ipaddrList = new ArrayList<>();
//		ipaddrList.add("homePageAction/index.do");
//		ipaddrList.add("login.do");
//		String loginURL = request.getRequestURL().toString();
//		String usernmae = request.getParameter("username");
//		String password = request.getParameter("password");
//		String subURL = loginURL.substring(loginURL.indexOf("extjsSpringM")+13, loginURL.length());
//		System.out.println("===========subURL:"+subURL);
//		if (!ipaddrList.contains(subURL) && !"".equals(usernmae) && !"".equals(password)){
//			return false;
//		}
		return true;
	}

}
