//创建记录日志信息的数据库表
CREATE TABLE `blog_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `thread_name` varchar(60) DEFAULT NULL COMMENT '线程名',
  `log_level` varchar(10) DEFAULT NULL COMMENT '日志级别',
  `log_content` mediumtext,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8