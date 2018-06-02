package com.gr.blog.dept.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gr.blog.dept.dao.DeptDao;
import com.gr.blog.dept.model.DeptModel;
import com.gr.blog.dept.service.DeptService;
import com.gr.blog.utils.CollectionsUtil;
import com.gr.blog.utils.CommonUtils;

@Service("deptService")
public class DeptServiceImpl implements DeptService{

	@Resource
	private DeptDao deptDao;
	
	@Override
	public List<DeptModel> showAllDept(Map<String, Object> deptMap) {
		List<DeptModel> deptList = deptDao.selectAllDept(deptMap);
		if (CollectionsUtil.isListNotEmpty(deptList)) {
			return deptList;
		}
		return null;
	}

	@Override
	public int addDeptInfoToDb(DeptModel dModel) {
		Date operateTime = CommonUtils.getDateCurrentTime();
		dModel.setOperateTime(operateTime);
		return deptDao.insertDeptInfoToDB(dModel);
	}

	@Override
	public List<DeptModel> selectMenuDeptByDgId(String dgId) {
		return deptDao.selectMenuDeptByDgId(dgId);
	}

	@Override
	public int deleteDeptAndGroupInfo(String dgId) {
		return deptDao.deleteDeptAndGroupInfo(dgId);
	}

	@Override
	public List<DeptModel> showExistingDept(Map<String, Object> deptMap) {
		return deptDao.selectExistingDept(deptMap);
	}

	@Override
	public List<DeptModel> showIsNotExistingDept(Map<String, Object> deptMap) {
		return deptDao.selectIsNotExistingDept(deptMap);
	}

}
