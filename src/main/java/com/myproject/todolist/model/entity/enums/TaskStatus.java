package com.myproject.todolist.model.entity.enums;

public enum TaskStatus {
    DEFAULT(1),
    STARTED(2),
    CONCLUDED(3),
    TODAY(4),
    UNDELIVERED(5);

    private int code;

    //constructor
    private TaskStatus(int code) {
        this.code = code;
    }

    //getter
    public int getCode() {
        return code;
    }

    //convert a code to taskStatus
    public static TaskStatus convertCode(int code) {
        for (TaskStatus value : TaskStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }

        throw new IllegalArgumentException("Invalid TaskStatus code: " + code);
    }
}
