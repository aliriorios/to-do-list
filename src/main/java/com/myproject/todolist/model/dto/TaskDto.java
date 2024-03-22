package com.myproject.todolist.model.dto;

import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.entity.enums.TaskStatus;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class TaskDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String description;
    private LocalDate delivery;
    private Integer taskStatus;

    //constructor
    public TaskDto() {
    }

    public TaskDto(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.delivery = task.getDelivery();
        setTaskStatus(task.getTaskStatus());
    }

    //default getter and setter
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getDelivery() {
        return delivery;
    }

    //custom getter and setter to TaskStatus enum
    public TaskStatus getTaskStatus() {
        return TaskStatus.convertCode(taskStatus);
    }

    public void setTaskStatus (TaskStatus taskStatus) {
        if (taskStatus != null) {
            this.taskStatus = taskStatus.getCode();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskDto taskDto = (TaskDto) o;
        return Objects.equals(id, taskDto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
