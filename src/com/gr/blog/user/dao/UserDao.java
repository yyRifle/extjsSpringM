package com.gr.blog.user.dao;

import java.util.List;
import java.util.Map;

import com.gr.blog.user.model.UserModel;

/**
 * 用户相关的Dao层操作
 * @author:gbp
 * 2017年12月25日 上午11:18:32
 */
public interface UserDao {
	
	List<UserModel> selectAllUserInfo(Map<String,Object> userMap);

	int insertUserInfoToDb(UserModel user);

	int batchDeleteUserInfo(List<String> id);

	List<UserModel> selectLoginUser(UserModel user);

	List<Map<String, Object>> selectUserByUsername(String username);


}
