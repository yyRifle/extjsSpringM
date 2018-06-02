package com.gr.blog.dept.dao;

import java.util.List;
import java.util.Map;

import com.gr.blog.dept.model.DeptModel;

public interface DeptDao {

	List<DeptModel> selectAllDept(Map<String, Object> deptMap);

	int insertDeptInfoToDB(DeptModel dModel);

	List<DeptModel> selectMenuDeptByDgId(String dgId);

	int deleteDeptAndGroupInfo(String dgId);

	List<DeptModel> selectExistingDept(Map<String, Object> deptMap);

	List<DeptModel> selectIsNotExistingDept(Map<String, Object> deptMap);
	
}
