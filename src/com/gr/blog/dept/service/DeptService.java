package com.gr.blog.dept.service;

import java.util.List;
import java.util.Map;

import com.gr.blog.dept.model.DeptModel;
import com.gr.blog.mean.model.MeanModel;

public interface DeptService {

	//查询所有的部门或者组信息
	List<DeptModel> showAllDept(Map<String, Object> deptMap);
	//添加部门或者组信息
	int addDeptInfoToDb(Map<String,Object> map);
	//根据dgid查询部门或者组是否存在和菜单的关联关系
	List<DeptModel> selectMenuDeptByDgId(String dgId);
	//删除部门信息
	int deleteDeptAndGroupInfo(String dgId);
	
	//根据menuid和部门id移除他们的之间的关系
	int removeMenuAndDeptByID(Map<String, Object> map);
	
	//根据menuid和部门id插入他们的之间的关系
	int insertMenuDeptToDbById(Map<String, Object> map);
	//根据部门id和菜单id查询他们是否存在关联关系
	int findMenuAndDeptLinkById(Map<String, Object> map);
	//根据userid 查询部门的信息
	List<DeptModel> getDeptInfoByUserName(String uid);
	

}
