package com.myproject.todolist.profile;

import com.myproject.todolist.model.entity.Task;
import com.myproject.todolist.model.entity.User;
import com.myproject.todolist.model.entity.enums.TaskStatus;
import com.myproject.todolist.model.repository.TaskRepository;
import com.myproject.todolist.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Configuration
@Profile("test") // H2 DATABASE
public class TestProfile implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // User seeding
        User user1 = new User(null, "Alírio Rios", "aliriorios@gmail.com", "alirio123", LocalDate.parse("1999-05-18", formatter));
        User user2 = new User(null, "Marcos Green", "marcos@gmail.com", "marcos123", LocalDate.parse("2000-01-01", formatter));
        User user3 = new User(null, "João Brown", "joao@gmail.com", "joao123", LocalDate.parse("2006-09-20", formatter));
        User user4 = new User(null, "Pedro K", "pedro@gmail.com", "pedro123", LocalDate.parse("1998-08-08", formatter));
        User user5 = new User(null, "Matheus Ramos", "matheus@gmail.com", "matheus123", LocalDate.parse("2005-11-25", formatter));
        User user6 = new User(null, "Maria Carla", "maria@gmail.com", "maria123", LocalDate.parse("1996-07-07", formatter));
        User user7 = new User(null, "Marta Teixeira", "marta@gmail.com", "marta123", LocalDate.parse("1992-04-02", formatter));
        User user8 = new User(null, "Juliana Rosa", "juliana@gmail.com", "juliana123", LocalDate.parse("2004-12-20", formatter));
        User user9 = new User(null, "Judite T", "judite@gmail.com", "judite123", LocalDate.parse("2001-09-11", formatter));
        User user10 = new User(null, "Ana Clara", "ana@gmail.com", "ana123", LocalDate.parse("2000-02-08", formatter));
        userRepository.saveAll(Arrays.asList(user1, user2, user3, user4, user5, user6, user7, user8, user9, user10));

        // Task seeding
        Task task0 = new Task(null, "Estudar JS", "Estudar mais sobre Objetos e arvore DOM", LocalDate.parse("2023-12-08", formatter), TaskStatus.DEFAULT, user4);
        Task task1 = new Task(null, "Projeto da Faculdade", "Fazer a arquitetura do SAVA!", LocalDate.parse("2023-09-22", formatter), TaskStatus.DEFAULT, user5);
        Task task2 = new Task(null, "Fazer compras", "", LocalDate.parse("2023-08-13", formatter), TaskStatus.DEFAULT, user1);
        Task task3 = new Task(null, "Revisar para a prova", "", LocalDate.parse("2023-09-12", formatter), TaskStatus.DEFAULT, user2);
        Task task4 = new Task(null, "Viagem", "Organizar malas para a viagem do fim de semana", LocalDate.parse("2023-10-20", formatter), TaskStatus.DEFAULT, user2);
        Task task5 = new Task(null, "Fazer o mercado", "", LocalDate.parse("2023-07-28", formatter), TaskStatus.DEFAULT, user3);
        Task task6 = new Task(null, "Ir ao dentista", "", LocalDate.parse("2023-10-19", formatter), TaskStatus.DEFAULT, user1);
        Task task7 = new Task(null, "Estudar Spring", "", LocalDate.parse("2023-10-08", formatter), TaskStatus.DEFAULT, user9);
        Task task8 = new Task(null, "Academia", "", LocalDate.parse("2023-08-18", formatter), TaskStatus.DEFAULT, user1);
        Task task9 = new Task(null, "Manutenção", "Levar pc para revisão", LocalDate.parse("2023-09-08", formatter), TaskStatus.DEFAULT, user3);
        taskRepository.saveAll(Arrays.asList(task0, task1, task2, task3, task4, task5, task6, task7, task8, task9));
    }
}
