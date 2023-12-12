package com.justinbauer.service.impl;

import com.justinbauer.model.Runner;
import com.justinbauer.model.User;
import com.justinbauer.repository.RunnerRepository;
import com.justinbauer.repository.UserRepository;
import com.justinbauer.service.RunnerService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RunnerServiceImpl implements RunnerService {

	protected final Log LOGGER = LogFactory.getLog(getClass());

	@Autowired
	private RunnerRepository runnerRepository;

	public List<Runner> findAll() {
		return runnerRepository.findAll();
	}

}

