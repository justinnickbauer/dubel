package com.justinbauer.repository;

import com.justinbauer.model.Training;
import com.justinbauer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Long> {
    List<Training> findAllByUser(User user );
}

