
Create Table

CREATE TABLE `user_info` (
  `uid` varchar(33) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `isenable` int(2) DEFAULT NULL,
  `isdel` int(2) DEFAULT NULL,
  `addrid` varchar(33) DEFAULT NULL,
  `idCard` varchar(40) DEFAULT NULL,
  `one1` varchar(60) DEFAULT NULL,
  `one2` varchar(60) DEFAULT NULL,
  `one3` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
