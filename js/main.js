import cardProdutos from "./classes.js";

async function carregarProdutos() {
    // Pega o JSON
    const resposta = await fetch("./assets/data/products.json");

    // Converte o JSON para o objeto
    const produtos = await resposta.json();

    return produtos;
}

async function iniciar() {
    // Seleciona o container onde os card vão aparecer (no HTML)
    const container = document.querySelector('#work-gallery');

    // Carrega dados
    const listaProdutos = await carregarProdutos();

    // Para cada produto do JSON, cria um card e adiciona na página
    listaProdutos.forEach(produto => {
        const card = new cardProdutos(produto).gerarElemento();
        container.appendChild(card);
    });
}

iniciar();