package com.myproject.todolist.model.entity;

import com.myproject.todolist.model.entity.enums.TaskStatus;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate delivery;

    //enum
    private Integer taskStatus;

    //constructor
    public Task() {
    }

    public Task(Long id, String title, String description, LocalDate delivery, TaskStatus taskStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.delivery = delivery;
        setTaskStatus(taskStatus);
    }

    //default getter and setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDelivery() {
        return delivery;
    }

    public void setDelivery(LocalDate delivery) {
        this.delivery = delivery;
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
        Task task = (Task) o;
        return Objects.equals(id, task.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
