package com.justinbauer.service;

import com.justinbauer.model.Training;
import com.justinbauer.model.User;

import java.util.List;

public interface TrainingService {
	Training create(Training training, String userName);

	Training update(Training training, Long trainingId);

	List<Training> findAll(String userName);
}
