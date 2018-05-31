package com.gr.blog.utils;

import javax.xml.namespace.QName;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.endpoint.ClientImpl;
import org.apache.cxf.endpoint.Endpoint;
import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.apache.cxf.service.model.ServiceInfo;


/**
 * 调用ws的方法
 * @author:巩斌鹏
 * 2018年5月10日 下午2:48:35
 */
public class CommonWsUtil {

	public void endPoitWs(String wsdlUrl,QName qName){
		JaxWsDynamicClientFactory factory = JaxWsDynamicClientFactory.newInstance();
		Client client = factory.createClient(wsdlUrl, qName);
		ClientImpl clientimpl = (ClientImpl) client;
		Endpoint endpoint = clientimpl.getEndpoint();
		ServiceInfo serviceInfo = endpoint.getService().getServiceInfos().get(0);
		
		
	}
}
