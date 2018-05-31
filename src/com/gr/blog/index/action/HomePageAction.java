package com.gr.blog.index.action;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 受页面相关的所有数据的类
 * @author:gbp
 * 2017年12月25日 上午11:21:35
 */
@Controller
public class HomePageAction {

	
	/**
	 * 受页面跳转
	 * @author:gbp
	 * @return
	 * 2017年12月25日 下午12:02:13
	 */
	@RequestMapping("homePageAction/index")
	public String homePage(HttpServletRequest request){
		request.getSession().setAttribute("username", "admin");
		String t1 = request.getRequestURI();
		String t2 = request.getRequestURL().toString();
		String t3 = request.getContextPath();
		System.out.println("t1:"+t1);
		System.out.println("t2:"+t2);
		System.out.println("t3:"+t3);
		System.out.println("t3:"+t3.length());
		return "login";
	}
}
