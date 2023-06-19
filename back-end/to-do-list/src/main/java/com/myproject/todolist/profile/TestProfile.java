package com.myproject.todolist.profile;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test") // H2 DATABASE
public class TestProfile implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

    }
}
