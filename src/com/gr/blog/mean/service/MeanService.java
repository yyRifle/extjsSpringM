package com.gr.blog.mean.service;

import java.util.List;
import java.util.Map;

import com.gr.blog.mean.model.MeanModel;


/**
 * 菜单操作的service
 * @author:gbp
 * 2017年12月25日 上午11:34:03
 */
public interface MeanService {

	public Map<String,List<MeanModel>> showAllTree(String nodeId);

	public int findTotalMenu();

	public List<MeanModel> showALLTreeMenu(MeanModel menu, int page, int start,
			int limit);

	public List<MeanModel> findFeatherMenu();

	public int insertToDBMenuDate(Map<String, Object> addmap);

	public List<MeanModel> showUrlIsNotNullMenu();

}
