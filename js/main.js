import cardProdutos from "./classes.js";

// Centralizando a URL (pode ficar solta no topo do arquivo ou dentro da função)
const API_URL = "http://localhost:3000";

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/products`);

        // converte o resultado para objeto
        const respostaJson = await resposta.json();

        // checa se deu sucesso no formato padrão
        if (respostaJson.success === true) {
            return respostaJson.data; // Retorna só o array de produtos
        } else {
            console.error("Erro da API:", respostaJson.error.message);
            return [];
        }
    } catch (erro) {
        // Trata erro de rede (Ex: API fora do ar)
        console.error("Erro de rede. A API pode estar fora do ar.", erro);
        return [];
    }
}

async function iniciar() {
    // Seleciona o container onde os card vão aparecer (no HTML)
    const container = document.querySelector('#work-gallery');

    // Carrega dados
    const listaProdutos = await carregarProdutos();

    // Tratar erro de rede de forma elegante
    if (listaProdutos.length === 0) {
        container.innerHTML = `
        <div class="msg-error">
            <p>Poxa, não conseguimos carregar os produtos agora :(</p>
            <p>Tente novamente mais tarde!</p>
        </div>
        `;
        return; // interrompe a função
    }
    
    // Para cada produto do JSON, cria um card e adiciona na página
    listaProdutos.forEach(produto => {
        const card = new cardProdutos(produto).gerarElemento();
        container.appendChild(card);
    });
}

iniciar();