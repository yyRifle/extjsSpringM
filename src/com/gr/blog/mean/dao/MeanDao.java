package com.gr.blog.mean.dao;

import java.util.List;
import java.util.Map;

import com.gr.blog.mean.model.MeanModel;

/**
 * 菜单Dao
 * @author:gbp
 * 2017年12月25日 上午11:33:29
 */
public interface MeanDao {

	public List<MeanModel> selectAllMean(String nodeId);

	public int selectTotalMenu();

	public List<MeanModel> selectALLTreeMenu(Map<String, Object> menuMap);

	public List<MeanModel> selectFeatherMenu();

	public int insertMenuInfoToDB(Map<String,Object> menuMap);

	public int selectFatherIdByName(String fatherName);

	public List<MeanModel> selectUrlIsNotNullMenu(String mtUrl);

}
