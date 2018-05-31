package com.gr.blog.ws.action;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.apache.cxf.staxutils.StaxUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 通过webserice接口查询【外部接口】得到结果的所有方法都在该类里面
 * @author:巩斌鹏
 * 2018年5月9日 下午7:37:43
 */
@Controller
@RequestMapping(value="wsQuery")
public class WebServiceQueryAction {
	private static final Logger logger = Logger.getLogger(WebServiceQueryAction.class);
	/**
	 * 通过传人的地点名称查询得到天气信息
	 * @author:巩斌鹏
	 * 2018年5月9日 下午7:45:26
	 * @param str 传人的地名，必须有值，不传，默认为查询北京的天气
	 * void
	 * @throws Exception 
	 */
	@RequestMapping(value="weatherQuery")
	public String weatherQuery(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String cities = request.getParameter("cities");
		JaxWsDynamicClientFactory clientFactory = JaxWsDynamicClientFactory.newInstance();
		System.out.println("第一步");
		Client  client= clientFactory.createClient("http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl");
		System.out.println("第二步");
//		Object[] result = client.invoke("getWeatherbyCityName", null);
//		System.out.println("result："+result[0]);
		logger.error("传人的地名 "+cities);
		return "other/weather/weatherQuery";
	}

	public static void main(String[] args) throws Exception {
		JaxWsDynamicClientFactory clientFactory = JaxWsDynamicClientFactory.newInstance();
		System.out.println("第一步");
		System.setProperty(StaxUtils.ALLOW_INSECURE_PARSER, "true");
		Client  client= clientFactory.createClient("http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl");
		System.out.println("第二步");
		Object[] result = client.invoke("getWeatherbyCityName", null);
		System.out.println("result："+result[0]);
	}
}
