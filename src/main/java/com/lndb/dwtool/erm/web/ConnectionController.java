package com.lndb.dwtool.erm.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lndb.dwtool.erm.db.ConnectionDetail;
import com.lndb.dwtool.erm.util.ConnectionRepository;

@Controller
public class ConnectionController {
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
}
