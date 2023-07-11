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

const showTaskModal = document.getElementById("show-task-modal");
const closeButtonShow = document.getElementById("btn-cross-show-modal");

const editModal = document.getElementById("edit-modal-add");
const closeButtonEdit = document.getElementById("btn-cross-edit-modal");
const editForm = document.getElementById("edit-form-todo");
let editName = document.getElementById("edit-input");
let editDetails = document.getElementById("edit-details");
let editDate = document.getElementById("edit-input-time-final");

const toDoList = document.getElementById("to-do-list");

let taskElementName;
let taskElementDetails;
let taskElementDate;
let taskElementAuxDate;

// VARIÁVEL DE UTILIDADE
/* Contadora de tarefas */
var countTask = 0;

// FUNÇÕES ------------------------------------
setInterval(() => {
  showHeaderDate();
  minInputDateValidation();
  checkDateLimitTask();
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
  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  let formatter = day + " " + monName[date.getMonth()] + " " + date.getFullYear();

  return formatter;
}

function dateFormatterToEdit(date) {
  let objDate = new Date(date);

  let day = objDate.getDate() < 10 ? '0' + objDate.getDate() : objDate.getDate();
  let month = (objDate.getMonth() + 1) < 10 ? '0' + (objDate.getMonth() + 1) : (objDate.getMonth() + 1);
  let year = objDate.getFullYear();

  return year + '-' + month + '-' + day;
}

function checkDateLimitTask() {
  const allToDo = document.querySelectorAll(".to-do-element-list");

  allToDo.forEach((value) => {
    let today = new Date();
    today = dateFormatterToEdit(today);

    let toDoAuxDate = new Date(value.getElementsByClassName("aux-date")[0].innerHTML);
    toDoAuxDate = dateFormatterToEdit(toDoAuxDate);

    let iconProgress = value.getElementsByClassName("progress")[0];

    if (today === toDoAuxDate) { // Para hoje
      if (iconProgress.classList.contains("fa-spinner")) {
        iconProgress.classList.remove("fa-spinner");
        iconProgress.classList.add("fa-circle-exclamation");
      }

    } else if (today > toDoAuxDate) { // Atrasado
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
}

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

// Essa função vai criar elementos HTML para parecer que está salvando
const saveToDo = (name, detail, date) => {
  /* Criando o card */
  const toDoCard = document.createElement("div");
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

  const toDoTitle = document.createElement("p");
  toDoTitle.innerText = name;
  toDoTitle.className = "to-do-title";

  toDoHead.appendChild(iconGrip);
  toDoHead.appendChild(iconProgress);
  toDoHead.appendChild(toDoTitle);
  toDoCard.appendChild(toDoHead);

  /* Criando o details */
  const toDoDetail = document.createElement("div");
  toDoDetail.innerText = detail;
  toDoDetail.classList.add("txt-details");
  toDoCard.appendChild(toDoDetail);

  /* Criando o container dos buttons */
  const toDoButtonContainer = document.createElement("div");
  toDoButtonContainer.setAttribute("id", "to-do-element-btn-container");

  /* Auxiliar para guardar o valor do date antes de converter */
  const auxDate = document.createElement("span");
  auxDate.innerText = date;
  auxDate.classList.add("aux-date");

  const toDoDate = document.createElement("span");
  toDoDate.innerText = dateFormatter(date);
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
  toDoButtonContainer.appendChild(auxDate);
  toDoCard.appendChild(toDoButtonContainer);

  /* Adicionando toda a criação no HTML */
  toDoList.appendChild(toDoCard);

  toDoModalinputName.value = "";
  toDoModalinputDetail.value = "";
  toDoModalinputDate.value = "";
}

/* Atualizando os dados da edição */
const updateToDo = (name, details, date) =>{
  const allToDo = document.querySelectorAll(".to-do-element-list");

  allToDo.forEach((value) => {
    /* Vou utilizar o nome como IDENTIFICADOR */
    let toDoNameNameInput = value.querySelector(".to-do-title");
    let toDoDetailInput = value.querySelector(".txt-details");
    let toDoDateInput = value.querySelector(".to-date");
    let toDoAuxDate = value.querySelector(".aux-date");

    if (toDoNameNameInput.innerText === taskElementName) {
      toDoNameNameInput.innerText = name;
      toDoDetailInput.innerText = details;
      toDoDateInput.innerText = dateFormatter(date);
      toDoAuxDate.innerText = date;
    }
  });
}

function countTaskFunc(countTask) {
  const withouTask = document.getElementById("without-task");

  if (countTask > 0) {
    withouTask.style.display = "none";

  } else {
    withouTask.style.display = "block";
  }
}

// EVENTOS ------------------------------------
/* Pegandos os dados da tarefa para criar o elemento HTML*/
toDoModalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputName = toDoModalinputName.value;
  const inputDetail = toDoModalinputDetail.value;

  /*
  A informação do input date está chegando com 1 dia a menos!
  Não Sei se é um problema comum do input!
  */
  const inputDate = new Date(toDoModalinputDate.value);
  inputDate.setDate(inputDate.getDate() + 1); // Resolução do Day -1

  if (inputName && inputDate) {
    saveToDo(inputName, inputDetail, inputDate);

    countTask++;
    countTaskFunc(countTask);
    addModal.close();
  }
})

// UTILIDADE ------------------------------------
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

    // parentElement.style.backgroundColor = "#8a8a8a";

    btnDisable(btnConclude);
    btnDisable(btnStart);
    btnDisable(btnEdit);
  }

  /* Abrir o modal que exibe toda a tarefa */
  if (targetElement.classList.contains("to-do-element-list")) {
    taskElementName = parentElement.getElementsByClassName("to-do-title")[0].innerHTML;
    taskElementDetails = parentElement.getElementsByClassName("txt-details")[0].innerHTML;
    taskElementDate = parentElement.getElementsByClassName("to-date")[0].innerHTML;

    // Exibindo!
    document.getElementById("show-name").innerText = taskElementName;
    document.getElementById("details-area").innerText = taskElementDetails;
    document.getElementById("show-date").innerText = 'Para: ' + taskElementDate;
    showTaskModal.showModal(); // Abrindo o modal
  }

  /* Abrir modal de editar */
  if (targetElement.classList.contains("edit")) {
    taskElementName = parentElement.getElementsByClassName("to-do-title")[0].innerHTML;
    taskElementDetails = parentElement.getElementsByClassName("txt-details")[0].innerHTML;
    taskElementDate = parentElement.getElementsByClassName("to-date")[0].innerHTML;
    taskElementAuxDate = parentElement.getElementsByClassName("aux-date")[0].innerHTML;

    // Exibindo
    editName.value = taskElementName;
    editDetails.value = taskElementDetails;
    editDate.value = dateFormatterToEdit(taskElementAuxDate);

    editModal.showModal();
  }

  /* Deletando a tarefa */
  if (targetElement.classList.contains("trash") || targetElement.classList.contains("fa-trash")) {
    parentElement.remove();

    countTask--;
    countTaskFunc(countTask);
  }
});

editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newInputName = editName.value;
  const newInputDetails = editDetails.value;
  const newInputDate = new Date(editDate.value);
  newInputDate.setDate(newInputDate.getDate() + 1);

  if (newInputName && newInputDate) {
    // Atualizar
    updateToDo(newInputName, newInputDetails, newInputDate);
    editModal.close();
  }
});

// Botão de thema
themeButton.addEventListener("mouseover", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#theme-icon")) {
    const icon = document.getElementById("theme-icon");
    icon.classList.add("fa-beat");
    icon.style.color = "#fac400";
  }
});

themeButton.addEventListener("mouseleave", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#theme-icon")) {
    const icon = document.getElementById("theme-icon");
    icon.classList.remove("fa-beat");
    icon.style.color = "#000000";
  }
});

// Botão de nova tarefa
newButton.addEventListener("mouseover", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#plus-icon")) {
    const icon = document.getElementById("plus-icon");
    icon.classList.add("fa-beat");
    icon.style.color = "var(--complete-green-color)";
  }
});

newButton.addEventListener("mouseleave", (event) => {
  const targetElement = event.target;

  if (targetElement.querySelector("#plus-icon")) {
    const icon = document.getElementById("plus-icon");
    icon.classList.remove("fa-beat");
    icon.style.color = "var(--black)";
  }
});