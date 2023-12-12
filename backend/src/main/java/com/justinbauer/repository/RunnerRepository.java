package com.justinbauer.repository;

import com.justinbauer.model.Runner;
import com.justinbauer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RunnerRepository extends JpaRepository<Runner, Long> {

}

