var Tarefa = /** @class */ (function () {
    function Tarefa(id, titulo) {
        this.concluida = false;
        this.id = id;
        this.titulo = titulo;
    }
    Tarefa.prototype.marcarConcluida = function () {
        this.concluida = true;
        var dataConclusao = new Date();
        var anoConclusao = dataConclusao.getFullYear();
        var mesConclusao = dataConclusao.getMonth() + 1;
        var diaConclusao = dataConclusao.getDate();
        var horaConclusao = dataConclusao.getHours();
        var minConclusao = dataConclusao.getMinutes();
        var stringDataConclusao = String(anoConclusao) + String(mesConclusao) + String(diaConclusao) + String(horaConclusao);
        return;
    };
    Tarefa.prototype.marcarNaoConcluida = function () {
        this.concluida = false;
    };
    return Tarefa;
}());
var irCompras = new Tarefa(1, "ir às compras");
var estudar = new Tarefa(2, "estudar programação");
var listaTarefas = [irCompras, estudar];
var inputTarefa = document.getElementById("addTarefa");
renderTasks();
createBtnAddTask();
function createSingleTask(task) {
    var elemLista = document.createElement("li");
    elemLista.textContent = task.titulo;
    if (task.concluida == true) {
        elemLista.classList.add("riscarTarefa");
        // let dataConclusao = listaTarefas[i].marcarConcluida(); 
        // elemLista.textContent = listaTarefas[i].titulo + " " + String(dataConclusao)
    }
    elemLista.appendChild(createBtnRemove(task));
    elemLista.appendChild(createBtnEdit(elemLista, task));
    elemLista.appendChild(createBtnToggleCheck(task));
    return elemLista;
}
function renderTasks() {
    atualizarBadge();
    var lista = document.querySelector("#taskList");
    lista.innerHTML = "";
    for (var i = 0; i < listaTarefas.length; i++) {
        lista.appendChild(createSingleTask(listaTarefas[i]));
    }
}
function createBtnRemove(task) {
    var btnRemover = document.createElement("button");
    btnRemover.textContent = "Remove";
    btnRemover.addEventListener("click", function () { return removeTask(task.id); });
    return btnRemover;
}
function removeTask(identificador) {
    var listaSemTarefa = listaTarefas.filter(function (elemento) { return elemento.id != identificador; });
    listaTarefas = listaSemTarefa;
    renderTasks();
}
function createBtnToggleCheck(task) {
    var btnCompleto = document.createElement("button");
    btnCompleto.textContent = "Toggle Check";
    btnCompleto.addEventListener("click", function () { return identifyTaskChecked(task.id); });
    return btnCompleto;
}
function identifyTaskChecked(numId) {
    var arrayTarefasConcluidas = listaTarefas.filter(function (tarefa) { return tarefa.id == numId; });
    var tarefa = arrayTarefasConcluidas[0];
    if (tarefa.concluida == true) {
        tarefa.concluida = false;
    }
    else {
        tarefa.concluida = true;
    }
    renderTasks();
}
function createBtnEdit(li, task) {
    var btnEdicao = document.createElement("button");
    btnEdicao.textContent = "Edit";
    btnEdicao.addEventListener("click", function () { return addInput(li, task.titulo, task.id); });
    return btnEdicao;
}
function addInput(tagLi, title, identificador) {
    var inputNovaTarefa = document.createElement("input");
    inputNovaTarefa.setAttribute("placeholder", title);
    var btnConclusao = document.createElement("button");
    btnConclusao.textContent = "Update";
    tagLi.innerHTML = "";
    tagLi.appendChild(inputNovaTarefa);
    tagLi.appendChild(btnConclusao);
    tagLi.appendChild(createBtnCancel());
    btnConclusao.addEventListener("click", function () { return changeTask(inputNovaTarefa, identificador); });
}
function createBtnCancel() {
    var btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancel";
    btnCancelar.addEventListener("click", function () { return renderTasks(); });
    return btnCancelar;
}
function changeTask(tagInput, numId) {
    var novoTitulo = tagInput.value;
    var arrayTemporario = listaTarefas.filter(function (objeto) { return objeto.id == numId; });
    console.log(arrayTemporario);
    arrayTemporario[0].titulo = novoTitulo;
    renderTasks();
}
function createBtnAddTask() {
    var btnAdd = document.getElementById("addTask");
    btnAdd.addEventListener("click", function () { return addToTaskList(); });
}
function addToTaskList() {
    var tarefaIntroduzida = inputTarefa.value;
    var novaTarefa = new Tarefa(Date.now(), tarefaIntroduzida);
    listaTarefas.push(novaTarefa);
    inputTarefa.value = "";
    renderTasks();
}
function contarTarefasNaoCumpridas() {
    var contador = 0;
    for (var i = 0; i < listaTarefas.length; i++) {
        if (listaTarefas[i].concluida == false) {
            contador = contador + 1;
        }
    }
    return contador;
}
function atualizarBadge() {
    var valorNovoDoBadge = contarTarefasNaoCumpridas();
    var span = document.querySelector("#badge");
    span.textContent = String(valorNovoDoBadge);
}
