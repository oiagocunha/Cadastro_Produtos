// Seleciona os elementos do DOM
let nomeProduto = document.getElementById('nome');
let valorProduto = document.getElementById('valor');
let quantidadeProduto = document.getElementById('qtd');
let imgProduto = document.getElementById('img');
let produtos = [];
let id = 1;

// Função para validar os dados do formulário
function validarDados() {
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
    // Verifica se todos os campos estão preenchidos
    if (nomeProduto.value && valorProduto.value && quantidadeProduto.value && imgProduto.value) {
        // Adiciona o novo produto ao array de produtos
        produtos.push({
            id: id, 
            nome: nomeProduto.value, 
            valProduto: valorProduto.value, 
            qtdProduto: quantidadeProduto.value, 
            img: imgProduto.value
        })  
        
        id++; // Incrementa o ID para o próximo produto

    } else {
        ''; // Caso algum campo não esteja preenchido, não faz nada
    }
    
    renderProdutos(); // Atualiza a tabela de produtos
}

// Função para renderizar a tabela de produtos
function renderProdutos() {
    // Se não houver produtos, reseta o ID e o array de produtos
    if (produtos.length === 0) {
        id = 1;
        produtos = [];
    }

    conteudoTabela.innerHTML = ``; // Limpa o conteúdo da tabela
    produtos.forEach((item) => { 
        // Adiciona cada produto à tabela
        conteudoTabela.innerHTML += `
        <tr id="linha-${item.id}">
        <td>${item.id}</td>
        <td>${item.nome}</td>
        <td>${item.valProduto}</td>
        <td>${item.qtdProduto}</td>
        <td><img style="width: 25px; height: 25px" src="${item.img}"></td>
        <td>
            <button onclick="editProduto(${item.id})" type="button" class="btn btn-warning">Update</button>
            <button onclick="excluirProduto(${item.id})" type="button" class="btn btn-danger">Excluir</button>
        </td>
       </tr>
    `;
    });
}

// Função para editar um produto existente
function editProduto(id) {
    // Atualiza o produto com os novos valores do formulário
    produtos = produtos.map((item) => {
        if (item.id === id) {
            return {
                id: id,
                nome: nomeProduto.value,
                valProduto: valorProduto.value,
                qtdProduto: quantidadeProduto.value,
                img: imgProduto.value,
            };
        }
        return item; 
    });

    renderProdutos(); // Atualiza a tabela de produtos
}

// Função para excluir um produto
function excluirProduto(id) {
    window.alert("Deletando produto...");

    // Filtra o array de produtos para remover o produto com o ID especificado
    produtos = produtos.filter((item) => item.id !== id);

    const linha = document.getElementById(`linha-${id}`);
    if (linha) {
        linha.remove(); // Remove a linha da tabela correspondente ao produto excluído
    }

    renderProdutos(); // Atualiza a tabela de produtos
}