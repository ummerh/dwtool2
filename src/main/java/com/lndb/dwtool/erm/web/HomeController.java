package com.lndb.dwtool.erm.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lndb.dwtool.erm.db.ConnectionDetail;
import com.lndb.dwtool.erm.util.ConnectionRepository;

@Controller
public class HomeController {

	@RequestMapping("/")
	public ModelAndView index(HttpServletRequest req) {
		ModelAndView mv = new ModelAndView("home");
		return mv;
	}

	@RequestMapping("/home")
	public ModelAndView home(HttpServletRequest req) {
		return index(req);
	}

	@RequestMapping("/uilogin")
	public ModelAndView login(HttpServletRequest req, HttpServletResponse res) throws Exception {
		return new ModelAndView("login");
	}

	@RequestMapping("/logoutPage")
	public ModelAndView logout(HttpServletRequest req, HttpServletResponse res) throws Exception {
		return null;
	}

	@RequestMapping(value = "/newConnection", method = RequestMethod.POST)
	public @ResponseBody ConnectionSpec newConnection(HttpServletRequest req, HttpServletResponse res,
			@RequestBody ConnectionSpec spec) throws Exception {
		ConnectionRepository.saveConnection(spec);
		ConnectionDetail conDetail = ConnectionDetail.configure(spec.getConnectionName());
		spec.setValid(ConnectionRepository.isValid(conDetail));
		return spec;
	}

	@RequestMapping(value = "/connections", method = RequestMethod.GET)
	public @ResponseBody List<ConnectionDetail> connections(HttpServletRequest req, HttpServletResponse res)
			throws Exception {
		return ConnectionRepository.getAllConnections();
	}
}
