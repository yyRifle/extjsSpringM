package com.gr.blog.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * 解析excel
 * 
 * @author:巩斌鹏 2018年6月4日 下午2:37:23
 */
public class ExcelUtils {

	private static final String EXCEL_XLS = "xls";
	private static final String EXCEL_XLSX = "xlsx";

	/**
	 * 判断Excel的版本,获取Workbook
	 * @author:巩斌鹏
	 * 2018年6月4日 下午2:38:58
	 * @param in
	 * @param file
	 * @return
	 * @throws IOException
	 * Workbook
	 */
	public Workbook getWorkbok(InputStream in, File file)
			throws IOException {
		Workbook wb = null;
		if (file.getName().endsWith(EXCEL_XLS)) { // Excel 2003
			wb = new HSSFWorkbook(in);
		} else if (file.getName().endsWith(EXCEL_XLSX)) { // Excel 2007/2010
			wb = new XSSFWorkbook(in);
		}
		return wb;
	}

	/**
	 * 判断文件是否是excel
	 * 
	 * @throws Exception
	 */
	public void checkExcelVaild(File file) throws Exception {
		if (!file.exists()) {
			throw new Exception("文件不存在");
		}
		if (!(file.isFile() && (file.getName().endsWith(EXCEL_XLS) || file
				.getName().endsWith(EXCEL_XLSX)))) {
			throw new Exception("文件不是Excel");
		}
	}
	
	/**
	 * 读取Excel中的数据
	 * 备注：由于HSSFWorkbook只能操作excel2003一下版本,XSSFWorkbook只能操作excel2007以上版本，所以利用Workbook接口创建对应的对象操作excel来处理兼容性
	 * @author:巩斌鹏
	 * 2018年6月4日 下午2:43:28
	 * @param inputStream
	 * @param file
	 * @return
	 * String
	 * @throws Exception 
	 */
	public String readExcelDate(FileInputStream inputStream,File file) throws Exception{
		checkExcelVaild(file);
		HSSFWorkbook  workbook = (HSSFWorkbook) getWorkbok(inputStream, file);
		
		return null;
		
	}
	

}
