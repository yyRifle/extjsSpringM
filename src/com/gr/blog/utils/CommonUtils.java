package com.gr.blog.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.beanutils.BeanUtils;



/**
 * 常用的工具类
 * @author:gbp
 * 2017年12月26日 上午10:57:41
 */
public class CommonUtils {
	

	public static void main(String[] args) {
		char a='A';//62
		  for(int i=0;i<26;i++)
		   {
		   System.out.println(a);
		   a++;
		   }
		  System.out.println(getUUID32Bit());
	}
	
	/**
	 * 生成32位随机字符串(大写)
	 * @author:gbp
	 * @return
	 * 2018年1月15日 上午10:37:32
	 */
	public static String getUUID32Bit(){
		UUID uuid = UUID.randomUUID();
		return uuid.toString().toUpperCase().replaceAll("-", "");
	} 
	
	/**
	 * 校验传入的字段是否为空
	 * @author:gbp
	 * @param str 
	 * @return ture 不为空 false 为空
	 * 2017年12月26日 上午11:02:23
	 */
	public static boolean isNotEmpty(String str){
		if (!"".equals(str) && null != str) {
			return true;
		}else {
			return false;
		}
	}
	
	public static boolean isNotObject(Object obj){
		if (!"".equals(obj) && null != obj) {
			return true;
		}
		return false;
		
	}
	
	/**
	 * 获取当前时间
	 * @author:巩斌鹏
	 * 2018年5月30日 下午11:45:51
	 * @return
	 * String
	 */
	public static String getCurrentTime(){
		Date cDate = new Date();
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return format.format(cDate);
	}
	
	/**
	 * 借助.commons.beanutils转换map到Javabean
	 * @param map
	 * @param clazz
	 * @return
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 * @throws InvocationTargetException 
	 */
	public static Object mapToObject2(Map<String,Object> map,Class<?> clazz) throws InstantiationException, IllegalAccessException, InvocationTargetException {
		if (null == map) {
			return null;
		}
		Object obj = clazz.newInstance();
		BeanUtils.populate(obj, map);
		return obj;
		
	}
	
	/**
	 * 使用反射技术 将map转换成Javabean对象
	 * @param map
	 * @param clazz
	 * @return
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	public static Object mapToObject(Map<String,Object> map,Class<?> clazz) 
			throws InstantiationException, IllegalAccessException{
		if(null == map){
			return null;
		}
		Object obj = clazz.newInstance();
		Field[] fields =obj.getClass().getDeclaredFields();
		for(Field field : fields){
			int mod = field.getModifiers();
			if(Modifier.isStatic(mod) || Modifier.isFinal(mod)){    
                continue;    
            } 
			
			field.setAccessible(true);    
            field.set(obj, map.get(field.getName())); 
		}
		return obj;
	}
}
