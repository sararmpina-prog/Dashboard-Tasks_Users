

interface TarefaInterface {
    id: number;
    titulo: string; 
    concluida: boolean; 
}



class Tarefa implements TarefaInterface {
    id: number;
    titulo: string; 
    concluida: boolean = false; 

    constructor (id: number, titulo: string) {
        this.id = id; 
        this.titulo = titulo; 
    }

    marcarConcluida () {
        this.concluida =  true; 
        let dataConclusao = new Date();
        let anoConclusao = dataConclusao.getFullYear(); 
        let mesConclusao = dataConclusao.getMonth() + 1; 
        let diaConclusao = dataConclusao.getDate(); 
        let horaConclusao = dataConclusao.getHours(); 
        let minConclusao = dataConclusao.getMinutes(); 
        let stringDataConclusao = String(anoConclusao) + String(mesConclusao) + String(diaConclusao) + String(horaConclusao)
        return  
    }
   
    marcarNaoConcluida() {
        this.concluida = false; 
    }
}



let irCompras = new Tarefa (1, "ir às compras")
let estudar = new Tarefa (2, "estudar programação")


let listaTarefas: Tarefa[] = [irCompras, estudar]; 
let inputTarefa = document.getElementById("addTarefa") as HTMLInputElement; 

renderTasks(); 
createBtnAddTask(); 

function createSingleTask(task: Tarefa) {

    let elemLista = document.createElement("li") as HTMLLIElement; 
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

    let lista = document.querySelector("#taskList") as HTMLUListElement; 

    lista.innerHTML = ""; 

    for (let i=0;  i<listaTarefas.length; i++) {
        lista.appendChild(createSingleTask(listaTarefas[i]));   
    }
}

function createBtnRemove(task: Tarefa) {

    let btnRemover = document.createElement("button") as HTMLButtonElement; 
    btnRemover.textContent = "Remove";

    btnRemover.addEventListener("click", () => removeTask (task.id));

    return btnRemover; 
}

function removeTask (identificador: number) {
    let listaSemTarefa = listaTarefas.filter(elemento => elemento.id != identificador)
    listaTarefas = listaSemTarefa;
   
    
    renderTasks(); 
}


function createBtnToggleCheck(task: Tarefa) {
    let btnCompleto = document.createElement("button") as HTMLButtonElement;
    btnCompleto.textContent = "Toggle Check"

    btnCompleto.addEventListener("click", () => identifyTaskChecked(task.id)); 

    return btnCompleto; 
}


function identifyTaskChecked(numId: number) {
  let arrayTarefasConcluidas = listaTarefas.filter(tarefa => tarefa.id == numId)

  let tarefa = arrayTarefasConcluidas[0]

  if (tarefa.concluida == true) {
    tarefa.concluida = false; 
  } else {
    tarefa.concluida = true; 
  }
  renderTasks(); 
}

function createBtnEdit (li: HTMLLIElement, task: Tarefa) {

    let btnEdicao = document.createElement("button") as HTMLButtonElement;
    btnEdicao.textContent = "Edit"; 


    btnEdicao.addEventListener("click", () => addInput (li, task.titulo, task.id)); 

    return btnEdicao; 
}


function addInput(tagLi: HTMLLIElement, title: string, identificador: number) {

    let inputNovaTarefa = document.createElement("input") as HTMLInputElement; 
    inputNovaTarefa.setAttribute("placeholder", title); 

    let btnConclusao = document.createElement("button") as HTMLButtonElement; 
    btnConclusao.textContent = "Update"; 

   

    tagLi.innerHTML = ""; 
    tagLi.appendChild(inputNovaTarefa); 
    tagLi.appendChild(btnConclusao);
    tagLi.appendChild(createBtnCancel()); 


    btnConclusao.addEventListener("click", () => changeTask (inputNovaTarefa, identificador)); 
      
}

function createBtnCancel () {

    let btnCancelar = document.createElement("button") as HTMLButtonElement; 

    btnCancelar.textContent = "Cancel"; 

     btnCancelar.addEventListener("click", () => renderTasks()); 

    return btnCancelar; 
}


function changeTask (tagInput: HTMLInputElement, numId: number) {
    let novoTitulo = tagInput.value; 

    let arrayTemporario = listaTarefas.filter(objeto => objeto.id == numId)
    console.log(arrayTemporario); 

    arrayTemporario[0].titulo = novoTitulo;

    renderTasks(); 
}

function createBtnAddTask() {
    let btnAdd = document.getElementById("addTask") as HTMLButtonElement; 

    btnAdd.addEventListener("click", () => addToTaskList())
}


function addToTaskList () {
    let tarefaIntroduzida: string = inputTarefa.value; 
    let novaTarefa = new Tarefa (Date.now(), tarefaIntroduzida)

    listaTarefas.push(novaTarefa); 
    
    inputTarefa.value = ""; 

    renderTasks(); 
}


function contarTarefasNaoCumpridas () {
    let contador = 0; 
    for (let i =0; i<listaTarefas.length; i++) {
        if (listaTarefas[i].concluida == false) {
            contador = contador + 1; 
        }
    }
    
    return contador;
}

function atualizarBadge() {
    let valorNovoDoBadge: number = contarTarefasNaoCumpridas(); 

    let span = document.querySelector("#badge") as HTMLSpanElement; 

    span.textContent = String(valorNovoDoBadge); 
}

