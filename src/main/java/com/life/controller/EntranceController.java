package com.life.controller;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.life.common.Str;
import com.life.model.LifeUserModel;
import com.life.service.LifeUserService;

@Controller
//@RequestMapping("entrance")
public class EntranceController {

	@Resource(name="lifeUserService")
	private LifeUserService lifeUserService;
	/**
	 * 模板存放目录
	 */
	private final static String FTL_DIR = "/";

	@ResponseBody
	@RequestMapping("enterCode")
	public LifeUserModel enterCode(String code, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		LifeUserModel lifeUserModel = lifeUserService.checkEnterCode(code);
		request.getSession().setAttribute("lifeUserModel", lifeUserModel);
		request.getSession().setMaxInactiveInterval(3600);
		return lifeUserModel;
	}

	@RequestMapping("/{pageName}")
	public String page(@PathVariable("pageName") String pageName, @ModelAttribute("params") LifeUserModel params,
			ModelMap model, HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String userCode = params.getUserCode();
		if(Str.isEmpty(userCode)) {
			LifeUserModel attribute = (LifeUserModel) request.getSession().getAttribute("lifeUserModel");
			userCode=attribute.getUserCode();
		}
		LifeUserModel lifeUserModel = lifeUserService.checkEnterCode(userCode);
		request.getSession().setAttribute("lifeUserModel", lifeUserModel);
		request.getSession().setMaxInactiveInterval(3600);
		if (null == lifeUserModel) {
			return "index.jsp";
		}
		model.put("code", lifeUserModel);
		return FTL_DIR + pageName + ".jsp";
	}
	
	@RequestMapping("/delUser")
	public String delUser( HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.getSession().removeAttribute("lifeUserModel");
		return "index.jsp";
	}
	@ResponseBody
	@RequestMapping("/getAll")
	public List<LifeUserModel> getAll( HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		List<LifeUserModel> all = lifeUserService.getAll();
		return all;
	}
}
