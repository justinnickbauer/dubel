package com.justinbauer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "TRAININGS")
public class Training {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;

	@ManyToOne
	@JoinColumn(name="runner_id", nullable=false)
	private Runner runner;

	@Column(name = "date")
	private Date date;

	@Column(name = "isCompetition")
	private Boolean isCompetition;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Runner getRunner() {
		return runner;
	}

	public void setRunner(Runner runner) {
		this.runner = runner;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Boolean getCompetition() {
		return isCompetition;
	}

	public void setCompetition(Boolean competition) {
		isCompetition = competition;
	}
}
