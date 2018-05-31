package com.gr.blog.jira.dao;

import java.util.List;
import java.util.Map;

import com.gr.blog.jira.model.JiraModel;

public interface JiraDao {

	List<JiraModel> selectAllJira(Map<String,Object> jiraMap);

	Long insertJiarTableInfo(Map<String,Object> map);

	int deleteJiraInfoByJid(String jid);

}
