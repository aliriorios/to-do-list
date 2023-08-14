package com.myproject.todolist.model.service;

import com.myproject.todolist.model.dto.TaskDto;
import com.myproject.todolist.model.dto.TaskMinDto;
import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.entity.enums.TaskStatus;
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
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    
    public List<TaskMinDto> listAll() {
        updateTaskStatusByDate();
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

        } finally {
            updateTaskStatusByDate();
        }
    }

    /* PRIVATE -------------------------------------------------------------------------- */
    private void updateTaskStatusByDate () {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.parse(LocalDate.now().format(formatter));

        List<Task> result = taskRepository.findAll();

        for (Task value : result) {
            LocalDate delivery = LocalDate.parse(value.getDelivery().format(formatter));

            if (delivery.equals(today)) { //delivery == today
                value.setTaskStatus(TaskStatus.TODAY);
                taskRepository.save(value);

            } else if (delivery.isBefore(today)) { //delivery < today
                value.setTaskStatus(TaskStatus.UNDELIVERED);
                taskRepository.save(value);
            }
        }
    }

    private void updateData (Task entity, Task task) {
        entity.setTitle(task.getTitle());
        entity.setDescription(task.getDescription());
        entity.setDelivery(task.getDelivery());
        entity.setTaskStatus(task.getTaskStatus());
    }
}
