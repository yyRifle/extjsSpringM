package com.gr.blog.mean.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gr.blog.mean.dao.MeanDao;
import com.gr.blog.mean.model.MeanModel;
import com.gr.blog.mean.service.MeanService;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;
import com.gr.blog.utils.Constants;

@Service("meanService")
public class MeanServiceImpl implements MeanService {

	@Resource
	private MeanDao meanDao;
	
	/**
	 * 得到所有的菜单数据
	 */
	@Override
	public Map<String,List<MeanModel>>showAllTree(String nodeId) {
		Map<String,List<MeanModel>> resultList = new HashMap<String, List<MeanModel>>();
		if ("root".equals(nodeId)){
			nodeId = "0"+"";
		}
		if (CommonUtils.isNotEmpty(nodeId)) {//首次加载
			List<MeanModel> treeList = meanDao.selectAllMean(nodeId);
			resultList.put("root", treeList);
			if (CollectionsUtil.isListNotEmpty(treeList)) {
				for (int i=0;i<treeList.size();i++) {
					MeanModel mm = treeList.get(i);
					int fatherId = mm.getFatherId();
					List<MeanModel> findList = meanDao.selectAllMean(Integer.toString(fatherId));
					resultList.put("children", findList);
				}
			}
		} 
		return resultList;
	}

	/**
	 * 查询总数
	 */
	@Override
	public int findTotalMenu() {
		return meanDao.selectTotalMenu();
	}
	
	/**
	 * 分页查询显示需要的数据
	 */
	@Override
	public List<MeanModel> showALLTreeMenu(MeanModel menu, int page, int start,
			int limit) {
		Map<String,Object> menuMap = new HashMap<String,Object>();
		menuMap.put("menu", menu);
		menuMap.put("page", page);
		menuMap.put("start", start);
		menuMap.put("limit", limit);
		return meanDao.selectALLTreeMenu(menuMap);
	}
	@Override
	public List<MeanModel> findFeatherMenu() {
		return meanDao.selectFeatherMenu();
	}
	@Override
	public int insertToDBMenuDate(Map<String, Object> menuMap) {
		String leaf = CollectionsUtil.getStringByMap(menuMap, "leaf");
		if ("0".equals(leaf)) {
			menuMap.put("fatherId", Constants.C_TYPE_0);
		}
		menuMap.put("operateTime", CommonUtils.getStringCurrentTime());
		int insertNum = meanDao.insertMenuInfoToDB(menuMap);
		return insertNum;
	}

	@Override
	public List<MeanModel> showUrlIsNotNullMenu() {
		String mtUrl = "";
		return meanDao.selectUrlIsNotNullMenu(mtUrl);
	}

}
