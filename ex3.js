// Exer1: Cria uma interface chamada Tarefa que defina a estrutura de um objeto de tarefa
// Exerc2: Cria uma classe TarefaClass que implemente a interface Tarefa.
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
// Exerc3: Cria um array chamado listaTarefas que armazene vários objetos do tipo Tarefa.
var irCompras = new Tarefa(1, "ir às compras");
var estudar = new Tarefa(2, "estudar programação");
irCompras.marcarConcluida();
var listaTarefas = [irCompras, estudar];
console.log("o array é", listaTarefas);
console.log("olá");
addTaskstoHtml();
function addTaskstoHtml() {
    atualizarBadge();
    var lista = document.querySelector("#taskList");
    lista.innerHTML = "";
    var _loop_1 = function (i) {
        var elemLista = document.createElement("li");
        elemLista.textContent = listaTarefas[i].titulo;
        if (listaTarefas[i].concluida == true) {
            elemLista.classList.add("riscarTarefa");
            // let dataConclusao = listaTarefas[i].marcarConcluida(); 
            // elemLista.textContent = listaTarefas[i].titulo + " " + String(dataConclusao)
        }
        var btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        elemLista.appendChild(btnRemover);
        var btnEdicao = document.createElement("button");
        btnEdicao.textContent = "Editar";
        var btnCompleto = document.createElement("button");
        btnCompleto.textContent = "Toggle Check";
        elemLista.appendChild(btnEdicao);
        elemLista.appendChild(btnCompleto);
        lista.appendChild(elemLista);
        // btnRemover.addEventListener("click", () => 
        //     elemLista.remove()); 
        btnCompleto.addEventListener("click", function () { return identifyTaskChecked(listaTarefas[i].id); });
        btnRemover.addEventListener("click", function () { return removerTarefa(listaTarefas[i].id); });
        // btnEdicao.addEventListener("click", () => editarTarefa (listaTarefas[i].id)); 
        // btnEdicao.addEventListener("click", () => adicionarInputEdicao (elemLista, listaTarefas[i].id)); 
        btnEdicao.addEventListener("click", function () { return addInput(elemLista, listaTarefas[i].titulo, listaTarefas[i].id); });
    };
    for (var i = 0; i < listaTarefas.length; i++) {
        _loop_1(i);
    }
}
function removerTarefa(identificador) {
    var listaSemTarefa = listaTarefas.filter(function (elemento) { return elemento.id != identificador; });
    listaTarefas = listaSemTarefa;
    console.log(" a minha lista sem a tarefa eliminada é", listaTarefas);
    addTaskstoHtml();
}
function addInput(tagLi, title, identificador) {
    var inputNovaTarefa = document.createElement("input");
    inputNovaTarefa.setAttribute("placeholder", title);
    var btnConclusao = document.createElement("button");
    btnConclusao.textContent = "Atualizar";
    var btnCancelar = document.createElement("button");
    btnCancelar.textContent = "Cancelar";
    tagLi.innerHTML = "";
    tagLi.appendChild(inputNovaTarefa);
    tagLi.appendChild(btnConclusao);
    tagLi.appendChild(btnCancelar);
    btnCancelar.addEventListener("click", function () { return addTaskstoHtml(); });
    btnConclusao.addEventListener("click", function () { return changeTask(inputNovaTarefa, identificador); });
}
function changeTask(tagInput, numId) {
    var novoTitulo = tagInput.value;
    var arrayTemporario = listaTarefas.filter(function (objeto) { return objeto.id == numId; });
    console.log(arrayTemporario);
    arrayTemporario[0].titulo = novoTitulo;
    addTaskstoHtml();
}
// function editarTarefa (identificador: number) {
//     let elemEditado = listaTarefas.filter(elemento => elemento.id == identificador);
//     console.log(elemEditado); 
// }
// function adicionarInputEdicao (elemento: HTMLLIElement, identificador: number) {
//     console.log("O elemento HTML é", elemento); 
//     let tarefaAlterada = document.createElement("input");
//     tarefaAlterada.setAttribute("placeholder", "Edite a sua tarefa aqui"); 
//     let enter = document.createElement("br"); 
//     let btnConcluida = document.createElement("button"); 
//     btnConcluida.textContent = "Concluir"; 
//     elemento.appendChild(enter); 
//     elemento.appendChild(tarefaAlterada); 
//     elemento.appendChild(btnConcluida); 
//     btnConcluida.addEventListener("click", () => alterarTarefaArray (identificador, tarefaAlterada))
// }
// function alterarTarefaArray (codigo: number, tarefa: HTMLInputElement) {
//     let arrayPrecisaEdicao = listaTarefas.filter(elemento => elemento.id == codigo);
//     console.log("O objeto do tipo Tarefa é", arrayPrecisaEdicao); 
//     let objetoTarefa = arrayPrecisaEdicao[0]
//     console.log("O objeto do array é", objetoTarefa); 
//     console.log("O input criado é", tarefa); 
//     let novoTitulo = tarefa.value;
//     console.log("O novotitulo tem que ser", novoTitulo)
//     objetoTarefa.titulo = novoTitulo; 
//     console.log("elemento c nova propriedade titulo e",objetoTarefa); 
//     addTaskstoHtml(); 
//     console.log(listaTarefas); 
// }
// Exerc4: Cria um campo de texto e um botão para adicionar novas tarefas ao array.
var inputTarefa = document.getElementById("addTarefa");
var btnAdd = document.getElementById("addTask");
btnAdd.addEventListener("click", function () { return addToTaskList(); });
function addToTaskList() {
    var tarefaIntroduzida = inputTarefa.value;
    var novaTarefa = new Tarefa(Date.now(), tarefaIntroduzida);
    listaTarefas.push(novaTarefa);
    console.log("esta é a lista atualizada", listaTarefas);
    inputTarefa.value = "";
    addTaskstoHtml();
}
// Exerc7: Adiciona um botão "Remover" ao lado de cada tarefa na lista.
// Exerc8: Adiciona um botão "Editar" ao lado de cada tarefa na lista.
//Exerc9
function contarTarefasNaoCumpridas() {
    var contador = 0;
    for (var i = 0; i < listaTarefas.length; i++) {
        if (listaTarefas[i].concluida == false) {
            contador = contador + 1;
        }
    }
    console.log("O contador é", contador);
    return contador;
}
function atualizarBadge() {
    var valorNovoDoBadge = contarTarefasNaoCumpridas();
    var span = document.querySelector("#badge");
    span.textContent = String(valorNovoDoBadge);
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
    addTaskstoHtml();
}
