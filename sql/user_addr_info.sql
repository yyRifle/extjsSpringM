CREATE TABLE user_addr_info(
	aid VARCHAR(33) NOT NULL,
	addr VARCHAR(200) COMMENT '详细地址',
	isdefault VARCHAR(2) COMMENT '是否为默认地址 0 为默认',
	uid VARCHAR(33) COMMENT '用户表主键',
	PRIMARY KEY(aid)
)ENGINE=INNODB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8