package com.gr.blog.jira.service;

import java.util.List;
import java.util.Map;

import com.gr.blog.jira.model.JiraModel;

public interface JiraService {

	/**
	 * 查询该用户所有的jiar
	 * @author:巩斌鹏
	 * 2018年5月29日 上午11:11:29
	 * @param username
	 * void
	 */
	public List<JiraModel> queryAlljira(Map<String,Object> jiraMap) throws RuntimeException;

	public int suibmitJirainfo(Map<String,Object> jiraMap);

	public List<JiraModel> queryByjid(String jid, String username);
	
	public int deleteJiraInfoByJid(String jid);

	public List<JiraModel> queryShiXianByjid(String jid, String nickname);

}
