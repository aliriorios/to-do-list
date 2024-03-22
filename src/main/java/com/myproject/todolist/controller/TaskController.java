package com.myproject.todolist.controller;

import com.myproject.todolist.model.dto.TaskDto;
import com.myproject.todolist.model.dto.TaskMinDto;
import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskMinDto>> listAll() {
        return ResponseEntity.ok().body(taskService.listAll());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<TaskDto> getById (@PathVariable Long id) {
        return ResponseEntity.ok().body(taskService.getById(id));
    }

    @GetMapping("/getStatusCode/{id}")
    public ResponseEntity<Integer> getTaskStatusCode (@PathVariable Long id) {
        return ResponseEntity.ok().body(taskService.getTaskStatusCode(id));
    }

    @GetMapping("/getDelivery/{id}")
    public ResponseEntity<LocalDate> getDeliveryDate (@PathVariable Long id) {
        return ResponseEntity.ok().body(taskService.getDeliveryDate(id));
    }

    @PostMapping
    public ResponseEntity<Task> save (@RequestBody Task task) {
        return new ResponseEntity<>(taskService.save(task), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete (@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update (@PathVariable Long id, @RequestBody Task task) {
        task = taskService.update(id, task);
        return ResponseEntity.ok().body(task);
    }
}
