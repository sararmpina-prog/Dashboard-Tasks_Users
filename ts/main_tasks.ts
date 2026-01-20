type Categoria = 'Work' | 'Personal' | 'Studies'; 

interface TarefaInterface {
    id: number;
    titulo: string; 
    concluida: boolean; 
}


class Tarefa implements TarefaInterface {
    id: number;
    titulo: string; 
    concluida: boolean = false; 
    dataConclusao?: Date; 
    categoria: Categoria; 

    constructor (id: number, titulo: string, categoria: Categoria) {
        this.id = id; 
        this.titulo = titulo; 
        this.categoria = categoria; 
    }

    marcarConcluida () {
        this.concluida =  true; 
        let dataConclusao = new Date();
        let mesConclusao = dataConclusao.getMonth() + 1; 
        let diaConclusao = dataConclusao.getDate(); 
        let horaConclusao = dataConclusao.getHours(); 
        let minConclusao = dataConclusao.getMinutes(); 
        let stringDataConclusao = "Concluída em: " + String(diaConclusao) + "/" + String(mesConclusao) + " " + String(horaConclusao) + ":" +String(minConclusao)
        return stringDataConclusao; 
    }
   
    marcarNaoConcluida() {
        this.concluida = false; 
    }
}


let listaTarefas: Tarefa[] = []; 

let inputTarefa = document.getElementById("addTarefa") as HTMLInputElement; 

let tarefasIniciais = [
    {id: 1, titulo: "Rever finanças", categoria: "Personal"},
    {id: 2, titulo: "Ir ao jantar de anos da Bia", categoria: "Personal"}, 
    {id: 3, titulo: "Estudar programação", categoria: "Studies"},
    {id: 4, titulo: "Trabalho Ética", categoria: "Work"},
    {id: 5, titulo: "Entregar exercicios mestrado", categoria: "Work"},
    {id: 6, titulo: "Compras para casa", categoria: "Personal"},
    {id: 7, titulo: "Prenda anos da mãe", categoria: "Personal"},
    {id: 8, titulo: "Adicionar funcionalidades ao projeto", categoria: "Studies"},
    {id: 9, titulo: "Juntar dashboards no mesmo ficheiro", categoria: "Studies"},
]; 


loadInitialTasks(); 
createBtnAddTask(); 
getBtnSortAToZ (); 
createSearchTask (); 
createBtnRemovedFinishedTasks(); 

function createSingleTask(task: Tarefa) {
    let spanCategory = document.createElement("span") as HTMLSpanElement;
    let elemLista = document.createElement("li") as HTMLLIElement; 
    


        if (task.concluida == true) {
            elemLista.classList.add("riscarTarefa"); 
            let dataConclusao = task.marcarConcluida(); 
            elemLista.textContent = task.titulo + " " + String(dataConclusao)
        } 

        if (task.categoria == "Personal") {
            elemLista.classList.add("personal")
            spanCategory.textContent = "Personal"; 
            spanCategory.classList.add("personalSpan")
        }
        if (task.categoria == "Studies") {
            elemLista.classList.add("studies")
            spanCategory.textContent = "Studies"; 
            spanCategory.classList.add("studiesSpan")
        } 
        if (task.categoria == "Work") {
            elemLista.classList.add("work")
            spanCategory.textContent = "Work"; 
            spanCategory.classList.add("workSpan")
        }

    elemLista.textContent = task.titulo; 
    elemLista.prepend(spanCategory);     
    elemLista.appendChild(createBtnRemove(task)); 
    elemLista.appendChild(createBtnEdit(elemLista, task)); 
    elemLista.appendChild(createBtnToggleCheck(task)); 

    return elemLista; 
}

function renderTasks(list: Tarefa[]) {
    atualizarBadge();

    let lista = document.querySelector("#taskList") as HTMLUListElement; 

    lista.innerHTML = ""; 

    for (let i=0;  i<list.length; i++) {
        lista.appendChild(createSingleTask(list[i]));   
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
   
    
    renderTasks(listaTarefas); 
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
  renderTasks(listaTarefas); 
}



function createBtnEdit (li: HTMLLIElement, task: Tarefa) {

    let btnEdicao = document.createElement("button") as HTMLButtonElement;
    btnEdicao.textContent = "Edit"; 

    if (task.concluida == false) {
         btnEdicao.addEventListener("click", () => addInput (li, task.titulo, task.id)); 
    }
   
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

     btnCancelar.addEventListener("click", () => renderTasks(listaTarefas)); 

    return btnCancelar; 
}


function changeTask (tagInput: HTMLInputElement, numId: number) {
    let novoTitulo = tagInput.value; 

    let arrayTemporario = listaTarefas.filter(objeto => objeto.id == numId)
    console.log(arrayTemporario); 

    if (novoTitulo) {
       arrayTemporario[0].titulo = novoTitulo; 
    }
    
    renderTasks(listaTarefas); 
}

function createBtnAddTask() {
    let btnAdd = document.getElementById("addTask") as HTMLButtonElement; 

    btnAdd.addEventListener("click", () => addToTaskList())
}


function addToTaskList () {
    let tarefaIntroduzida: string = inputTarefa.value; 
    let category = document.getElementById("categories") as HTMLSelectElement; 


    if (tarefaIntroduzida){
        let novaTarefa = new Tarefa (Date.now(), tarefaIntroduzida, category.value as Categoria)
        listaTarefas.push(novaTarefa); 
    }
    
    console.log(listaTarefas); 
    inputTarefa.value = ""; 
    renderTasks(listaTarefas); 
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

function getBtnSortAToZ () {
    let btnSortAToZ = document.getElementById("btnSort") as HTMLButtonElement;

    btnSortAToZ.addEventListener("click", () => sortAToZ(listaTarefas)); 
}


function sortAToZ(array: Tarefa[]) {

    listaTarefas = array.sort((a,b) => a.titulo.localeCompare(b.titulo)); 

    renderTasks(listaTarefas); 
}

function createSearchTask () {
    let inputBar = document.getElementById("searchTask") as HTMLInputElement;


    inputBar.addEventListener("input", () => filterTask(inputBar.value)); 
}

function filterTask(searchedWord: string) {

let listaTasksSearched: Tarefa[] = []; 

  for (let i=0; i < listaTarefas.length; i++) {
    let palavraMagica = (listaTarefas[i].titulo).toLowerCase().includes(searchedWord); 
      if (palavraMagica) {
        listaTasksSearched.push(listaTarefas[i]); 
      }
  }

  renderTasks(listaTasksSearched); 
}

function createBtnRemovedFinishedTasks () {
    let btnRemoveFinishedtasks = document.getElementById("btnRemoveCompletedTasks") as HTMLButtonElement;

    btnRemoveFinishedtasks.addEventListener("click", () =>
       filterCompletedTasks()); 
}

function filterCompletedTasks() {
    
    let listaTarefasPorFazer = listaTarefas.filter(tarefa => tarefa.concluida == false); 

    listaTarefas = listaTarefasPorFazer

    renderTasks(listaTarefas); 
}



function loadInitialTasks() {

    for (let i=0; i<tarefasIniciais.length; i++) {
        let novaTarefaInicial = new Tarefa (tarefasIniciais[i].id, tarefasIniciais[i].titulo, tarefasIniciais[i].categoria as Categoria); 
        listaTarefas.push(novaTarefaInicial); 
    }

    renderTasks(listaTarefas); 
}