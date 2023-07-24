package com.myproject.todolist.controller;

import com.myproject.todolist.model.dto.TaskDto;
import com.myproject.todolist.model.dto.TaskMinDto;
import com.myproject.todolist.model.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskMinDto>> listAllTasks() {
        return ResponseEntity.ok().body(taskService.listAllTasks());
    }

    @GetMapping("/showTask/{id}")
    public ResponseEntity<TaskDto> showTask(@PathVariable Long id) {
        return ResponseEntity.ok().body(taskService.showTask(id));
    }
}
