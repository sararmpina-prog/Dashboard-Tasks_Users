
Trabalho realizado por Sara Pina.

Link do repositório: https://github.com/sararmpina-prog/Dashboard-Users.git


# Principais decisões tomadas e justificação da adequação


Para este projecto, o meu foco principal foram as funcionalidades solicitadas serem bem conseguidas.

Neste sentido, o foco menor foi a nível de CSS e como tal responsividade que tentarei colmatar futuramente.


## Tasks Dashboard

Nesta página apresento um dashboard com diferentes tarefas, que permite de um forma generalizada a apresentação das mesmas, e manipulação destas (adição e remoção). 

Ao iniciar a página, estão presentes as tarefas (objetos do tipo Classe Tarefa)criadas por mim e adicionados ao array original. 

Esta classe implementa ainda a interface Tarefa:

interface TarefaInterface 
    id: number;
    titulo: string; 
    concluida: boolean; 

No cabeçalho da página, existe uma opção para Users e outra para Tasks.
Ao clicar em cada uma destas opções, remete para a página respectiva. 
Neste caso, User remete para o "Users Dashboard" aberto numa página à parte.  
E a Tasks mantêm na mesma página. 

No topo da página, próximo do título "Tasks Dashboards", podemos ver o número de tarefas totais. Ao passar sobre o mesmo aparece a componente descritiva ("total number of tasks") através da colocação do atributo "title" em html no respectivo ícon.

Entre as funcionalidades presentes na Tasks Dashboard, temos as seguintes:
 - Adicionar uma nova tarefa (associando uma categoria);
 - Pesquisar uma tarefa (barra de pesquisa);
 - Filtrar as tarefas apresentadas através de dois filtros:
   Remover todas as tarefas concluidas;
   Apresentar as tarefas presentes por ordem alfabética; 

Adicionalmente, em cada tarefa é possível:
- Remover a tarefa;
- "Riscar" como concluída (toggle check);
- Editar (se ainda não concluida); 
Na edição da tarefa, é possível alterar a tarefa inserida ou cancelar a edição (botões update e cancel, respectivamente).

As categorias são identificavéis pela atribuição de cor diferente consoante as categorias, e adicionalmente colocado o nome da categoria associado à tarefa no dashboard. 


## Users Dashboard

Idêntico à página anterior de uma forma generalizada este dashboard apresenta a gestão dos usuários.

Ao iniciar a página vão ser exibidos os utilizadores que criei (objetos do tipo Classe Utilizador) que foram colocados no array lista de Utilizadores. 
Esta Classe implementa interface Utilizador.

interface UtilizadorInterface 
  id: number;
  nome: string;
  email: string;
  ativo: boolean;


No topo da página, apresento, similarmente, três identificadores que dão informação sobre o número de utilizadores activos; inactivos e totais. 
Estes identificadores mudam dinamicamente há medida que os utilizadores sofrem alterações (removidos, alterado o estado) ou inclusive são adicionados novos. 

Ainda é possível ver a percentagem de utilizadores activos a mudar dinamicamente.Fiz a opção de manter com 2 casas decimais (ver função renderActiveUsersPercentage() para mais informação).

Esta página permite as seguintes funcionalidades:
 - Adicionar um novo usuário (para verificação de email usada função regex); 
 - Filtrar os usuários através dos seguintes filtros:
   Ordenar alfabeticamente;
   Mostrar só os utilizadores activos (logged in);
   Pesquisar um usuário (barra de pesquisa);
Para tirar todos os filtros pode-se selecionar o botão "reset all filters" ou retirar os pretendidos ao clicar (quando selecionado o filtro apresenta borda vermelha que é removida se filtro não está aplicado).

Em cada utilizador, é possível: 
- ativar toggle (permite alterar sessões, in and out)





# Passos para executar a vossa página