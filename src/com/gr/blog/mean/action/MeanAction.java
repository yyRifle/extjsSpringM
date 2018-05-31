package com.gr.blog.mean.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.mean.model.MeanModel;
import com.gr.blog.mean.service.MeanService;
import com.gr.blog.utils.CollectionsUtil;

/**
 * 菜单管理的action
 * @author:gbp
 * 2017年12月25日 上午11:32:07
 */
@Controller
@RequestMapping("meanAction")
public class MeanAction {

	private static final Logger logger = Logger.getLogger(MeanAction.class);
	
	@Autowired
	@Qualifier(value="meanService")
	private MeanService meanService;
	
	/**
	 * 受页面进去之后加载所有的菜单
	 * @author:gbp
	 * @param request
	 * @return
	 * 2018年1月23日 上午11:39:05
	 */
	@RequestMapping("showAllTree")
	@ResponseBody
	public Map<String,List<MeanModel>> showAllTreeIndex(HttpServletRequest request){
		String node = request.getParameter("node");
		Map<String,List<MeanModel>> modelMap = meanService.showAllTree(node);
		logger.error("受页面进去之后加载所有的菜单："+modelMap);
		return modelMap;
	}
	
	/**
	 * 菜单管理页面显示菜单信息的方法
	 * @author:gbp
	 * @param request
	 * @param page
	 * @param start
	 * @param limit
	 * @return
	 * 2018年1月23日 上午11:42:00
	 */
	@RequestMapping("showALLTreeMenu")
	public @ResponseBody Map<String,Object> showALLTreeMenu(HttpServletRequest request,
			MeanModel menu,int page,int start,int limit){
		logger.error("传人的菜单对象"+menu);
		Map<String,Object> menuMap = new HashMap<String,Object>();
		List<MeanModel> menuList = meanService.showALLTreeMenu(menu,page,start,limit);
		int total = this.findTotalMenu();
		menuMap.put("total", total);
		menuMap.put("rows", menuList);
		return menuMap;
		
	}
	
	/**
	 * 新增菜单是 显示父类节点的方法
	 * @author:gbp
	 * @return
	 * 2018年1月23日 下午3:35:36
	 */
	@RequestMapping("findFeatherMenu")
	public @ResponseBody List<MeanModel> findFeatherMenu(){
		List<MeanModel> menuList = meanService.findFeatherMenu();
		return menuList;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("addMenuInfoToDb")
	public void addMenuInfoToDb(HttpServletRequest request,HttpServletResponse response){
		Map<String, String[]> menuMap = request.getParameterMap();
		Map<String,Object> addmap = new HashMap<String,Object>();
		addmap = CollectionsUtil.MapArrayToMapObject(menuMap, addmap);
		String username = (String)request.getSession().getAttribute("username");
		addmap.put("operate", username);
		int result = meanService.insertToDBMenuDate(addmap);
	}
	
	/**
	 * 查询菜单的总数
	 * @author:gbp
	 * @return
	 * 2018年1月23日 上午11:49:27
	 */
	public int findTotalMenu(){
		return meanService.findTotalMenu();
		
	}
}
