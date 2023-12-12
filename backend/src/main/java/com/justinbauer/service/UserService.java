package com.justinbauer.service;

import java.util.List;

import com.justinbauer.model.User;

public interface UserService {
	User update(User user, String username);
	User findById(Long id);

	User findByUsername(String username);

	List<User> findAll();

	void changePassword(String oldPassword, String newPassword);
}
