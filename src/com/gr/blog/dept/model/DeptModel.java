package com.gr.blog.dept.model;

import java.util.Date;

public class DeptModel {

	private int dgId;//部门或者组id
	
	private String dgName;//部门或者组name
	
	private String operate;//操作人
	
	private Date operateTime;

	public int getDgId() {
		return dgId;
	}

	public void setDgId(int dgId) {
		this.dgId = dgId;
	}

	public String getDgName() {
		return dgName;
	}

	public void setDgName(String dgName) {
		this.dgName = dgName;
	}

	public String getOperate() {
		return operate;
	}

	public void setOperate(String operate) {
		this.operate = operate;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	@Override
	public String toString() {
		return "DeptOrGroup [dgId=" + dgId + ", dgName=" + dgName
				+ ", operate=" + operate + ", operateTime=" + operateTime + "]";
	}

	public DeptModel() {
		super();
	}

	public DeptModel(String dgName) {
		super();
		this.dgName = dgName;
	}
	
	
	
}
