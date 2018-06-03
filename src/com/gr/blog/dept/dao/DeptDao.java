package com.gr.blog.dept.dao;

import java.util.List;
import java.util.Map;

import com.gr.blog.dept.model.DeptModel;
import com.gr.blog.mean.model.MeanModel;

public interface DeptDao {

	List<DeptModel> selectAllDept(Map<String, Object> deptMap);

	int insertDeptInfoToDB(Map<String,Object> map);

	List<DeptModel> selectMenuDeptByDgId(String dgId);

	int deleteDeptAndGroupInfo(String dgId);

	int deleteMenuAndDeptByID(Map<String, Object> map);

	int insertMenuDeptToDbById(Map<String, Object> map);

	int selectMenuAndDeptLinkById(Map<String, Object> map);
	
}
