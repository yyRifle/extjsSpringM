package com.gr.blog.dept.action;

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

@Controller
public class DeptAction {

	private static final Logger logger = Logger.getLogger(DeptAction.class);
	
	@Autowired
	@Qualifier("deptService")
	private DeptService deptService;
	
	@Autowired
	@Qualifier(value="meanService")
	private MeanService meanService;
	/**
	 * 查询menu中只有子菜单的数据
	 * @author:巩斌鹏
	 * 2018年6月1日 上午11:05:38
	 * @return
	 * List<MeanModel>
	 */
	@RequestMapping("deptAction/showAllDeptMenuLink")
	public @ResponseBody Map<String,Object> showAllDeptMenuLink(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<DeptModel> deptList = deptService.showAllDept(deptMap);//查询出所有的部门信息
		
		Map<String,Object> reMap = getRepeatMenuIdInfo();
		
		Map<String,Object> resultMap =new HashMap<>();
		if (CollectionsUtil.isListNotEmpty(deptList)){
			for (DeptModel menu : deptList) {
				int dgid = menu.getDgId();
				if(null != reMap && reMap.size() >0) {
					String value = CollectionsUtil.getStringByMap(reMap, dgid+"");
					menu.setDeptMenuLink(value);
				}
				resultMap.put("root", deptList);
			}
			resultMap.put("total", deptList.size());
		}
		logger.error("[查询menu中只有子菜单的数据]:"+resultMap+"\n");
		return resultMap;
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
				int dgid = (int) map.get("dgid");
				ts.add(dgid);
				if (ts.contains(dgid)) {
					String value = (String) map.get("menuName");
					String resultTT = (String) resultMap.get(dgid+"");
					if (CommonUtils.isNotEmpty(resultTT)) {
						tt = resultTT+","+ value;
					} else {
						tt = value;
					}
				} 
				resultMap.put(dgid+"", tt);
				tt = "";
			}
			logger.error("[查询出所有的部门与菜单的关系]:"+resultMap);
			return (Map<String, Object>)resultMap;
		}
		return null;
	}
	
	/**
	 * 移除菜单和部门的关系
	 * @author:巩斌鹏
	 * 2018年6月2日 下午3:26:43
	 * @param request
	 * void
	 * @throws IOException 
	 */
	@RequestMapping("deptAction/removeMenuAndDeptByID")
	public @ResponseBody void removeMenuAndDeptByID(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String,String[]> allMap = request.getParameterMap();
		Map<String,Object> manuDeptMap = new HashMap<String,Object>();

		manuDeptMap = CollectionsUtil.MapArrayToMapObject(allMap, manuDeptMap);
		int result = deptService.removeMenuAndDeptByID(manuDeptMap);
		ResponseUtils.returnResult(response, result);
	}
	/**
	 * 添加菜单和部门的关系
	 * @author:巩斌鹏
	 * 2018年6月2日 下午3:26:43
	 * @param request
	 * void
	 * @throws IOException 
	 */
	@RequestMapping("deptAction/addMenuAndDeptByID")
	public @ResponseBody void addMenuAndDeptByID(HttpServletRequest request,HttpServletResponse response) throws IOException{
		UserModel uModel = (UserModel)request.getSession().getAttribute("userModel");
		Map<String,String[]> allMap = request.getParameterMap();
		
		Map<String,Object> manuDeptMap = new HashMap<String,Object>();
		manuDeptMap = CollectionsUtil.MapArrayToMapObject(allMap, manuDeptMap);
		logger.error("[添加菜单和部门的关系-查询时map]:"+manuDeptMap);
		int selectNum = deptService.findMenuAndDeptLinkById(manuDeptMap);
		if (selectNum > 0) {
			response.getWriter().print("{ success: true, errors: {info:'添加失败！他们之间已存在关联关系'} }");
			return;
		}
		manuDeptMap.put("operate", uModel.getUsername());
		manuDeptMap.put("operateTime", CommonUtils.getStringCurrentTime());
		
		logger.error("[添加菜单和部门的关系-插入时map]:"+manuDeptMap);
		int result = deptService.insertMenuDeptToDbById(manuDeptMap);
		ResponseUtils.returnResult(response, result);
	}
	
	/**
	 * 查询所有的部门信息
	 * @author:巩斌鹏
	 * 2018年6月1日 上午9:51:20
	 * @param request
	 * @param page
	 * @param start
	 * @param limit
	 * @return
	 * List<DeptModel>
	 */
	@RequestMapping("deptAction/showAllDept")
	@ResponseBody
	public List<DeptModel> showAllDept(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<DeptModel> resultMode = deptService.showAllDept(deptMap);
		logger.error("[查询所有的部门信息]："+resultMode);
		return resultMode;
	}
	
	/**
	 * 添加部门或者组信息
	 * @author:巩斌鹏
	 * 2018年6月1日 上午10:02:45
	 * @param request
	 * @param response
	 * @param dModel
	 * @throws IOException
	 * void
	 */
	@RequestMapping("deptAction/addDeptInfoToDb")
	@ResponseBody
	private void addDeptInfoToDb(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgName = request.getParameter("dgName");
		UserModel usermode = (UserModel) request.getSession().getAttribute("userModel");
		deptMap.put("dgName", dgName);
		deptMap.put("operate", usermode.getUsername());
		int intsertNm = deptService.addDeptInfoToDb(deptMap);
		ResponseUtils.returnResult(response, intsertNm);
	}
	
	/**
	 * 删除部门信息
	 * @author:巩斌鹏
	 * 2018年6月1日 上午10:15:42
	 * @param request
	 * @param response
	 * @throws IOException
	 * void
	 */
	@RequestMapping("deptAction/deleteDeptAndGroupInfo")
	@ResponseBody
	public void deleteDeptAndGroupInfo(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String dgId = request.getParameter("dgId");
		List<DeptModel> deptList = deptService.selectMenuDeptByDgId(dgId);
		if (CollectionsUtil.isListNotEmpty(deptList)){
			response.getWriter().print("{ success: true, errors: {info:'部门或者组存在关联关系,请清除关联再删除'} }");
			return;
		}
		int deptNum = deptService.deleteDeptAndGroupInfo(dgId);
		ResponseUtils.returnResult(response, deptNum);
	}
}
