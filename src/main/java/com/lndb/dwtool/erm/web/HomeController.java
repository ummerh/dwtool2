package com.lndb.dwtool.erm.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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

}
