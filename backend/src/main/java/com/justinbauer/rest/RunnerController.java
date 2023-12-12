package com.justinbauer.rest;

import com.justinbauer.model.Runner;
import com.justinbauer.model.User;
import com.justinbauer.service.RunnerService;
import com.justinbauer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;

@CrossOrigin
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class RunnerController {

    @Autowired
    private RunnerService runnerService;

    @RequestMapping( method = GET, value= "/runner/all")
    @PreAuthorize("hasRole('USER')")
    public List<Runner> loadAll() {
        return this.runnerService.findAll();
    }
}
