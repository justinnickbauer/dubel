package com.justinbauer.rest;

import com.justinbauer.model.Training;
import com.justinbauer.model.User;
import com.justinbauer.service.TrainingService;
import com.justinbauer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @RequestMapping( method = POST, value = "/training/create" )
    @PreAuthorize("hasRole('USER')")
    public Training create(Principal token, @RequestBody Training training) {
        return this.trainingService.create( training, token.getName() );
    }

    @RequestMapping( method = PATCH, value = "/training/update" )
    @PreAuthorize("hasRole('USER')")
    public Training update(@RequestBody Training training) {
        return this.trainingService.update( training, training.getId());
    }   

    @RequestMapping( method = GET, value= "/training/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Training> loadAll(Principal token) {
        return this.trainingService.findAll(token.getName());
    }
}
