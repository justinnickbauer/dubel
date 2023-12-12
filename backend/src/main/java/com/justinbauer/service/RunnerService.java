package com.justinbauer.service;

import com.justinbauer.model.Runner;
import com.justinbauer.model.User;
import com.justinbauer.repository.RunnerRepository;

import java.util.List;

public interface RunnerService {
	List<Runner> findAll();
}
