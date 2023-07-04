package com.myproject.todolist.model.entity;

import com.myproject.todolist.model.entity.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class Task implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "delivery_date")
    private LocalDate delivery;

    // enum
    @Column(name = "task_status")
    private Integer taskStatus;

    // Association
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // constructors
    public Task(Long id, String title, String description, LocalDate delivery, TaskStatus taskStatus, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.delivery = delivery;
        setTaskStatus(taskStatus);
        this.user = user;
    }

    /* Teste sem associações */
    /*public Task(Long id, String title, String description, LocalDate delivery, Integer taskStatus) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.delivery = delivery;
        this.taskStatus = taskStatus;
    }*/

    // custom getter and setter
    public TaskStatus getTaskStatus() {
        return TaskStatus.valueOf(taskStatus);
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        if (taskStatus != null) {
            this.taskStatus = taskStatus.getCode();
        }
    }
}
