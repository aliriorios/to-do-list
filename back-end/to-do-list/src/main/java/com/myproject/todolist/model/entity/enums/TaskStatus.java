package com.myproject.todolist.model.entity.enums;

public enum TaskStatus {
    DEFAULT(1),
    STARTED(2),
    CONCLUDED(3),
    UNDELIVERED(4);

    private int code;

    private TaskStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    // convert a code to TaskStatus
    public static TaskStatus valueOf(int code) {
        for (TaskStatus value : TaskStatus.values()) {
            if (value.getCode() == code) {
                return value;
            }
        }

        throw new IllegalArgumentException ("Invalid TaskStatus code: " + code);
    }
}
