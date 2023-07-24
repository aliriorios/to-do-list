package com.myproject.todolist.model.service;

import com.myproject.todolist.model.dto.TaskDto;
import com.myproject.todolist.model.dto.TaskMinDto;
import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<TaskMinDto> listAllTasks() {
        List<Task> result = taskRepository.findAll();
        return result.stream().map(TaskMinDto::new).toList();
    }

    @Transactional(readOnly = true)
    public TaskDto showTask (Long id){
        Optional<Task> result = taskRepository.findById(id);
        return new TaskDto(result.get());
    }
}
