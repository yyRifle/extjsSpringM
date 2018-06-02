package com.gr.blog.help;

import java.util.List;

public class HelpModel<T> {

	private int total;
	
	private List<T> root;

	
	public HelpModel() {
		super();
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<T> getRoot() {
		return root;
	}

	public void setRoot(List<T> root) {
		this.root = root;
	}
	
	
}
