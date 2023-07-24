package com.myproject.todolist.model.dto;

import com.myproject.todolist.model.entity.Task;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class TaskDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @EqualsAndHashCode.Include
    private Long id;
    private String title;
    private String description;
    private LocalDate delivery;
    private Integer taskStatus;

    //constructor
    public TaskDto(Task task) {
        BeanUtils.copyProperties(task, this);
    }
}
