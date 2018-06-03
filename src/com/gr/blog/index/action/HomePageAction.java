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
		return "login";
	}
}
