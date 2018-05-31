package com.gr.blog.mean.model;

import java.util.List;

/**
 * 菜单实体类
 * @author:gbp
 * 2017年12月25日 上午11:32:58
 */
public class MeanModel {

	private int id;//节点id
	
	private String text;//节点名称
	
	/**
	 * 必须得有该字段，并且该字段为leaf，不能有其他的名称，类型一定为boolean,
	 */
	private boolean leaf;//是否为子节点 0 是 1 否  最后有独立的uRL的 才为1 否则都为0
	
	private String url;//点击节点时传入的URL
	
	private String iconCls;//节点图标 folder还是file 
	
	private int fatherId;//父节点
	
	private List<MeanModel> childrenNode;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	


	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	

	public int getFatherId() {
		return fatherId;
	}

	public void setFatherId(int fatherId) {
		this.fatherId = fatherId;
	}

	public List<MeanModel> getChildrenNode() {
		return childrenNode;
	}

	public void setChildrenNode(List<MeanModel> childrenNode) {
		this.childrenNode = childrenNode;
	}

	@Override
	public String toString() {
		return "MeanModel [id=" + id + ", text=" + text + ", leaf=" + leaf
				+ ", url=" + url + ", iconCls=" + iconCls + ", fatherId="
				+ fatherId + ", childrenNode=" + childrenNode + "]";
	}

	
	
}
