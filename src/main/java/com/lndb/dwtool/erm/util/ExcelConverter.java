package com.lndb.dwtool.erm.util;

import java.io.OutputStream;

import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class ExcelConverter {
	Workbook wb = new HSSFWorkbook();
	private CellStyle hdrStyle;
	private CellStyle dataStyle;

	public static interface ExcelDataSource {
		public String[] getHeaders();

		public String[] nextRow();

		public boolean hasNext();
	}

	public void addSheet(String sheetName, ExcelDataSource dataSource) {
		try {
			Sheet sheet = wb.createSheet(sheetName);
			int pos = 0;
			// write header
			if (dataSource.getHeaders() != null) {
				writeHeader(sheet, dataSource.getHeaders(), pos++);
			}
			while (dataSource.hasNext()) {
				writeRow(sheet, dataSource.nextRow(), pos++);
			}
		} catch (Exception e) {
			throw new RuntimeException("", e);
		}

	}

	public void writeOut(OutputStream os) {
		try {
			wb.write(os);
		} catch (Exception e) {
			throw new RuntimeException("", e);
		}
	}

	public void writeOut(OutputStream os, ExcelDataSource dataSource) {
		try {

			Sheet sheet = wb.createSheet("Sheet1");
			int pos = 0;
			// write header
			if (dataSource.getHeaders() != null) {
				writeHeader(sheet, dataSource.getHeaders(), pos++);
			}
			while (dataSource.hasNext()) {
				writeRow(sheet, dataSource.nextRow(), pos++);
			}
			wb.write(os);
		} catch (Exception e) {
			throw new RuntimeException("", e);
		}

	}

	private void writeRow(Sheet sheet, String[] data, int rowNum) {
		Row newRow = sheet.createRow(rowNum);
		short pos = 0;
		for (String hdr : data) {
			Cell newCell = newRow.createCell(pos);
			newCell.setCellValue(new HSSFRichTextString(hdr));
			newCell.setCellStyle(createDataStyle());
			pos++;
		}
	}

	private void writeHeader(Sheet sheet, String[] data, int rowNum) {
		Row newRow = sheet.createRow(rowNum);
		short pos = 0;
		for (String hdr : data) {
			Cell newCell = newRow.createCell(pos);
			newCell.setCellValue(hdr);
			newCell.setCellStyle(createHeaderStyle());
			pos++;
		}
	}

	protected CellStyle createHeaderStyle() {
		if (hdrStyle != null) {
			return hdrStyle;
		}
		Font bold = wb.createFont();
		hdrStyle = wb.createCellStyle();
		hdrStyle.setFont(bold);
		hdrStyle.setAlignment(HorizontalAlignment.CENTER);
		hdrStyle.setBorderBottom(BorderStyle.THIN);
		hdrStyle.setBorderTop(BorderStyle.THIN);
		hdrStyle.setBorderLeft(BorderStyle.THIN);
		hdrStyle.setBorderRight(BorderStyle.THIN);
		hdrStyle.setFillBackgroundColor(HSSFColorPredefined.GREY_50_PERCENT.getIndex());
		hdrStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		hdrStyle.setFillForegroundColor(HSSFColorPredefined.GREY_25_PERCENT.getIndex());
		hdrStyle.setFillBackgroundColor(HSSFColorPredefined.WHITE.getIndex());
		hdrStyle.setWrapText(true);
		return hdrStyle;
	}

	protected CellStyle createDataStyle() {
		if (dataStyle != null) {
			return dataStyle;
		}
		dataStyle = wb.createCellStyle();
		dataStyle.setAlignment(HorizontalAlignment.LEFT);
		dataStyle.setBorderBottom(BorderStyle.THIN);
		dataStyle.setBorderTop(BorderStyle.THIN);
		dataStyle.setBorderLeft(BorderStyle.THIN);
		dataStyle.setBorderRight(BorderStyle.THIN);
		hdrStyle.setWrapText(true);
		return dataStyle;
	}
}
