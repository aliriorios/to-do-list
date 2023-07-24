package com.myproject.todolist.model.dto;

import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.entity.enums.TaskStatus;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class TaskMinDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @EqualsAndHashCode.Include
    private Long id;
    private String title;
    private LocalDate delivery;
    private Integer taskStatus;

    //constructor
    public TaskMinDto (Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.delivery = task.getDelivery();
        setTaskStatus(task.getTaskStatus());
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
