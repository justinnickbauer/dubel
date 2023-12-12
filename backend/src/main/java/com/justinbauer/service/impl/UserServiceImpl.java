package com.justinbauer.service.impl;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.justinbauer.model.User;
import com.justinbauer.repository.UserRepository;
import com.justinbauer.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	protected final Log LOGGER = LogFactory.getLog(getClass());

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	public User update(User user, String username) throws UsernameNotFoundException{
		User u = (User) userDetailsService.loadUserByUsername(username);
		u.setFirstName(user.getFirstName());
		u.setLastName(user.getLastName());
		return userRepository.save(u);
	}
	@Override
	public User findByUsername(String username) throws UsernameNotFoundException {
		User u = userRepository.findByUsername(username);
		return u;
	}

	public User findById(Long id) throws AccessDeniedException {
		User u = userRepository.findById(id).orElse(null);
		return u;
	}

	public List<User> findAll() throws AccessDeniedException {
		List<User> result = userRepository.findAll();
		return result;
	}

	public void changePassword(String oldPassword, String newPassword) {

		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String username = currentUser.getName();

		LOGGER.debug("Changing password for user '" + username + "'");

		User user = (User) userDetailsService.loadUserByUsername(username);

		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);

		if (user.isInitialPassword()) {
			user.setInitialPassword(false);
		}
	}
}
