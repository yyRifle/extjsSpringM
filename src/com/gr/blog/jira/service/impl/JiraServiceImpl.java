package com.gr.blog.jira.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gr.blog.jira.dao.JiraDao;
import com.gr.blog.jira.model.JiraModel;
import com.gr.blog.jira.service.JiraService;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;

@Service("jiraService")
public class JiraServiceImpl implements JiraService{

	@Resource
	private JiraDao jiraDao;
	
	/**
	 * 查询当前用户的jira
	 */
	@Override
	public List<JiraModel> queryAlljira(Map<String,Object> jiraMap) throws RuntimeException {
		List<JiraModel> jiraList = jiraDao.selectAllJira(jiraMap);
		return jiraList;
		
		
	}

	@Override
	public int suibmitJirainfo(Map<String,Object> map) {
		String jid = CommonUtils.getUUID32Bit();
		map.put("jid", jid);
		map.put("operateTime", CommonUtils.getCurrentTime());
		Long resunltNum = jiraDao.insertJiarTableInfo(map);
		String resuNum = String.valueOf(resunltNum);
		int res = 0;
		if (CommonUtils.isNotEmpty(resuNum)){
			res = 1;//表示成功
		}
		return res;
	}

	@Override
	public List<JiraModel> queryByjid(String jid, String username) {
		Map<String,Object> jirMap = new HashMap<String, Object>();
		jirMap.put("jid", jid);
		jirMap.put("username", username);
		jirMap.put("start", 0);
		jirMap.put("limit", 10);
		List<JiraModel> jiraList = jiraDao.selectAllJira(jirMap);
		if (CollectionsUtil.isListNotEmpty(jiraList)) {
			return jiraList;
		}
		return null;
	}

	@Override
	public int deleteJiraInfoByJid(String jid) {
		int rs = jiraDao.deleteJiraInfoByJid(jid);
		if (rs >= 1) {
			return rs;
		}
		return 0;
	}

	@Override
	public List<JiraModel> queryShiXianByjid(String jid, String nickname) {
		Map<String,Object> jirMap = new HashMap<String, Object>();
		jirMap.put("jid", jid);
		jirMap.put("username", nickname);
		jirMap.put("start", 0);
		jirMap.put("limit", 10);
		List<JiraModel> jiraList = jiraDao.selectAllJira(jirMap);
		if (CollectionsUtil.isListNotEmpty(jiraList)) {
			return jiraList;
		}
		return null;
	}

}
