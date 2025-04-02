// Seleciona os elementos do DOM
let nomeProduto = document.getElementById('nome');
let valorProduto = document.getElementById('valor');
let quantidadeProduto = document.getElementById('qtd');
let imgProduto = document.getElementById('img');
let conteudoTabela = document.getElementById('conteudoTabela');
let produtos = [];
let id = 1;

// Função para validar os dados do formulário
function validarDados(event) { 
    event.preventDefault(); // Previne a atualização da página

    const campos = [nomeProduto, valorProduto, quantidadeProduto, imgProduto];

    campos.forEach((campo) => {
        const valorCampo = campo.value.trim();

        if (valorCampo.length !== 0) { 
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
        } else {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
        }
    });
}

// Função para cadastrar um novo produto
function cadastrarProdutos() {
    let valor = Number(valorProduto.value.replace(',', '.')); // Permite decimais
    let quantidade = Number(quantidadeProduto.value); 

    // Verifica se os campos foram preenchidos corretamente
    if (nomeProduto.value && !isNaN(valor) && !isNaN(quantidade) && imgProduto.value) {
        produtos.push({
            id: id++, 
            nome: nomeProduto.value, 
            valProduto: valor, 
            qtdProduto: quantidade, 
            img: imgProduto.value
        });  

        renderProdutos(); // Atualiza a tabela de produtos
    }
}

// Função para renderizar a tabela de produtos
function renderProdutos() {
    conteudoTabela.innerHTML = ''; // Limpa a tabela
    produtos.forEach((item) => { 
        conteudoTabela.innerHTML += `
        <tr id="linha-${item.id}">
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.valProduto.toFixed(2)}</td>
            <td>${item.qtdProduto}</td>
            <td><img style="width: 25px; height: 25px" src="${item.img}"></td>
            <td>
                <button onclick="editProduto(${item.id})" type="button" class="btn btn-warning">Update</button>
                <button onclick="excluirProduto(${item.id})" type="button" class="btn btn-danger">Excluir</button>
            </td>
        </tr>`;
    });
}

// Função para editar um produto existente
function editProduto(id) {
    let valor = Number(valorProduto.value.replace(',', '.')); // Permite decimais
    let quantidade = Number(quantidadeProduto.value);

    produtos = produtos.map((item) => {
        if (item.id === id) {
            return {
                id: id,
                nome: nomeProduto.value,
                valProduto: !isNaN(valor) ? valor : item.valProduto,
                qtdProduto: !isNaN(quantidade) ? quantidade : item.qtdProduto,
                img: imgProduto.value || item.img,
            };
        }
        return item; 
    });

    renderProdutos(); // Atualiza a tabela de produtos
}

// Função para excluir um produto
function excluirProduto(id) {
    window.alert("Deletando produto...");

    produtos = produtos.filter((item) => item.id !== id);

    const linha = document.getElementById(`linha-${id}`);
    if (linha) {
        linha.remove(); // Remove a linha da tabela
    }
}
