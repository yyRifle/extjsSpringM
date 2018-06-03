package com.gr.blog.user.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.user.model.UserModel;
import com.gr.blog.user.service.UserService;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.ResponseUtils;

/**
 * 用户使用类
 * @author:gbp
 * 2017年12月25日 上午11:12:34
 */
@Controller
public class UserAction {
	
	private static Logger logger = Logger.getLogger(UserAction.class);
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	/**
	 * 【添加】部门与用户的关系到关联表
	 * @author:巩斌鹏
	 * 2018年6月3日 上午11:45:36
	 * void
	 * @throws IOException 
	 */
	@RequestMapping("userAction/addGroupOrDeptAndUserByID")
	public void addGroupOrDeptAndUserByID(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String,Object> dguMap = new HashMap<>();
		dguMap = CollectionsUtil.MapArrayToMapObject(request.getParameterMap(), dguMap);
		UserModel uModel = (UserModel) request.getSession().getAttribute("userModel");
		dguMap.put("operate", uModel.getUsername());
		int addNum = userService.addGroupOrDeptAndUserByID(dguMap);
		ResponseUtils.returnResult(response, addNum);
	}
	/**
	 * 【移除】部门与用户的关系到关联表
	 * @author:巩斌鹏
	 * 2018年6月3日 上午11:45:36
	 * void
	 * @throws IOException 
	 */
	@RequestMapping("userAction/removeGroupOrDeptAndUserByID")
	public void removeGroupOrDeptAndUserByID(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String,Object> dguMap = new HashMap<>();
		dguMap = CollectionsUtil.MapArrayToMapObject(request.getParameterMap(), dguMap);
		UserModel uModel = (UserModel) request.getSession().getAttribute("userModel");
		dguMap.put("operate", uModel.getUsername());
		int removeNum = userService.removeGroupOrDeptAndUserByID(dguMap);
		ResponseUtils.returnResult(response, removeNum);
	}
	
	/**
	 * 组或者部门权限管理界面查询【左边】列表的数据
	 * @author:巩斌鹏
	 * 2018年6月3日 上午11:14:53
	 * @return
	 * Map<String,Object>
	 */
	@RequestMapping("userAction/findLeftUserInfo")
	public @ResponseBody Map<String,Object> findLeftUserInfo(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");//组或者部门id
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<UserModel> userList = userService.findLeftUserInfo(deptMap);
		deptMap.put("root", userList);
		if (CollectionsUtil.isListNotEmpty(userList)){
			deptMap.put("total", userList.size());
		} 
		deptMap.put("total", "");
		return deptMap;
	}
	/**
	 * 组或者部门权限管理界面查询【右边】列表的数据
	 * @author:巩斌鹏
	 * 2018年6月3日 上午11:14:53
	 * @return
	 * Map<String,Object>
	 */
	@RequestMapping("userAction/findRightUserInfo")
	public @ResponseBody Map<String,Object> findRightUserInfo(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");//组或者部门id
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<UserModel> userList = userService.findRightUserInfo(deptMap);
		deptMap.put("root", userList);
		if (CollectionsUtil.isListNotEmpty(userList)){
			deptMap.put("total", userList.size());
		} 
		deptMap.put("total", "");
		return deptMap;
	}
	
	/**
	 * 退出系统的方法
	 * @author:巩斌鹏
	 * 2018年6月2日 下午4:34:42
	 * @param request
	 * @throws ServletException
	 * @throws IOException
	 * void
	 */
	@RequestMapping("userAction/removeSessionUserModel")
	public String removeSessionUserModel(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
		request.getSession().removeAttribute("userModel");
		return "login";
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
	@RequestMapping("userAction/showAllUser")
	public @ResponseBody List<UserModel> showAllUser(HttpServletRequest request,
			UserModel user,String isenableSecond,int page,int start,int limit){
		List<UserModel> userlist = userService.selectAllUserInfo(user,isenableSecond,page,start,limit);
		Map<String,Object> userMap = new HashMap<String,Object>();
		userMap.put("total", userlist.size());
		userMap.put("rows", userlist);
		return userlist;
	}
	
	/**
	 * 首页面用户登录时，获取用户信息的ajax后台调用
	 * @author:巩斌鹏
	 * 2018年6月3日 下午12:22:26
	 * @param request
	 * @return
	 * UserModel
	 */
	@RequestMapping("userAction/getIndexUserModel")
	public @ResponseBody UserModel getIndexUserModel(HttpServletRequest request){
		UserModel uModel = (UserModel)request.getSession().getAttribute("userModel");
		return uModel;
	}
	/**
	 * 用户界面点击保存用户信息的方法
	 * @author:gbp
	 * @param request
	 * @param user
	 * 2018年1月15日 下午6:05:11
	 * @throws IOException 
	 */
	@RequestMapping("userAction/addUserInfoToDb")
	public void addUserInfoToDb(HttpServletRequest request,HttpServletResponse response,
			UserModel user) throws IOException{
		int result = userService.insertUserInfoToDb(user);
		logger.error("用户界面点击保存时，数据保存成功"+result);
		ResponseUtils.returnResult(response, result);
	}
	
	/**
	 * 用户界面删除/批量删除
	 * @author:gbp
	 * @param response
	 * @param ids
	 * 2018年1月15日 下午10:52:36
	 * @throws IOException 
	 */
	@RequestMapping("userAction/deleteOrBatch")
	public void deleteOrBatch(HttpServletResponse response,String ids) throws IOException{
		int result = userService.deleteOrBatch(ids);
		ResponseUtils.returnResult(response, result);
	}
}
