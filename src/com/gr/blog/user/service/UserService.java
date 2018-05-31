package com.gr.blog.user.service;

import java.util.List;

import com.gr.blog.user.model.UserModel;

/**
 * 用户相关的service
 * @author:gbp
 * 2017年12月25日 上午11:19:31
 */
public interface UserService {
	
	List<UserModel> selectAllUserInfo(UserModel user,String isenableSecond, int page, int start, int limit);

	int insertUserInfoToDb(UserModel user);

	int deleteOrBatch(String ids);

}
