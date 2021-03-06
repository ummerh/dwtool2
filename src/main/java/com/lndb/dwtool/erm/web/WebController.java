package com.lndb.dwtool.erm.web;

import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lndb.dwtool.erm.SchemaJoinMetaData;
import com.lndb.dwtool.erm.db.ConnectionDetail;
import com.lndb.dwtool.erm.db.DBMap;
import com.lndb.dwtool.erm.db.DBMapCache;
import com.lndb.dwtool.erm.db.TableDescriptor;
import com.lndb.dwtool.erm.ddl.DDLGenerator;
import com.lndb.dwtool.erm.hive.HiveDDLGenerator;
import com.lndb.dwtool.erm.util.ConnectionRepository;

@Controller
public class WebController {
	@RequestMapping(value = "/connections", method = RequestMethod.POST)
	public @ResponseBody ConnectionDetail newConnection(HttpServletRequest req, HttpServletResponse res,
			@RequestBody ConnectionDetail spec) throws Exception {
		ConnectionRepository.saveConnection(spec);
		ConnectionDetail conDetail = ConnectionDetail.configure(spec.getName());
		spec.setValid(ConnectionRepository.isValid(conDetail));
		return spec;
	}

	@RequestMapping(value = "/connections", method = RequestMethod.GET)
	public @ResponseBody List<ConnectionDetail> connections(HttpServletRequest req, HttpServletResponse res)
			throws Exception {
		return ConnectionRepository.getAllConnections();
	}

	@RequestMapping(value = "/connections", method = RequestMethod.DELETE)
	public @ResponseBody void deleteConnection(HttpServletRequest req, HttpServletResponse res,
			@RequestBody ConnectionDetail spec) throws Exception {
		ConnectionRepository.deleteConnection(spec.getName());
	}

	@RequestMapping(value = "/connections/{connectionName}/tables", method = RequestMethod.GET)
	public @ResponseBody List<TableDescriptor> getTables(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		return dbMap.getAllTableDescriptors();
	}

	@RequestMapping(value = "/connections/{connectionName}/hive", method = RequestMethod.GET)
	public @ResponseBody KeyValueData getHiveDDL(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		StringWriter out = new StringWriter();
		List<TableDescriptor> tbls = dbMap.getAllTableDescriptors();
		for (TableDescriptor tableDescriptor : tbls) {
			out.write(HiveDDLGenerator.hiveETLTableDDL(tableDescriptor));
			out.write("\n\n");
		}
		return new KeyValueData("ddl", out.toString());
	}

	@RequestMapping(value = "/connections/{connectionName}/ddl", method = RequestMethod.GET)
	public @ResponseBody KeyValueData getDDL(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		StringWriter out = new StringWriter();
		new DDLGenerator(dbMap).writeSchemaDDL(out);
		return new KeyValueData("ddl", out.toString());
	}

	@RequestMapping(value = "/connections/{connectionName}/tables/{tableName}/hive", method = RequestMethod.GET)
	public @ResponseBody KeyValueData getHiveDDL(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName, @PathVariable String tableName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		TableDescriptor tableDescriptor = dbMap.getTableDescriptor(tableName);
		return new KeyValueData("ddl", HiveDDLGenerator.hiveETLTableDDL(tableDescriptor));
	}

	@RequestMapping(value = "/connections/{connectionName}/tables/{tableName}/ddl", method = RequestMethod.GET)
	public @ResponseBody KeyValueData getDDL(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName, @PathVariable String tableName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		return new KeyValueData("ddl", new DDLGenerator(dbMap).prepareDDL(tableName));
	}

	@RequestMapping(value = "/connections/{connectionName}/loadorder", method = RequestMethod.GET)
	public @ResponseBody List<String> getLoadOrder(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		return new SchemaJoinMetaData(dbMap, dbMap).defineOrder();
	}

	@RequestMapping(value = "/connections/{connectionName}/tables/{tableName}/loadorder", method = RequestMethod.GET)
	public @ResponseBody List<String> getLoadOrder(HttpServletRequest req, HttpServletResponse res,
			@PathVariable String connectionName, @PathVariable String tableName) throws Exception {
		DBMap dbMap = DBMapCache.getDBMap(connectionName);
		return new SchemaJoinMetaData(dbMap, dbMap).defineOrder(tableName);
	}

}
