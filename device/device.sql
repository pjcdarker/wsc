CREATE TABLE `tmp_device_price` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `model` varchar(255) DEFAULT NULL COMMENT '型号',
  `make` varchar(255) DEFAULT NULL COMMENT '品牌',
  `prodName` varchar(255) DEFAULT NULL COMMENT '产品名称',
  `sc` varchar(255) DEFAULT NULL COMMENT '分辨率',
  `inch` varchar(255) DEFAULT NULL COMMENT '屏幕尺寸',
  `price` int(10) DEFAULT '0' COMMENT '价格',
  `url` varchar(255) DEFAULT NULL COMMENT '网页url',
  `createTime` timestamp NULL DEFAULT NULL,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;