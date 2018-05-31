package com.gr.blog.user.model;

import java.util.Date;

/**
 * 用户相关的实体类
 * @author:gbp
 * 2017年12月25日 上午11:18:53
 */
public class UserModel {

	private String uid;
	
	private String username;
	
	private String nickname;//昵称
	
	private String password;
	
	private int age;
	
	private String phone;//联系电话
	
	private String email;//email
	
	private int isenable;//该用户是否可用 0 可用 1 不可用
	
	private int isdel;//是否删除 0 删除 1 不删除
	
	private String addrid;//用户和地址相关联的id
	
	private String idCard;//省份证
	
	private String operatename;//操作人
	
	private Date operatetime;//操作时间
	
	private String isSuperUser;//是否是超级管理员
	
	private String one1;//预留1
	
	private String one2;//预留2
	
	private String one3;//预留3
	
	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getIsenable() {
		return isenable;
	}

	public void setIsenable(int isenable) {
		this.isenable = isenable;
	}

	public int getIsdel() {
		return isdel;
	}

	public void setIsdel(int isdel) {
		this.isdel = isdel;
	}

	public String getAddrid() {
		return addrid;
	}

	public void setAddrid(String addrid) {
		this.addrid = addrid;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getOne1() {
		return one1;
	}

	public void setOne1(String one1) {
		this.one1 = one1;
	}

	public String getOne2() {
		return one2;
	}

	public void setOne2(String one2) {
		this.one2 = one2;
	}

	public String getOne3() {
		return one3;
	}

	public void setOne3(String one3) {
		this.one3 = one3;
	}
	
	public String getOperatename() {
		return operatename;
	}

	public void setOperatename(String operatename) {
		this.operatename = operatename;
	}

	public Date getOperatetime() {
		return operatetime;
	}

	public void setOperatetime(Date operatetime) {
		this.operatetime = operatetime;
	}

	public String getIsSuperUser() {
		return isSuperUser;
	}

	public void setIsSuperUser(String isSuperUser) {
		this.isSuperUser = isSuperUser;
	}
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public UserModel(String username, String password, int age, String phone,
			String email, int isenable, int isdel, String addrid, String idCard) {
		super();
		this.username = username;
		this.password = password;
		this.age = age;
		this.phone = phone;
		this.email = email;
		this.isenable = isenable;
		this.isdel = isdel;
		this.addrid = addrid;
		this.idCard = idCard;
	}

	public UserModel(String username, String password, int age, String phone,
			String email, String idCard) {
		super();
		this.username = username;
		this.password = password;
		this.age = age;
		this.phone = phone;
		this.email = email;
		this.idCard = idCard;
	}

	public UserModel() {
		super();
	}

	@Override
	public String toString() {
		return "UserModel [uid=" + uid + ", username=" + username
				+ ", nickname=" + nickname + ", password=" + password
				+ ", age=" + age + ", phone=" + phone + ", email=" + email
				+ ", isenable=" + isenable + ", isdel=" + isdel + ", addrid="
				+ addrid + ", idCard=" + idCard + ", operatename="
				+ operatename + ", operatetime=" + operatetime
				+ ", isSuperUser=" + isSuperUser + ", one1=" + one1 + ", one2="
				+ one2 + ", one3=" + one3 + "]";
	}

	
	
	
}
