package com.myproject.todolist.model.service;

import com.myproject.todolist.model.dto.TaskDto;
import com.myproject.todolist.model.dto.TaskMinDto;
import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.repository.TaskRepository;
import com.myproject.todolist.model.service.exception.DatabaseException;
import com.myproject.todolist.model.service.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<TaskMinDto> listAll() {
        List<Task> result = taskRepository.findAll();
        return result.stream().map(TaskMinDto::new).toList();
    }

    @Transactional(readOnly = true)
    public TaskDto getById (Long id){
        Optional<Task> result = taskRepository.findById(id);
        return new TaskDto(result.get());
    }

    @Transactional(readOnly = true)
    public Integer getTaskStatusCode (Long id) {
        Optional<Task> result = taskRepository.findById(id);
        return result.get().getTaskStatus().getCode();
    }

    @Transactional(readOnly = true)
    public LocalDate getDeliveryDate (Long id) {
        Optional<Task> result = taskRepository.findById(id);
        return result.get().getDelivery();
    }

    public Task save (Task task) {
        return taskRepository.save(task);
    }

    public void delete (Long id) {
        try {
            taskRepository.deleteById(id);

        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);

        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException(e.getMessage());
        }
    }

    public Task update (Long id, Task task) {
        try {
            Optional<Task> entity = taskRepository.findById(id); //get the reference of id entity
            updateData(entity.get(), task); //update 'entity' with values of 'task'
            return taskRepository.save(entity.get());

        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    /* PRIVATE -------------------------------------------------------------------------- */
    private void updateData (Task entity, Task task) {
        entity.setTitle(task.getTitle());
        entity.setDescription(task.getDescription());
        entity.setDelivery(task.getDelivery());
        entity.setTaskStatus(task.getTaskStatus());
    }
}
