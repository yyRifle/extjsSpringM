package com.gr.blog.utils;

import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

public class ConvertPwdPropertyConfigurer extends PropertyPlaceholderConfigurer {
	
	/**
	 * 一般spring容器启动时，通过PropertyPlaceholderConfigurer类读取jdbc.properties文件里的数据库配置信息。
		通过这个原理，我们把加密后的数据库配置信息放到jdbc.properties文件里，
		然后自定义一个继承PropertyPlaceholderConfigurer的类，实现解密，
		把解密后的信息又放回去。最后在配置DataSource时，还是用占位符${}取配置信息
	 */
	@Override
	protected void processProperties(
			ConfigurableListableBeanFactory beanFactory, Properties props)throws BeansException {
		try {
			String username = props.getProperty("jdbc.username");
			if (username != null) {
				props.setProperty("jdbc.username",Base64Utils.decodeData(username));
			}

			String password = props.getProperty("jdbc.password");
			if (password != null) {
				props.setProperty("jdbc.password",Base64Utils.decodeData(password));
			}
//
//			String url = props.getProperty("jdbc.url");
//			if (url != null) {
//				props.setProperty("jdbc.url",
//						des.Decrypt(url, des.hex2byte(key)));
//			}
//
//			String driverClassName = props.getProperty("jdbc.driverClassName");
//			if (driverClassName != null) {
//				props.setProperty("jdbc.driverClassName",
//						des.Decrypt(driverClassName, des.hex2byte(key)));
//			}

			super.processProperties(beanFactory, props);
		} catch (Exception e) {
			e.printStackTrace();
			throw new BeanInitializationException(e.getMessage());
		}
	}

}
