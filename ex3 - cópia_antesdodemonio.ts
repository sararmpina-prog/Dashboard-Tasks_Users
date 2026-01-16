

// Exer1: Cria uma interface chamada Tarefa que defina a estrutura de um objeto de tarefa

interface TarefaInterface {
    id: number;
    titulo: string; 
    concluida: boolean; 
}


// Exerc2: Cria uma classe TarefaClass que implemente a interface Tarefa.


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
    }
}

// Exerc3: Cria um array chamado listaTarefas que armazene vários objetos do tipo Tarefa.


let irCompras = new Tarefa (1, "ir às compras")
let estudar = new Tarefa (2, "estudar programação")

irCompras.marcarConcluida();  

let listaTarefas: Tarefa[] = [irCompras, estudar]; 

console.log("o array é",listaTarefas)

addTaskstoHtml(); 


function addTaskstoHtml () {
    let lista = document.querySelector("#taskList") as HTMLUListElement; 
    lista.innerHTML = ""; 
    for (let i=0;  i<listaTarefas.length; i++) {
        let elemLista = document.createElement("li") as HTMLLIElement; 
        elemLista.textContent = listaTarefas[i].titulo; 
        if (listaTarefas[i].concluida == true) {
            elemLista.classList.add("riscarTarefa"); 
        }
        let btnRemover = document.createElement("button") as HTMLButtonElement; 
        btnRemover.textContent = "Remover"; 
        elemLista.appendChild(btnRemover); 

        let btnEdicao = document.createElement("button") as HTMLButtonElement;
        btnEdicao.textContent = "Editar"; 

        elemLista.appendChild(btnEdicao); 

        lista.appendChild(elemLista); 

        // btnRemover.addEventListener("click", () => 
        //     elemLista.remove()); 

        btnRemover.addEventListener("click", () => removerTarefa (listaTarefas[i].id));
        
        // btnEdicao.addEventListener("click", () => editarTarefa (listaTarefas[i].id)); 

        btnEdicao.addEventListener("click", () => adicionarInputEdicao (elemLista, listaTarefas[i].id)); 
}
}

function removerTarefa (identificador: number) {
    let listaSemTarefa = listaTarefas.filter(elemento => elemento.id != identificador)
    listaTarefas = listaSemTarefa;
    console.log(" a minha lista sem a tarefa eliminada é",listaTarefas); 
    addTaskstoHtml(); 
}


// function editarTarefa (identificador: number) {
//     let elemEditado = listaTarefas.filter(elemento => elemento.id == identificador);
//     console.log(elemEditado); 
// }

function adicionarInputEdicao (elemento: HTMLLIElement, identificador: number) {
    console.log("O elemento HTML é", elemento); 
    let tarefaAlterada = document.createElement("input");
    tarefaAlterada.setAttribute("placeholder", "Edite a sua tarefa aqui"); 

    let enter = document.createElement("br"); 
    let btnConcluida = document.createElement("button"); 
    btnConcluida.textContent = "Concluir"; 

    elemento.appendChild(enter); 
    elemento.appendChild(tarefaAlterada); 
    elemento.appendChild(btnConcluida); 

    btnConcluida.addEventListener("click", () => alterarTarefaArray (identificador, tarefaAlterada))
}

function alterarTarefaArray (codigo: number, tarefa: HTMLInputElement) {
    
    let arrayPrecisaEdicao = listaTarefas.filter(elemento => elemento.id == codigo);
    console.log("O objeto do tipo Tarefa é", arrayPrecisaEdicao); 

    let objetoTarefa = arrayPrecisaEdicao[0]

    console.log("O objeto do array é", objetoTarefa); 
    console.log("O input criado é", tarefa); 

    let novoTitulo = tarefa.value;
    console.log("O novotitulo tem que ser", novoTitulo)

    objetoTarefa.titulo = novoTitulo; 

    console.log("elemento c nova propriedade titulo e",objetoTarefa); 
    addTaskstoHtml(); 

    console.log(listaTarefas); 
}


// Exerc4: Cria um campo de texto e um botão para adicionar novas tarefas ao array.

let inputTarefa = document.getElementById("addTarefa") as HTMLInputElement; 

let btnAdd = document.getElementById("addTask") as HTMLButtonElement; 

btnAdd.addEventListener("click", () => addToTaskList())


function addToTaskList () {
    let tarefaIntroduzida: string = inputTarefa.value; 
    let novaTarefa = new Tarefa (Date.now(), tarefaIntroduzida)
    listaTarefas.push(novaTarefa); 
    console.log("esta é a lista atualizada", listaTarefas); 
    inputTarefa.value = ""; 
    addTaskstoHtml(); 
}

// Exerc7: Adiciona um botão "Remover" ao lado de cada tarefa na lista.

// Exerc8: Adiciona um botão "Editar" ao lado de cada tarefa na lista.
