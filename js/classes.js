import { adicionarAoCarrinho } from "./cart.js";

class cardProdutos {
    constructor(produto) {
        // guarda as informações
        this.img = produto.image_url;
        this.nome = produto.name;
        this.desc = produto.description;
        this.alt = produto.alt;
        this.preco = produto.price;
        this.disponibilidade = produto.availability;
    }

    gerarElemento() {
        // Criar div principal
        const card = document.createElement('div');
        card.classList.add('card'); 

        // Criar imagem
        const imagem = document.createElement('img');
        imagem.src = this.img;
        imagem.alt = this.alt;

        // Disponibilidade do produto
        const textoDisponibilidade = this.disponibilidade === 'in_stock' ? 'Em estoque' : 'Sob encomenda';

        // Criar contêiner de informações (preço e disponibilidade)
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-container');

        const disponibilidadeSpan = document.createElement('span');
        disponibilidadeSpan.classList.add('card-disponibilidade');
        disponibilidadeSpan.innerText = textoDisponibilidade;

        // Criar o elemento do preço e colocar no botão container
        const precoSpan = document.createElement('span');
        precoSpan.classList.add('card-price');
        precoSpan.innerText = `R$ ${this.preco}`;

        // Colocando o preço dentro do contêiner antes do botão
        infoContainer.appendChild(disponibilidadeSpan);
        infoContainer.appendChild(precoSpan);

        // Criar conteúdo do card
        const conteudo = document.createElement('div');
        conteudo.classList.add('card-content');

        conteudo.innerHTML = `
            <h3 class="card-title">${this.nome}</h3>
            <p class="card-description">${this.desc}</p>
        `;

        // Criar o botão de Adicionar ao carrinho e o contêiner
        const botaoContainer = document.createElement('div');
        botaoContainer.classList.add('btn-container');

        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.classList.add('btn', 'card');
        botaoAdicionar.textContent = "Adicionar ao carrinho";

        // Adicionando um "ouvinte" de clique no botão
        botaoAdicionar.addEventListener('click', () => {
            // Cria um "mini produto" só com o que importa pro carrinho
            const produtoSelecionado = {
                nome: this.nome,
                preco: this.preco,
                img: this.img,
                alt: this.alt
            };

            // Chama a função do carrinho
            adicionarAoCarrinho(produtoSelecionado);
        })

        // Colocando o botão dentro do contêiner também
        botaoContainer.appendChild(infoContainer);
        botaoContainer.appendChild(botaoAdicionar);

        // Montar o card final
        card.appendChild(imagem);
        card.appendChild(conteudo);
        card.appendChild(botaoContainer);

        // Retornar o card
        return card;
    }
}

// Permitir que outros arquivos usem essa classe
export default cardProdutos;