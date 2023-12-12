package com.justinbauer.service.impl;

import com.justinbauer.model.Training;
import com.justinbauer.model.User;
import com.justinbauer.repository.TrainingRepository;
import com.justinbauer.repository.UserRepository;
import com.justinbauer.service.RunnerService;
import com.justinbauer.service.TrainingService;
import com.justinbauer.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainingServiceImpl implements TrainingService {

	protected final Log LOGGER = LogFactory.getLog(getClass());

	@Autowired
	private TrainingRepository trainingRepository;

	@Autowired
	private UserService userService;

	@Override
	public Training create(Training training, String userName) throws UsernameNotFoundException{
		User u = (User) userService.findByUsername(userName);
		training.setUser(u);
		return trainingRepository.save(training);
	}

	@Override
	public Training update(Training training, Long trainingId) throws UsernameNotFoundException {
		Optional<Training> t = trainingRepository.findById(trainingId);
		t.get().setRunner(training.getRunner());
		t.get().setDate(training.getDate());
		t.get().setCompetition(training.getCompetition());
		return trainingRepository.save(t.get());
	}

	@Override
	public List<Training> findAll(String userName) throws AccessDeniedException, UsernameNotFoundException {
		User u = (User) userService.findByUsername(userName);
		return  trainingRepository.findAllByUser(u);
	}
}
