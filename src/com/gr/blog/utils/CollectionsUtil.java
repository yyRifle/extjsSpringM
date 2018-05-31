package com.gr.blog.utils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 判断list map set等集合是否为空
 * @author:巩斌鹏
 * 2018年5月12日 下午6:06:25
 */
public class CollectionsUtil {

	/**
	 * 判断list不能为空
	 * @author:巩斌鹏
	 * 2018年5月12日 下午6:07:59
	 * @param list
	 * @return
	 * boolean
	 */
	public static boolean isListNotEmpty(List list){
		if (null != list && list.size() > 0) {
			return true;
		}
		return false;
	}
	
	public static boolean isMapNotEmpty(Map map){
		if (!map.isEmpty() && map.size() > 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * 从map中取到string值
	 * @author:巩斌鹏
	 * 2018年5月30日 下午11:04:51
	 * @param map
	 * @param str
	 * @return
	 * String
	 */
	public static String getStringByMap(Map<String,Object> map,String str){
		if (isMapNotEmpty(map)){
			String strRes = (String)map.get(str);
			return strRes;
		} 
		return null;
	}
	
	/**
	 * Object对象转map
	 * @author:巩斌鹏
	 * 2018年5月29日 下午5:49:01
	 * @param clazz
	 * @param map
	 * @return
	 * Map<String,Object>
	 */
	public static Map<String,Object> isobjectToMap(Object obj){
		Map<String, Object> map = new HashMap<String, Object>();  
        // System.out.println(obj.getClass());  
        // 获取f对象对应类中的所有属性域  
        Field[] fields = obj.getClass().getDeclaredFields();  
        for (int i = 0, len = fields.length; i < len; i++) {  
            String varName = fields[i].getName();  
            varName = varName.toLowerCase();//将key置为小写，默认为对象的属性  
            try {  
                // 获取原来的访问控制权限  
                boolean accessFlag = fields[i].isAccessible();  
                // 修改访问控制权限  
                fields[i].setAccessible(true);  
                // 获取在对象f中属性fields[i]对应的对象中的变量  
                Object o = fields[i].get(obj);  
                if (o != null)  
                    map.put(varName, o);  
                // 恢复访问控制权限  
                fields[i].setAccessible(accessFlag);  
            } catch (IllegalArgumentException ex) {  
                ex.printStackTrace();  
            } catch (IllegalAccessException ex) {  
                ex.printStackTrace();  
            }  
        }
		return map;  
	}
	
	/**
	 * 将Map<String,String[]>类型转换为Map<String,Object>
	 * @author:巩斌鹏
	 * @agro:第一个是String[]
	 * @agro:第二个是object
	 * 2018年5月30日 下午11:48:36
	 * void
	 */
	public static Map<String,Object> MapArrayToMapObject(Map<String,String[]> mapString,
			Map<String,Object> mapObject){
		for (Map.Entry entry : mapString.entrySet()) {  
			   String key = entry.getKey().toString();  
			   String[] list= (String[]) entry.getValue();  
			   for (String value : list) {  
				   mapObject.put(key, value);
			   }  
		}
		return mapObject;
	}
}
