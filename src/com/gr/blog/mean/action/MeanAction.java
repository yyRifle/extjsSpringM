package com.gr.blog.mean.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gr.blog.dept.model.DeptModel;
import com.gr.blog.dept.service.DeptService;
import com.gr.blog.mean.model.MeanModel;
import com.gr.blog.mean.service.MeanService;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;
import com.gr.blog.utils.ResponseUtils;

/**
 * 菜单管理的action
 * @author:gbp
 * 2017年12月25日 上午11:32:07
 */
@Controller
public class MeanAction {

	private static final Logger logger = Logger.getLogger(MeanAction.class);
	
	@Autowired
	@Qualifier(value="meanService")
	private MeanService meanService;
	
	@Autowired
	@Qualifier("deptService")
	private DeptService deptService;
	
	/**
	 * 部门权限管理界面点击权限分配时，展示【已存在】部门和菜单关系的数据
	 * @author:巩斌鹏
	 * 2018年6月3日 下午2:53:12
	 * @return
	 * Map<String,Object>
	 */
	@RequestMapping("meanAction/showLeftManuDate")
	public @ResponseBody Map<String,Object> showLeftManuDate(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");//dgid实际上是部门的id
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<MeanModel> deptList = meanService.showLeftManuDate(deptMap);
		deptMap.put("root", deptList);
		if (CollectionsUtil.isListNotEmpty(deptList)){
			deptMap.put("total", deptList.size());
		} 
		deptMap.put("total", "");
		logger.error("[左边的查询数据]:"+deptMap);
		return deptMap;
	}
	/**
	 * 部门权限管理界面点击权限分配时，展示【不存在】部门和菜单关系的数据
	 * @author:巩斌鹏
	 * 2018年6月3日 下午2:53:22
	 * @return
	 * Map<String,Object>
	 */
	@RequestMapping("meanAction/showRightManuDate")
	public @ResponseBody Map<String,Object> showRightManuDate(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");//dgid实际上是部门的id
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<MeanModel> deptList = meanService.showRightManuDate(deptMap);
		deptMap.put("root", deptList);
		if (CollectionsUtil.isListNotEmpty(deptList)){
			deptMap.put("total", deptList.size());
		} 
		deptMap.put("total", "");
		logger.error("[右边的查询数据]:"+deptMap);
		return deptMap;
	}
	
	
	
	
	/**
	 * 受页面进去之后加载所有的菜单
	 * @author:gbp
	 * @param request
	 * @return
	 * 2018年1月23日 上午11:39:05
	 * @throws IOException 
	 */
	@RequestMapping("meanAction/showAllTree")
	@ResponseBody
	public List<MeanModel> showAllTree(HttpServletRequest request,HttpServletResponse response) throws IOException{
		UserModel user = (UserModel) request.getSession().getAttribute("userModel");
		String node = request.getParameter("node");
		if (null != user) {
			String username = user.getUsername();
			List<DeptModel> deptList =deptService.getDeptInfoByUserName(user.getUid());
			if (CollectionsUtil.isListNotEmpty(deptList)) {
				DeptModel dm = deptList.get(0);
				String dgType = dm.getDgType();
				if ("superDept".equals(dgType)) {
					List<MeanModel> superModelMap = meanService.showAllTree(node);
					logger.error("[超管--受页面进去之后加载所有的菜单]："+superModelMap);
					return superModelMap;
				} else if ("common".equals(dgType)) {
					List<MeanModel> meanList = meanService.findMenuDateByUserName(username);//先获取该用户的权限的父节点
					logger.error("[普通用户--受页面进去之后加载所有的菜单]："+meanList);
					return meanList;
				} else if (!"superDept".equals(dgType) && !"common".equals(dgType) && !"root".equals(node)) {
					List<MeanModel> superModelMap = meanService.showAllTree(node);
					return superModelMap;
				}
			} else {
				return null;
			}
		} else {
			response.getWriter().print("{ success: true, errors: {info:'用户登陆已过期，请重新登陆'} }");
			return null;
		}
		return null;
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
	@RequestMapping("meanAction/showALLTreeMenu")
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
	@RequestMapping("meanAction/findFeatherMenu")
	public @ResponseBody List<MeanModel> findFeatherMenu(){
		List<MeanModel> menuList = meanService.findFeatherMenu();
		return menuList;
		
	}
	
	@RequestMapping("meanAction/addMenuInfoToDb")
	public void addMenuInfoToDb(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, String[]> menuMap = request.getParameterMap();
		Map<String,Object> addmap = new HashMap<String,Object>();
		addmap = CollectionsUtil.MapArrayToMapObject(menuMap, addmap);
		String username = (String)request.getSession().getAttribute("username");
		addmap.put("operate", username);
		int result = meanService.insertToDBMenuDate(addmap);
		ResponseUtils.returnResult(response, result);
	}
	
	/**
	 * 查询出所有的对应菜单与部门的关系
	 * @author:巩斌鹏
	 * 2018年6月3日 上午9:05:55
	 * @return
	 * Map<String,Object>
	 */
	public Map<String,Object> getRepeatMenuIdInfo(){
		Map<String,Object> resultMap = new HashMap<>();
		TreeSet<Integer> ts=new TreeSet<>();
		List<Map<String,Object>> menuAndDeptList = meanService.findMenuAndDept();
		if (CollectionsUtil.isListNotEmpty(menuAndDeptList)){
			String tt = "";
			for (Map<String,Object> map : menuAndDeptList) {
				int menuid = (int) map.get("menuid");
				ts.add(menuid);
				if (ts.contains(menuid)) {
					String value = (String) map.get("dgName");
					String resultTT = (String) resultMap.get(menuid+"");
					if (CommonUtils.isNotEmpty(resultTT)) {
						tt = resultTT+","+ value;
					} else {
						tt = value;
					}
				} 
				resultMap.put(menuid+"", tt);
				tt = "";
			}
			logger.error("[查询出所有的对应菜单与部门的关系]:"+resultMap);
			return (Map<String, Object>)resultMap;
		}
		return null;
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
