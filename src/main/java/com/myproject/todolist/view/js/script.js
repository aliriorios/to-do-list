// SELEÇÃO DE ELEMENTOS -----------------------
const themeButton = document.getElementById("btn-turn-theme");
const newButton = document.getElementById("btn-new");
const addModal = document.getElementById("new-modal-add");
const closeButtonAdd = document.getElementById("btn-cross-add-modal");

const toDoModalForm = document.getElementById("add-form-todo");
const toDoModalinputName = document.getElementById("add-input");
const toDoModalinputDetail = document.getElementById("add-details");
const toDoModalinputDate = document.getElementById("add-input-time-final");
const toDoModalinputSubmit = document.getElementById("btn-form-submit");

const showTaskModal = document.getElementById("show-modal-task");
const closeButtonShow = document.getElementById("btn-cross-show-modal");

const editModal = document.getElementById("edit-modal-add");
const closeButtonEdit = document.getElementById("btn-cross-edit-modal");
const editForm = document.getElementById("edit-form-todo");
let editTitle = document.getElementById("edit-input");
let editDescription = document.getElementById("edit-details");
let editDelivery = document.getElementById("edit-input-time-final");
let editTaskStatus; // auxiliar para o status de cada tarefa na edição

const toDoList = document.getElementById("to-do-list");

// VARIÁVEis DE UTILIDADE
/* Contadora de tarefas */
var id;
var countTask = 0;

// EVENTOS ------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadThemePreference();
  getAllTask();
  countTaskFunc(countTask);
});

/* Pegandos os dados e salvando pela API */
toDoModalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputDate = new Date(toDoModalinputDate.value);
  inputDate.setDate(inputDate.getDate() + 1); // valor do dia está vindo -1

  const task = {
    title : toDoModalinputName.value,
    description : toDoModalinputDetail.value,
    delivery : inputDate,
  }

  if (task.title && task.delivery) {
    saveTask(task)
      .then(data => {
        createToDoCard(data);
      })
    
    /* countTask++;
    countTaskFunc(countTask); */
    
    clearInput();
    addModal.close();
  }
})

/* Mapeando os buttons das tarefas */
document.addEventListener("click", (event) => {
  const targetElement = event.target;
  let parentElement = targetElement.closest(".to-do-element-list");

  /* Iniciando a tarefa */
  if (targetElement.classList.contains("start")) {
    let icon = parentElement.getElementsByClassName("progress")[0];
    let btnStart = parentElement.getElementsByClassName("start")[0];
    let btnIconPlay = parentElement.getElementsByClassName("fa-play")[0];
    let btnIconPause = parentElement.getElementsByClassName("fa-pause")[0];

    icon.classList.toggle("fa-spinner-progress");
    btnStart.classList.toggle("inProgress");

    if (btnIconPlay) { // Se iniciar a tarefa
      btnStart.innerHTML = '<i class="fa-solid fa-pause"></i>Pausar';

      btnIconPause = parentElement.getElementsByClassName("fa-pause")[0];

    } else if (btnIconPause) { // Se pausar a tarefa
      btnStart.innerHTML = '<i class="fa-solid fa-play"></i>Iniciar';

      btnIconPlay = parentElement.getElementsByClassName("fa-play")[0];
    }
  }

  /* Concluindo a tarefa */
  if (targetElement.classList.contains("conclude")) {
    let icon = parentElement.getElementsByClassName("progress")[0];
    let btnConclude = parentElement.getElementsByClassName("conclude")[0];
    let btnStart = parentElement.getElementsByClassName("start")[0];
    let btnEdit = parentElement.getElementsByClassName("edit")[0];

    icon.classList.remove("fa-spinner");
    icon.classList.remove("fa-spinner-progress");
    icon.classList.remove("fa-circle-exclamation")
    icon.classList.remove("fa-circle-xmark");
    icon.classList.add("fa-circle-check");

    btnDisable(btnConclude);
    btnDisable(btnStart);
    btnDisable(btnEdit);
  }

  /* Abrir o modal que exibe toda a tarefa */
  if (targetElement.classList.contains("to-do-element-list")) {
    id = parseInt(parentElement.id);

    getTaskById(id)
      .then(data => {
        document.getElementById("show-title").innerText = data.title;
        document.getElementById("details-area").innerText = data.description;
        document.getElementById("show-delivery").innerText = dateFormatter(data.delivery);
      })
    
    showTaskModal.showModal(); // Abrindo o modal
  }

  /* Abrir modal de editar */
  if (targetElement.classList.contains("edit")) {
    id = parseInt(parentElement.id);
    
    getTaskById(id)
    .then(data => {
      editTitle.value = data.title;
      editDescription.value = data.description; 
      editDelivery.value = data.delivery;
    })
    
    editTaskStatus = parentElement.getElementsByClassName("task-status")[0].innerText;

    editModal.showModal();
  }

  /* Deletando a tarefa */
  if (targetElement.classList.contains("trash") || targetElement.classList.contains("fa-trash")) {
    let id = parseInt(parentElement.id);

    deleteTask(id);
    parentElement.remove();

    countTask--;
    countTaskFunc(countTask);
  }
});

/* Modal de edição */
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputDate = new Date(editDelivery.value);
  inputDate.setDate(inputDate.getDate() + 1);

  const task = {
    id : id,
    title : editTitle.value,
    description : editDescription.value,
    delivery : inputDate,
    taskStatus : editTaskStatus
  }
  
  if (task.title && task.delivery) {
    updateTask(task); // Atualizar
    
    window.location.reload();
    editModal.close();
  }
});

// Botão de thema
themeButton.addEventListener("mouseover", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#theme-icon")) {
    const icon = document.getElementById("theme-icon");
    icon.classList.add("fa-beat");
  }
});

themeButton.addEventListener("mouseleave", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#theme-icon")) {
    const icon = document.getElementById("theme-icon");
    icon.classList.remove("fa-beat");
  }
});

themeButton.addEventListener("click", () => {
  toggleDarkMode();

  // Save or Remove dark theme preference in LocalStorage
  localStorage.removeItem("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark", 1);
  }
});

// Botão de nova tarefa
newButton.addEventListener("mouseover", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#plus-icon")) {
    const icon = document.getElementById("plus-icon");
    icon.classList.add("fa-beat");
  }
});

newButton.addEventListener("mouseleave", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#plus-icon")) {
    const icon = document.getElementById("plus-icon");
    icon.classList.remove("fa-beat");
  }
});

// FUNÇÕES ------------------------------------
setInterval(() => {
  showHeaderDate();
  minInputDateValidation();
  // checkDateLimitTask();
}, 1000);

/* Exibindo a data de hoje */
function showHeaderDate () {
  const currentDate = document.getElementById("current-date");
  
  let date = new Date();
  
  currentDate.innerHTML = '<i class="fa-regular fa-calendar-days"></i>' + dateFormatter(date);
}

/* Estabelecendo a data mínima para o input date */
function minInputDateValidation () {
  let currentDate = new Date();

  let day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
  let month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
  let year = currentDate.getFullYear();

  currentDate = year + '-' + month + '-' + day;
  document.getElementById("add-input-time-final").setAttribute("min", currentDate);
  document.getElementById("edit-input-time-final").setAttribute("min", currentDate);
}

function dateFormatter(date) {
  let monName = new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez");
  let dateObj = new Date(date);
  let day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();

  let formatter = day + " " + monName[dateObj.getMonth()] + " " + dateObj.getFullYear();

  return formatter;
}

function dateFormatterToEdit(date) {
  let objDate = new Date(date);

  let day = objDate.getDate() < 10 ? '0' + objDate.getDate() : objDate.getDate();
  let month = (objDate.getMonth() + 1) < 10 ? '0' + (objDate.getMonth() + 1) : (objDate.getMonth() + 1);
  let year = objDate.getFullYear();

  return year + '-' + month + '-' + day;
}

/* function checkDateLimitTask() {
  const allToDo = document.querySelectorAll(".to-do-element-list");

  allToDo.forEach((value) => {
    let today = new Date();
    today = dateFormatterToEdit(today);

    let iconProgress = value.getElementsByClassName("progress")[0];

    if (today === ) { // Para hoje
      if (iconProgress.classList.contains("fa-spinner")) {
        iconProgress.classList.remove("fa-spinner");
        iconProgress.classList.add("fa-circle-exclamation");
      }

    } else if (today > ) { // Atrasado
      if (iconProgress.classList.contains("fa-spinner")) {
        iconProgress.classList.remove("fa-spinner");
        iconProgress.classList.add("fa-circle-xmark");
      }

    } else {
      if (!iconProgress.classList.contains("fa-circle-check")) {
        iconProgress.classList.remove("fa-circle-exclamation");
        iconProgress.classList.remove("fa-circle-xmark");
        iconProgress.classList.add("fa-spinner");
      }
    }
  });
} */

/* Modal de Adicionar tarefa */
newButton.onclick = () => {
  addModal.showModal();
}

closeButtonAdd.onclick = () => {
  addModal.close();
}

closeButtonShow.onclick = () => {
  showTaskModal.close();
}

closeButtonEdit.onclick = () => {
  editModal.close();
}

/* Trocando permissão de botões */
function btnDisable(btn) {
  btn.classList.add("btn-disable");
  btn.setAttribute("disabled", "true");
}

function btnEnable(btn) {
  btn.classList.remove("btn-disable");
  btn.setAttribute("disabled", "false");
}

function clearInput() {
  toDoModalinputName.value = "";
  toDoModalinputDetail.value = "";
  toDoModalinputDate.value = "";
}

// Essa função vai criar as tarefas HTML
const createToDoCard = (task) => {
  /* Criando o card */
  const toDoCard = document.createElement("div");
  toDoCard.setAttribute("id", task.id);
  toDoCard.classList.add("to-do-element-list");

  /* Criando o head do card */
  const toDoHead = document.createElement("div");
  toDoHead.classList.add("head-element");

  const iconGrip = document.createElement("i");
  iconGrip.classList.add("fa-solid");
  iconGrip.className += " fa-grip-vertical";

  const iconProgress = document.createElement("i");

  iconProgress.classList.add("fa-solid");
  iconProgress.className += " fa-spinner";
  iconProgress.className += " progress";

  const taskStatus = document.createElement("span");
  taskStatus.innerText = task.taskStatus;
  taskStatus.classList.add("task-status");
  taskStatus.style.display = "none";

  const toDoTitle = document.createElement("p");
  toDoTitle.innerText = task.title;
  toDoTitle.className = "to-do-title";

  toDoHead.appendChild(iconGrip);
  toDoHead.appendChild(iconProgress);
  toDoHead.appendChild(taskStatus);
  toDoHead.appendChild(toDoTitle);
  toDoCard.appendChild(toDoHead);

  /* Criando o container dos buttons */
  const toDoButtonContainer = document.createElement("div");
  toDoButtonContainer.setAttribute("id", "to-do-element-btn-container");

  const toDoDate = document.createElement("span");
  toDoDate.innerText = dateFormatter(task.delivery);
  toDoDate.classList.add("to-date");

  const btnStart = document.createElement("button");
  btnStart.classList.add("btn-element-to-do");
  btnStart.className += " start";
  btnStart.innerHTML = '<i class="fa-solid fa-play"></i>Iniciar';

  const btnConclude = document.createElement("button");
  btnConclude.setAttribute("id", "btn-element-conclude");
  btnConclude.classList.add("btn-element-to-do");
  btnConclude.className += " conclude";
  btnConclude.innerHTML = '<i class="fa-solid fa-check"></i>Concluir';

  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("id", "btn-element-edit");
  btnEdit.classList.add("btn-element-to-do");
  btnEdit.className += " edit";
  btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>Editar';

  const btnTrash = document.createElement("button");
  btnTrash.setAttribute("id", "btn-element-trash");
  btnTrash.classList.add("btn-element-to-do");
  btnTrash.className += " trash";
  btnTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';

  toDoButtonContainer.appendChild(toDoDate);
  toDoButtonContainer.appendChild(btnStart);
  toDoButtonContainer.appendChild(btnConclude);
  toDoButtonContainer.appendChild(btnEdit);
  toDoButtonContainer.appendChild(btnTrash);
  toDoCard.appendChild(toDoButtonContainer);

  
  /* Adicionando toda a criação no HTML */
  toDoList.appendChild(toDoCard);

  /* Remover depois */
  countTask++;
  countTaskFunc(countTask);
}

/* Atualizando os dados da edição */
const updateToDo = (task) =>{
  
}

function countTaskFunc(countTask) {
  const withouTask = document.getElementById("without-task");

  if (countTask > 0) {
    withouTask.style.display = "none";

  } else {
    withouTask.style.display = "block";
  }
}

function toggleDarkMode () {
  document.body.classList.toggle("dark");

  const icon = document.getElementById("theme-icon");
  icon.classList.toggle("fa-moon");
}

function loadThemePreference () {
  const darkMode = localStorage.getItem("dark");

  if (darkMode) {
    toggleDarkMode ();
  }
}

// REST API CONECTION ------------------------------------
function getAllTask () {
  const apiUrl = `http://localhost:8080/tasks`;

  fetch(apiUrl,
    {
      method: 'GET',
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => {
      data.map((value) => createToDoCard(value))
    })
    .catch(function (response){console.log(response)})
}

function getTaskById (id) {
  const apiUrl = `http://localhost:8080/tasks/getById/${id}`;

  return fetch(apiUrl, 
    {
      method: 'GET',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(function (response){console.log(response)})
}

function saveTask (task) {
  const apiUrl = `http://localhost:8080/tasks`;

  return fetch(apiUrl, 
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        delivery: task.delivery,
        taskStatus: "DEFAULT"
      })
    })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      }
    })
    .catch(response => {console.log(response)})
}

function updateTask (task) {
  const apiUrl = `http://localhost:8080/tasks/${task.id}`;

  fetch(apiUrl, 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        delivery: task.delivery,
        taskStatus: task.taskStatus
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch(response => {console.log(response)})
}

function deleteTask (id) {
  const apiUrl = `http://localhost:8080/tasks/${id}`;

  fetch(apiUrl, 
    {
      method: 'DELETE',
    })
    .then(response => {
      if (response.status === 204) {
        console.log(response);
      }
    })
    .catch(response => {console.log(response)})
}