package com.gr.blog.dept.service;

import java.util.List;
import java.util.Map;

import com.gr.blog.dept.model.DeptModel;

public interface DeptService {

	//查询所有的部门或者组信息
	List<DeptModel> showAllDept(Map<String, Object> deptMap);
	//添加部门或者组信息
	int addDeptInfoToDb(DeptModel dModel);
	//根据dgid查询部门或者组是否存在和菜单的关联关系
	List<DeptModel> selectMenuDeptByDgId(String dgId);
	//删除部门信息
	int deleteDeptAndGroupInfo(String dgId);
	//部门权限管理界面点击权限分配时，展示【已存在】部门和菜单关系的数据
	List<DeptModel> showExistingDept(Map<String, Object> deptMap);
	//部门权限管理界面点击权限分配时，展示【不存在】部门和菜单关系的数据
	List<DeptModel> showIsNotExistingDept(Map<String, Object> deptMap);

}
