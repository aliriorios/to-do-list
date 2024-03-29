package com.myproject.todolist.model.entity;

import com.myproject.todolist.model.entity.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class Task implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate delivery;

    //enum
    private Integer taskStatus;

    //constructor
    public Task(Long id, String title, String description, LocalDate delivery, TaskStatus taskStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.delivery = delivery;
        setTaskStatus(taskStatus);
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
}
