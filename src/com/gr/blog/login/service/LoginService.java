package com.gr.blog.login.service;

import java.util.List;

import com.gr.blog.user.model.UserModel;

public interface LoginService {

	public boolean ajaxUsernameVild(String username);

	public List<UserModel> findUserByUP(UserModel user);

}
