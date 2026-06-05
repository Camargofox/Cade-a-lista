// // 1. Captura o elemento do input Produto e quantidade, a linha da tabela (tr) onde a td vai ficar e o botão de enviar usando o document.getElementById
// const botao = document.getElementById('enviar');
// const inputProduto = document.getElementById('inp-produto');
// const inputQuantidade = document.getElementById('inp-qtd');
// const corpoTabela = document.getElementById('corpoTabela');




// // 2. Criamos um "ouvinte" que espera o clique no botão
//   botao.addEventListener('click', function() {

//     // Pegamos o valor do input e removemos espaços vazios nas pontas (.trim)
//     const valorDigitado1 = inputProduto.value.trim();
//     const valorDigitado2 = inputQuantidade.value.trim();

//     // Validação simples: se o input estiver vazio, não faz nada
//     if (valorDigitado1 === "" || valorDigitado2 === "")  {
//       alert("Por favor, digite alguma coisa!");
//       return;
//     }

//     // Como uma <td> precisa de uma linha <tr> para existir, criamos uma nova linha usando o document.createElement('tr')
//     const novaTr = document.createElement('tr');

//     //cria a td do produto, da quantidade e do botão de vazio
//     const tdProduto = document.createElement('td');
//     const tdQuantidade = document.createElement('td');
//     const tdVazia = document.createElement('td');
//     const tdBtnExcluir = document.createElement('td');

//     //Cria o botão de excluir e estiliza ele.
//     const botaoDel = document.createElement('button');
//     botaoDel.classList.add('btn-d')
//     botaoDel.textContent = "Excluir";
//     tdBtnExcluir.appendChild(botaoDel);// Colocamos o botão dentro da célula tdBtnExcluir


//     // Colocamos o texto dentro da célula
//     tdProduto.textContent = valorDigitado1;
//     tdQuantidade.textContent = valorDigitado2;
//     tdVazia.textContent = "-";

//     // Colocamos a célula (td) dentro da linha (tr)
//     novaTr.appendChild(tdProduto);
//     novaTr.appendChild(tdQuantidade);
//     novaTr.appendChild(tdVazia);
//     novaTr.appendChild(tdBtnExcluir);// Colocamos a célula do botão dentro da linha

//     // Colocamos a linha (tr) dentro do corpo da tabela (tbody)
//     corpoTabela.appendChild(novaTr);

//     // 3. Limpamos o input para a próxima digitação e focamos nele de novo
//     inputProduto.value = "";
//     inputQuantidade.value = "";
//     inputProduto.focus();


//     tdBtnExcluir.addEventListener('click', function() {
//       corpoTabela.removeChild(novaTr);
//     });
//   });



// 1. Captura os elementos do DOM
const botao = document.getElementById('enviar');
const inputProduto = document.getElementById('inp-produto');
const inputQuantidade = document.getElementById('inp-qtd');
const corpoTabela = document.getElementById('corpoTabela');

// 2. Cria a array que vai sincronizar com o localStorage
let listaDeCompras = [];

// ==========================================
// FUNÇÃO: Cria a linha na tabela (HTML)
// ==========================================
function adicionarLinhaNaTabela(produto, quantidade) {
    // Cria a linha (tr)
    const novaTr = document.createElement('tr');

    // Cria as células (td)
    const tdProduto = document.createElement('td');
    const tdQuantidade = document.createElement('td');
    const tdVazia = document.createElement('td');
    const tdBtnExcluir = document.createElement('td');

    // Cria o botão de excluir e estiliza com a sua classe CSS
    const botaoDel = document.createElement('button');
    botaoDel.classList.add('btn-d');
    botaoDel.textContent = "Excluir";
    tdBtnExcluir.appendChild(botaoDel);

    // Preenche os dados
    tdProduto.textContent = produto;
    tdQuantidade.textContent = quantidade;
    tdVazia.textContent = "-";

    // Coloca as células dentro da linha
    novaTr.appendChild(tdProduto);
    novaTr.appendChild(tdQuantidade);
    novaTr.appendChild(tdVazia);
    novaTr.appendChild(tdBtnExcluir);

    // Coloca a linha na tabela
    corpoTabela.appendChild(novaTr);

    // Evento para excluir a linha
    tdBtnExcluir.addEventListener('click', function () {
        // Remove do HTML
        corpoTabela.removeChild(novaTr);

        // Remove do localStorage também! 
        listaDeCompras = listaDeCompras.filter(item => item.produto !== produto);
        salvarNoLocalStorage();
    });
}

// // ==========================================
// // FUNÇÕES DO LOCALSTORAGE
// // ==========================================
function salvarNoLocalStorage() {
localStorage.setItem('cadeALista_itens', JSON.stringify(listaDeCompras));
}

function carregarListaSalva() {
    const dadosSalvos = localStorage.getItem('cadeALista_itens');

    if (dadosSalvos) {
        // Recupera a lista salvando de volta na array
        listaDeCompras = JSON.parse(dadosSalvos);

        // Passa por cada objeto salvo e reconstrói a linha na tabela
        listaDeCompras.forEach(item => {
            adicionarLinhaNaTabela(item.produto, item.quantidade);
        });
    }
}

// ==========================================
// EVENTO DO BOTÃO LISTAR (ENVIAR)
// ==========================================

botao.addEventListener('click', function () {
    const valorDigitado1 = inputProduto.value.trim();
    const valorDigitado2 = inputQuantidade.value.trim();

    // Validação
    if (valorDigitado1 === "" || valorDigitado2 === "") {
        alert("Por favor, digite alguma coisa!");
        return;
    }

    // 1. Cria visualmente na tabela
    adicionarLinhaNaTabela(valorDigitado1, valorDigitado2);

    // 2. Guarda na array como um Objeto { produto, quantidade }
    listaDeCompras.push({
        produto: valorDigitado1,
        quantidade: valorDigitado2
    });

    // 3. Salva a nova versão da array no localStorage
    salvarNoLocalStorage();

    // Limpa os campos e foca de novo
    inputProduto.value = "";
    inputQuantidade.value = "";
    inputProduto.focus();
});

// ==========================================
// EXECUÇÃO INICIAL
// ==========================================
// Assim que a página abre ou sofre F5, carrega os dados salvos
carregarListaSalva();
