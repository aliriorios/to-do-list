// SELEÇÃO DE ELEMENTOS -----------------------
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
const editInput = document.getElementById("edit-input");
const editDetails = document.getElementById("edit-details");
const editDate = document.getElementById("edit-input-time-final");

const toDoList = document.getElementById("to-do-list");

// VARIÁVEL DE UTILIDADE
/* Contadora de tarefas */
var countTask = 0;

// FUNÇÕES ------------------------------------
/* Exibindo a data de hoje */
setInterval(() => {
  const currentDate = document.getElementById("current-date");

  let date = new Date();

  currentDate.innerHTML = '<i class="fa-solid fa-calendar-days"></i>' + dateFormatter(date);
}, 1000);

function dateFormatter(date) {
  let monName = new Array("Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez");

  let formatter = date.getDate() + " " + monName[date.getMonth()] + " " + date.getFullYear();

  return formatter;
}

function dateValidation (date) {

}

/* Modal de Adicionar tarefa */
newButton.onclick = () => {
  addModal.showModal();
}

closeButtonAdd.onclick = () => {
  addModal.close();
}

function openShowModal(taskElement) {
  showTaskModal.showModal();
}

closeButtonShow.onclick = () => {
  showTaskModal.close();
}

/* Modal Editar tarefas */
function openEditModal(btnEdit) {
  editModal.showModal();
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

  const toDoDate = document.createElement("span");
  toDoDate.innerText = date;
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

  toDoModalinputName.value = "";
  toDoModalinputDetail.value = "";
  toDoModalinputDate.value = "";
}

const showAllTask = () => {
  
}

const saveFromEdit = () => {

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

  const inputDate = new Date(toDoModalinputDate.value);

  if (inputName && inputDate) {
    saveToDo(inputName, inputDetail, dateFormatter(inputDate));

    countTask++;
    countTaskFunc(countTask);
  }
})

// UTILIDADE ------------------------------------
/* Mapeando os buttons das tarefas */
document.addEventListener("click", (event => {
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
      console.log(btnIconPause);

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
    icon.classList.add("fa-circle-check");

    // parentElement.style.backgroundColor = "#8a8a8a";

    btnDisable(btnConclude);
    btnDisable(btnStart);
    btnDisable(btnEdit);

    console.log(btnConclude);
  }

  /* Abrir o modal que exibe toda a tarefa */
  if (targetElement.classList.contains("to-do-element-list")) {
    let taskElement = parentElement.getElementsByClassName("to-do-task-element")[0];

    openShowModal(taskElement);
  }

  /* Abrir modal de editar */
  if (targetElement.classList.contains("edit")) {
    let btnEdit = parentElement.getElementsByClassName("edit")[0];

    openEditModal(btnEdit);
  }

  /* Deletando a tarefa */
  if (targetElement.classList.contains("trash") || targetElement.classList.contains("fa-trash")) {
    parentElement.remove();

    countTask--;
    countTaskFunc(countTask);
  }
}))