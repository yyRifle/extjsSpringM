package com.gr.blog.jira.model;

import java.util.Date;

public class JiraModel {

	private String jid;
	
	private String username;
	
	private String jiarNm;//jira号
	
	private int isOnline;//是否上线
	
	private int isOwerSqlBat;//是否有sql脚本
	
	private Date onlineTime;//上线日期
	
	private String codeDivision;//提交的代码属于那一层
	
	private String implPrinciple;//实现原理
	
	private String codeLine;//代码列表
	
	private String codeNote;//备注

	
	public JiraModel() {
		super();
	}
	
	public JiraModel(String username, String jiarNm) {
		super();
		this.username = username;
		this.jiarNm = jiarNm;
	}

	public JiraModel(String username, String jiarNm, String codeLine) {
		super();
		this.username = username;
		this.jiarNm = jiarNm;
		this.codeLine = codeLine;
	}

	public String getJid() {
		return jid;
	}

	public void setJid(String jid) {
		this.jid = jid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getJiarNm() {
		return jiarNm;
	}

	public void setJiarNm(String jiarNm) {
		this.jiarNm = jiarNm;
	}

	public int getIsOnline() {
		return isOnline;
	}

	public void setIsOnline(int isOnline) {
		this.isOnline = isOnline;
	}

	public String getCodeDivision() {
		return codeDivision;
	}

	public void setCodeDivision(String codeDivision) {
		this.codeDivision = codeDivision;
	}

	public String getImplPrinciple() {
		return implPrinciple;
	}

	public void setImplPrinciple(String implPrinciple) {
		this.implPrinciple = implPrinciple;
	}

	public String getCodeLine() {
		return codeLine;
	}

	public void setCodeLine(String codeLine) {
		this.codeLine = codeLine;
	}

	public String getCodeNote() {
		return codeNote;
	}

	public void setCodeNote(String codeNote) {
		this.codeNote = codeNote;
	}
	
	public Date getOnlineTime() {
		return onlineTime;
	}

	public void setOnlineTime(Date onlineTime) {
		this.onlineTime = onlineTime;
	}
	
	public int getIsOwerSqlBat() {
		return isOwerSqlBat;
	}

	public void setIsOwerSqlBat(int isOwerSqlBat) {
		this.isOwerSqlBat = isOwerSqlBat;
	}

	@Override
	public String toString() {
		return "JiraModel [jid=" + jid + ", username=" + username + ", jiarNm="
				+ jiarNm + ", isOnline=" + isOnline + ", codeDivision="
				+ codeDivision + ", implPrinciple=" + implPrinciple
				+ ", codeLine=" + codeLine + ", codeNote=" + codeNote + "]";
	}
	
	
}
