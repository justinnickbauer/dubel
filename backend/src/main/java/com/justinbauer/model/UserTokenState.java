package com.justinbauer.model;

public class UserTokenState {
    private String access_token;
    private User user;

    public UserTokenState() {
        this.access_token = null;
    }

    public UserTokenState(String access_token, User user) {
        this.access_token = access_token;
        this.user = user;
    }

    public UserTokenState(String access_token) {
        this.access_token = access_token;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}