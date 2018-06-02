package com.gr.blog.dept.action;

import java.io.IOException;
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

import com.gr.blog.dept.model.DeptModel;
import com.gr.blog.dept.service.DeptService;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;

@Controller
public class DeptAction {

	private static final Logger logger = Logger.getLogger(DeptAction.class);
	
	@Autowired
	@Qualifier("deptService")
	private DeptService deptService;
	
	
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
		if (result > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'移除失败'} }");
		}
	}
	/**
	 * 移除菜单和部门的关系
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
		manuDeptMap.put("operate", uModel.getUsername());
		manuDeptMap.put("operateTime", CommonUtils.getStringCurrentTime());
		
		int result = deptService.insertMenuDeptToDbById(manuDeptMap);
		if (result > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'添加失败'} }");
		}
	}
	/**
	 * 部门权限管理界面点击权限分配时，展示【已存在】部门和菜单关系的数据
	 * @author:巩斌鹏
	 * 2018年6月1日 上午11:33:07
	 * @param request
	 * @param page
	 * @param start
	 * @param limit
	 * @return
	 * List<DeptModel>
	 */
	@RequestMapping("deptAction/showExistingDept")
	@ResponseBody
	public Map<String,Object> showExistingDept(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<DeptModel> deptList = deptService.showExistingDept(deptMap);
		deptMap.put("root", deptList);
		if (CollectionsUtil.isListNotEmpty(deptList)){
			deptMap.put("total", deptList.size());
		} 
		deptMap.put("total", "");
		System.out.println("左边的查询数据："+deptMap);
		return deptMap;
	}
	/**
	 * 部门权限管理界面点击权限分配时，展示【不存在】部门和菜单关系的数据
	 * @author:巩斌鹏
	 * 2018年6月1日 上午11:33:07
	 * @param request
	 * @param page
	 * @param start
	 * @param limit
	 * @return
	 * List<DeptModel>
	 */
	@RequestMapping("deptAction/showIsNotExistingDept")
	@ResponseBody
	public Map<String,Object> showIsNotExistingDept(HttpServletRequest request,int page,int start,int limit){
		Map<String,Object> deptMap = new HashMap<String,Object>();
		String dgId = request.getParameter("dgId");
		deptMap.put("dgId", dgId);
		deptMap.put("start", start);
		deptMap.put("limit", limit);
		List<DeptModel> deptList = deptService.showIsNotExistingDept(deptMap);
		deptMap.put("root", deptList);
		if (CollectionsUtil.isListNotEmpty(deptList)){
			deptMap.put("total", deptList.size());
		} 
		deptMap.put("total", "");
		System.out.println("右边的查询数据："+deptMap);
		return deptMap;
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
		return deptService.showAllDept(deptMap);
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
	private void addDeptInfoToDb(HttpServletRequest request,HttpServletResponse response,DeptModel dModel) throws IOException{
		UserModel usermode = (UserModel) request.getSession().getAttribute("userModel");
		String operate = usermode.getUsername();
		dModel.setOperate(operate);
		int intsertNm = deptService.addDeptInfoToDb(dModel);
		if (intsertNm > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'添加失败'} }");
		}
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
		if (deptNum > 0) {
			response.getWriter().print("{ success: true, errors: {} }");
		} else {
			response.getWriter().print("{ success: true, errors: {info:'删除失败'} }");
		}
	}
}
