class Tarefa {
    constructor(id, titulo, categoria) {
        this.concluida = false;
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
    }
    marcarConcluida() {
        this.concluida = true;
        let dataConclusao = new Date();
        let mesConclusao = dataConclusao.getMonth() + 1;
        let diaConclusao = dataConclusao.getDate();
        let horaConclusao = dataConclusao.getHours();
        let minConclusao = dataConclusao.getMinutes();
        let stringDataConclusao = "Concluída em: " + String(diaConclusao) + "/" + String(mesConclusao) + " " + String(horaConclusao) + ":" + String(minConclusao);
        return stringDataConclusao;
    }
    marcarNaoConcluida() {
        this.concluida = false;
    }
}
let listaTarefas = [];
let inputTarefa = document.getElementById("addTarefa");
let tarefasIniciais = [
    { id: 1, titulo: "Rever finanças", categoria: "Personal" },
    { id: 2, titulo: "Ir ao jantar de anos da Bia", categoria: "Personal" },
    { id: 3, titulo: "Estudar programação", categoria: "Studies" },
    { id: 4, titulo: "Trabalho Ética", categoria: "Work" },
    { id: 5, titulo: "Entregar exercicios mestrado", categoria: "Work" },
    { id: 6, titulo: "Compras para casa", categoria: "Personal" },
    { id: 7, titulo: "Prenda anos da mãe", categoria: "Personal" },
    { id: 8, titulo: "Adicionar funcionalidades ao projeto", categoria: "Studies" },
    { id: 9, titulo: "Juntar dashboards no mesmo ficheiro", categoria: "Studies" },
];
loadInitialTasks();
createBtnAddTask();
getBtnSortAToZ();
createSearchTask();
createBtnRemovedFinishedTasks();
function createSingleTask(task) {
    let elemLista = document.createElement("li");
    elemLista.textContent = task.titulo;
    if (task.concluida == true) {
        elemLista.classList.add("riscarTarefa");
        let dataConclusao = task.marcarConcluida();
        elemLista.textContent = task.titulo + " " + String(dataConclusao);
    }
    if (task.categoria == "Personal") {
        elemLista.classList.add("personal");
    }
    if (task.categoria == "Studies") {
        elemLista.classList.add("studies");
    }
    if (task.categoria == "Work") {
        elemLista.classList.add("work");
    }
    elemLista.appendChild(createBtnRemove(task));
    elemLista.appendChild(createBtnEdit(elemLista, task));
    elemLista.appendChild(createBtnToggleCheck(task));
    return elemLista;
}
function renderTasks(list) {
    atualizarBadge();
    let lista = document.querySelector("#taskList");
    lista.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        lista.appendChild(createSingleTask(list[i]));
    }
}
function createBtnRemove(task) {
    let btnRemover = document.createElement("button");
    btnRemover.textContent = "Remove";
    btnRemover.addEventListener("click", () => removeTask(task.id));
    return btnRemover;
}
function removeTask(identificador) {
    let listaSemTarefa = listaTarefas.filter(elemento => elemento.id != identificador);
    listaTarefas = listaSemTarefa;
    renderTasks(listaTarefas);
}
function createBtnToggleCheck(task) {
    let btnCompleto = document.createElement("button");
    btnCompleto.textContent = "Toggle Check";
    btnCompleto.addEventListener("click", () => identifyTaskChecked(task.id));
    return btnCompleto;
}
function identifyTaskChecked(numId) {
    let arrayTarefasConcluidas = listaTarefas.filter(tarefa => tarefa.id == numId);
    let tarefa = arrayTarefasConcluidas[0];
    if (tarefa.concluida == true) {
        tarefa.concluida = false;
    }
    else {
        tarefa.concluida = true;
    }
    renderTasks(listaTarefas);
}
function createBtnEdit(li, task) {
    let btnEdicao = document.createElement("button");
    btnEdicao.textContent = "Edit";
    btnEdicao.addEventListener("click", () => addInput(li, task.titulo, task.id));
    return btnEdicao;
}
function addInput(tagLi, title, identificador) {
    let inputNovaTarefa = document.createElement("input");
    inputNovaTarefa.setAttribute("placeholder", title);
    let btnConclusao = document.createElement("button");
    btnConclusao.textContent = "Update";
    tagLi.innerHTML = "";
    tagLi.appendChild(inputNovaTarefa);
    tagLi.appendChild(btnConclusao);
    tagLi.appendChild(createBtnCancel());
    btnConclusao.addEventListener("click", () => changeTask(inputNovaTarefa, identificador));
}
function createBtnCancel() {
    let btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancel";
    btnCancelar.addEventListener("click", () => renderTasks(listaTarefas));
    return btnCancelar;
}
function changeTask(tagInput, numId) {
    let novoTitulo = tagInput.value;
    let arrayTemporario = listaTarefas.filter(objeto => objeto.id == numId);
    console.log(arrayTemporario);
    if (novoTitulo) {
        arrayTemporario[0].titulo = novoTitulo;
    }
    renderTasks(listaTarefas);
}
function createBtnAddTask() {
    let btnAdd = document.getElementById("addTask");
    btnAdd.addEventListener("click", () => addToTaskList());
}
function addToTaskList() {
    let tarefaIntroduzida = inputTarefa.value;
    let category = document.getElementById("categories");
    if (tarefaIntroduzida) {
        let novaTarefa = new Tarefa(Date.now(), tarefaIntroduzida, category.value);
        listaTarefas.push(novaTarefa);
    }
    console.log(listaTarefas);
    inputTarefa.value = "";
    renderTasks(listaTarefas);
}
function contarTarefasNaoCumpridas() {
    let contador = 0;
    for (let i = 0; i < listaTarefas.length; i++) {
        if (listaTarefas[i].concluida == false) {
            contador = contador + 1;
        }
    }
    return contador;
}
function atualizarBadge() {
    let valorNovoDoBadge = contarTarefasNaoCumpridas();
    let span = document.querySelector("#badge");
    span.textContent = String(valorNovoDoBadge);
}
function getBtnSortAToZ() {
    let btnSortAToZ = document.getElementById("btnSort");
    btnSortAToZ.addEventListener("click", () => sortAToZ(listaTarefas));
}
function sortAToZ(array) {
    listaTarefas = array.sort((a, b) => a.titulo.localeCompare(b.titulo));
    renderTasks(listaTarefas);
}
function createSearchTask() {
    let inputBar = document.getElementById("searchTask");
    inputBar.addEventListener("input", () => filterTask(inputBar.value));
}
function filterTask(searchedWord) {
    let listaTasksSearched = [];
    for (let i = 0; i < listaTarefas.length; i++) {
        let palavraMagica = (listaTarefas[i].titulo).toLowerCase().includes(searchedWord);
        if (palavraMagica) {
            listaTasksSearched.push(listaTarefas[i]);
        }
    }
    renderTasks(listaTasksSearched);
}
function createBtnRemovedFinishedTasks() {
    let btnRemoveFinishedtasks = document.getElementById("btnRemoveCompletedTasks");
    btnRemoveFinishedtasks.addEventListener("click", () => filterCompletedTasks());
}
function filterCompletedTasks() {
    let listaTarefasPorFazer = listaTarefas.filter(tarefa => tarefa.concluida == false);
    listaTarefas = listaTarefasPorFazer;
    renderTasks(listaTarefas);
}
function loadInitialTasks() {
    for (let i = 0; i < tarefasIniciais.length; i++) {
        let novaTarefaInicial = new Tarefa(tarefasIniciais[i].id, tarefasIniciais[i].titulo, tarefasIniciais[i].categoria);
        listaTarefas.push(novaTarefaInicial);
    }
    renderTasks(listaTarefas);
}
