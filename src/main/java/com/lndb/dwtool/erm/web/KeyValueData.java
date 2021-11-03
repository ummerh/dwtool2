package com.lndb.dwtool.erm.web;

public class KeyValueData {
	public String key;
	public String value;

	public KeyValueData() {
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public KeyValueData(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}

}