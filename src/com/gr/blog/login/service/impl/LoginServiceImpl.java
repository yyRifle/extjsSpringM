package com.gr.blog.login.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gr.blog.login.service.LoginService;
import com.gr.blog.user.dao.UserDao;
import com.gr.blog.user.model.UserModel;
import com.gr.blog.utils.CollectionsUtil;

@Service("loginService")
public class LoginServiceImpl implements LoginService {

	@Resource
	private UserDao userDao;
	@Override
	public boolean ajaxUsernameVild(String username) {
		List<Map<String,Object>> userList = userDao.selectUserByUsername(username);
		if (CollectionsUtil.isListNotEmpty(userList)) {
			return true;
		}
		return false;
	}
	@Override
	public List<UserModel> findUserByUP(UserModel user) {
		List<UserModel> userList = userDao.selectLoginUser(user);
		if (CollectionsUtil.isListNotEmpty(userList) && userList.size() >= 1) {
			return userList;
		} else {
			return null;
		}
	}

}
