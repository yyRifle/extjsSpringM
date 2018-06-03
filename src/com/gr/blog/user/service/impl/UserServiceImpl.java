package com.gr.blog.user.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gr.blog.user.dao.UserDao;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.user.service.UserService;
import com.gr.blog.utils.CommonUtils;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;
	
	public List<UserModel> selectAllUserInfo(UserModel user,String isenableSecond, int page, int start,
			int limit) {
		//将查询条件和分页信息保存到Map中，简化sql编写
		Map<String,Object> userMap = new HashMap<String,Object>();
		userMap.put("username", user.getUsername());
		userMap.put("phone", user.getPhone());
		userMap.put("email", user.getEmail());
		userMap.put("isenable", user.getIsenable());
		userMap.put("idCard", user.getIdCard());
		userMap.put("isenableSecond", isenableSecond);
		
		userMap.put("page", page);
		userMap.put("start", start);
		userMap.put("limit", limit);
		
		return userDao.selectAllUserInfo(userMap);
	}

	public int insertUserInfoToDb(UserModel user) {
		String uuid = CommonUtils.getUUID32Bit();
		user.setUid(uuid);
		user.setOperatetime(new Date());
		return userDao.insertUserInfoToDb(user);
	}

	public int deleteOrBatch(String ids) {
		if ("".equals(ids)) {
			return 0;
		} 
		String[] arrid =ids.split(",");
		List<String> idList = Arrays.asList(arrid);
		return userDao.batchDeleteUserInfo(idList);
	}

	@Override
	public List<UserModel> findLeftUserInfo(Map<String, Object> deptMap) {
		return userDao.selectLeftUserInfo(deptMap);
	}

	@Override
	public List<UserModel> findRightUserInfo(Map<String, Object> deptMap) {
		return userDao.selectRightUserInfo(deptMap);
	}

	@Override
	public int addGroupOrDeptAndUserByID(Map<String, Object> dguMap) {
		dguMap.put("operateTime", CommonUtils.getStringCurrentTime());
		return userDao.insertGroupOrDeptAndUserByID(dguMap);
	}

	@Override
	public int removeGroupOrDeptAndUserByID(Map<String, Object> dguMap) {
		return userDao.deleteGroupOrDeptAndUserByID(dguMap);
	}
}
