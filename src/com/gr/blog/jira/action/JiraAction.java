package com.gr.blog.jira.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.jira.model.JiraModel;
import com.gr.blog.jira.service.JiraService;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;
import com.gr.blog.utils.ResponseUtils;

/**
 * jira相关的所有来
 * 
 * @author:巩斌鹏 2018年5月29日 上午11:12:05
 */
@Controller
public class JiraAction {

	private static final Logger logger = Logger.getLogger(JiraAction.class);
	@Autowired
	@Qualifier("jiraService")
	private JiraService jiraService;
	
	/**
	 * 根据用户名查询该用户的所有的数据
	 * @author:巩斌鹏
	 * 2018年5月30日 下午3:27:49
	 * @param request
	 * @param jiraModel
	 * @param page
	 * @param start
	 * @param limit
	 * @return
	 * List<JiraModel>
	 */
	@RequestMapping("jiraAction/queryAlljira")
	@ResponseBody
	public List<JiraModel> queryAlljira(HttpServletRequest request,JiraModel jiraModel,
			int page,int start,int limit){
		Object obj = request.getSession().getAttribute("userModel");
		if (CommonUtils.isNotObject(obj)) {
			UserModel umodel = (UserModel)obj;
			jiraModel.setUsername(umodel.getUsername());
		}
		//对象转map
		Map<String,Object> jiraMap = CollectionsUtil.isobjectToMap(jiraModel);
		jiraMap.put("start", start);
		jiraMap.put("limit", limit);
		List<JiraModel> jiraList = jiraService.queryAlljira(jiraMap);
		logger.error("根据用户名查询该用户的所有的数据:"+jiraList);
		return jiraList;
	}
	
	/**
	 * 新提交代码列表时的方法
	 * @author:巩斌鹏
	 * 2018年5月29日 下午5:19:58
	 * @param request
	 * @param jiraModel
	 * @return
	 * String
	 * @throws IOException 
	 */
	@RequestMapping("jiraAction/submitJirainfo")
	public void suibmitJirainfo(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String,String[]> jirasMap =  request.getParameterMap();
		Map<String,Object> jiraMap = new HashMap<String, Object>();
		jiraMap = CollectionsUtil.MapArrayToMapObject(jirasMap, jiraMap);
		
		Object obj = request.getSession().getAttribute("userModel");
		if (CommonUtils.isNotObject(obj)) {
			UserModel umodel = (UserModel)obj;
			jiraMap.put("username", umodel.getUsername());
		}
		int submitNum = jiraService.suibmitJirainfo(jiraMap);
		ResponseUtils.returnResult(response, submitNum);
	}
	
	/**
	 * 根据jid查询得到数据
	 * @author:巩斌鹏
	 * 2018年5月29日 下午7:44:54
	 * @param request
	 * @param jid
	 * @return
	 * String
	 */
	@RequestMapping("jiraAction/queryCodeLineByjid")
	@ResponseBody
	public List<JiraModel> queryCodeLineByjid(HttpServletRequest request,String jid){
		Object obj = request.getSession().getAttribute("userModel");
		UserModel umodel = (UserModel)obj;
		List<JiraModel> jirlist = jiraService.queryByjid(jid,umodel.getNickname());
		return jirlist;
	}
	/**
	 * 根据jid查询得到数据
	 * @author:巩斌鹏
	 * 2018年5月29日 下午7:44:54
	 * @param request
	 * @param jid
	 * @return
	 * String
	 */
	@RequestMapping("jiraAction/queryShiXianByjid")
	public @ResponseBody List<JiraModel> queryShiXianByjid(HttpServletRequest request,String jid){
		Object obj = request.getSession().getAttribute("userModel");
		UserModel umodel = (UserModel)obj;
		List<JiraModel> jirlist = jiraService.queryShiXianByjid(jid,umodel.getNickname());
		return jirlist;
	}
	
	/**
	 * 根据jiraid删除jira信息
	 * @author:巩斌鹏
	 * 2018年5月31日 下午3:13:00
	 * void
	 * @throws IOException 
	 */
	@RequestMapping("jiraAction/deleteJiraInfoByJid")
	public @ResponseBody void deleteJiraInfoByJid(HttpServletRequest request,HttpServletResponse response) throws IOException {
		String jid = request.getParameter("jid");
		int redult = jiraService.deleteJiraInfoByJid(jid);
		ResponseUtils.returnResult(response, redult);
	}
}
