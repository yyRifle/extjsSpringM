package com.gr.blog.login.loginAction;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.login.service.LoginService;
import com.gr.blog.mean.model.MeanModel;
import com.gr.blog.mean.service.MeanService;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.utils.CollectionsUtil;

@Controller
public class LoginAction {
	private static final Logger logger = Logger.getLogger(LoginAction.class);
	
	@Autowired
	@Qualifier("loginService")
	private LoginService loginService;
	
	@Autowired
	@Qualifier(value="meanService")
	private MeanService meanService;
	
	@RequestMapping("login")
	public String userLogin(UserModel user,HttpServletRequest request) throws IOException{
		HttpSession session = request.getSession();
		List<UserModel> userIsExit = loginService.findUserByUP(user);
		if (CollectionsUtil.isListNotEmpty(userIsExit)) {
			session.setAttribute("userModel", userIsExit.get(0));
			session.setMaxInactiveInterval(30*60);
			return "index/index";
		}
		return "login";
	}
	
	@RequestMapping("loginAction/ajaxUsernameVild")
	public void ajaxUsernameVild(String username,HttpServletResponse response) throws IOException{
		System.out.println("username:"+username);
		boolean isExtis = loginService.ajaxUsernameVild(username);
		String message = null;
		if (!isExtis) {
			message = "该用户不存在";
			response.getWriter().print(message);
		} 
		
	}
}
