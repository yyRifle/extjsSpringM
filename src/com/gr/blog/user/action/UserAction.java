package com.gr.blog.user.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.user.model.UserModel;
import com.gr.blog.user.service.UserService;

/**
 * 用户使用类
 * @author:gbp
 * 2017年12月25日 上午11:12:34
 */
@Controller
@RequestMapping("userAction")
public class UserAction {
	
	private static Logger logger = Logger.getLogger(UserAction.class);
	
	@Resource
	private UserService userService;
	/**
	 * 用户管理跳转到界面
	 * @author:gbp
	 * @return
	 * 2018年1月13日 下午5:20:25
	 */
	@RequestMapping("userManager")
	public String userManager(HttpServletRequest request){
		return "user/userManager";
	}
	
	/**
	 * 显示所有用户的数据
	 * @author:gbp
	 * @param request
	 * @param user 用户管理界面查询时的条件
	 * @param page 分页的page
	 * @param start 分页开始数
	 * @param limit 分页查询的限制
	 * @return
	 * 2018年1月13日 下午10:09:51
	 */
	@RequestMapping("showAllUser")
	public @ResponseBody List<UserModel> showAllUser(HttpServletRequest request,
			UserModel user,String isenableSecond,int page,int start,int limit){
		List<UserModel> userlist = userService.selectAllUserInfo(user,isenableSecond,page,start,limit);
		Map<String,Object> userMap = new HashMap<String,Object>();
		userMap.put("total", userlist.size());
		userMap.put("rows", userlist);
		return userlist;
	}
	
	/**
	 * 用户界面点击保存用户信息的方法
	 * @author:gbp
	 * @param request
	 * @param user
	 * 2018年1月15日 下午6:05:11
	 * @throws IOException 
	 */
	@RequestMapping("addUserInfoToDb")
	public void addUserInfoToDb(HttpServletRequest request,HttpServletResponse response,
			UserModel user) throws IOException{
		int result = userService.insertUserInfoToDb(user);
		logger.error("用户界面点击保存时，数据保存成功"+result);
		if (result > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'保存失败'} }");
		}
	}
	
	/**
	 * 用户界面删除/批量删除
	 * @author:gbp
	 * @param response
	 * @param ids
	 * 2018年1月15日 下午10:52:36
	 * @throws IOException 
	 */
	@RequestMapping("deleteOrBatch")
	public void deleteOrBatch(HttpServletResponse response,String ids) throws IOException{
		int result = userService.deleteOrBatch(ids);
		if (result > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'保存失败'} }");
		}
	}
}
