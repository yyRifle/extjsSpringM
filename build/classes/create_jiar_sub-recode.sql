CREATE TABLE `jiar_sub_record` (
  `jid` varchar(32) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `jiar_nm` varchar(12) DEFAULT NULL COMMENT 'jira号',
  `is_online` int(2) DEFAULT NULL COMMENT '是否上线',
  `code_division` varchar(40) DEFAULT NULL COMMENT '提交的代码属于那一层',
  `impl_principle` varchar(1000) DEFAULT NULL COMMENT '实现原理',
  `code_line` text COMMENT '代码列表',
  `code_note` varchar(1000) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`jid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8