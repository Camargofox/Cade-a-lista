//Functions




// 1. Captura o elemento do input Produto e quantidade, a linha da tabela (tr) onde a td vai ficar e o botão de enviar usando o document.getElementById
const botao = document.getElementById('enviar');
const inputProduto = document.getElementById('inp-produto');
const inputQuantidade = document.getElementById('inp-qtd');
const corpoTabela = document.getElementById('corpoTabela');




// 2. Criamos um "ouvinte" que espera o clique no botão
  botao.addEventListener('click', function() {
    
    // Pegamos o valor do input e removemos espaços vazios nas pontas (.trim)
    const valorDigitado1 = inputProduto.value.trim();
    const valorDigitado2 = inputQuantidade.value.trim();

    // Validação simples: se o input estiver vazio, não faz nada
    if (valorDigitado1 === "" || valorDigitado2 === "")  {
      alert("Por favor, digite alguma coisa!");
      return;
    }

    // Como uma <td> precisa de uma linha <tr> para existir, criamos uma nova linha usando o document.createElement('tr')
    const novaTr = document.createElement('tr');

    //cria a td do produto, da quantidade e do botão de vazio
    const tdProduto = document.createElement('td');
    const tdQuantidade = document.createElement('td');
    const tdVazia = document.createElement('td');
    const tdBtnExcluir = document.createElement('td');

    //Cria o botão de excluir e estiliza ele.
    const botaoDel = document.createElement('button');
    botaoDel.classList.add('btn-d')
    botaoDel.textContent = "Excluir";
    tdBtnExcluir.appendChild(botaoDel);// Colocamos o botão dentro da célula tdBtnExcluir
    

    // Colocamos o texto dentro da célula
    tdProduto.textContent = valorDigitado1;
    tdQuantidade.textContent = valorDigitado2;
    tdVazia.textContent = "-";

    // Estilizamos o botão de excluir temporalmente para ficar mais visível
    // botaoDel.style.cursor = "pointer";
    // botaoDel.style.color = "red";



    // tdBtnExcluir.id = "btn-d";
    
    // Colocamos a célula (td) dentro da linha (tr)
    novaTr.appendChild(tdProduto);
    novaTr.appendChild(tdQuantidade);
    novaTr.appendChild(tdVazia);
    novaTr.appendChild(tdBtnExcluir);// Colocamos a célula do botão dentro da linha

    // Colocamos a linha (tr) dentro do corpo da tabela (tbody)
    corpoTabela.appendChild(novaTr);

    // 3. Limpamos o input para a próxima digitação e focamos nele de novo
    inputProduto.value = "";
    inputQuantidade.value = "";
    inputProduto.focus();


    tdBtnExcluir.addEventListener('click', function() {
      corpoTabela.removeChild(novaTr);
    });
  });
  




    
    

   
   
    























// // 2. Captura o valor atual que está digitado no input
// const valorDigitado = input.value;

// // 3. Cria um elemento <tr> e um elemento <td> usando o document.createElement
// const novaLinha = document.createElement('tr');
// const novaCelula = document.createElement('td');

// //4. joga o valor capturado do input para dentro da <td> criada
// novaCelula.textContent = valorDigitado;

// //5. Insere a nova <td> dentro da linha (tr) usando o appendChild
// corpoTabela.appendChild(novaLinha);
