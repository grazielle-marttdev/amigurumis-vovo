import cardProdutos from "./classes.js";

// Centralizando a URL (pode ficar solta no topo do arquivo ou dentro da função)
const API_URL = "http://localhost:3000";

const container = document.querySelector('#work-gallery');

async function carregarProdutos(categoria = "todos") {
    try {
        // Se a categoria for "todos", a url não tem query param. Se for outra coisa, adicionamos na URL
        const urlFetch = (categoria === "todos")
            ? `${API_URL}/products` 
            : `${API_URL}/products?category=${categoria}`;

        const resposta = await fetch(urlFetch);

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

const botoesFiltro = document.querySelectorAll('.btn-filter');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', async (event) => {
        // Percorre todos os botões da lista e remove o 'active' 
        botoesFiltro.forEach(b => b.classList.remove('active'));

        // Adiciona a classe 'active' no botão que foi clicado
        event.target.classList.add('active');

        // Pega a categoria do botão que foi clicado
        const categoriaClicada = event.target.dataset.category;

        // Carrega os novos produtos
        const listaFiltrada = await carregarProdutos(categoriaClicada);

        // Limpa a galeria no HTML 
        container.innerHTML = "";
        
        // Se a lista estiver vazia, mostra a mensagem de erro
        if (listaFiltrada.length === 0) {
            container.innerHTML = `
                <div class="msg-error">
                    <p>Poxa, ainda não temos produtos nessa categoria...</p>
                    <p>Mas logo logo teremos novidades por aqui! Que tal dar uma olhadinha nas outras categorias? :)</p>    
                </div>    
            `;
            return; // O return faz a função parar por aqui e não tentar rodar o forEach abaixo
        }

        // Adiciona os card com os produtos filtrados
        listaFiltrada.forEach(produto => {
            const card = new cardProdutos(produto).gerarElemento();
            container.appendChild(card);
        });
    })
})

iniciar();