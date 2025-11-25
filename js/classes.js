class cardProdutos {
    constructor(produto) {
        // guarda as informações
        this.img = produto.imagem;
        this.nome = produto.nome;
        this.desc = produto.descricao;
        this.preco = produto.preco;
        this.link = produto.whatsapp;
    }

    gerarElemento() {
        // Criar div principal
        const card = document.createElement('div');
        card.classList.add('card'); 

        // Criar imagem
        const imagem = document.createElement('img');
        imagem.src = this.img;
        imagem.alt = this.nome;

        // Criar conteúdo do card
        const conteudo = document.createElement('div');
        conteudo.classList.add('card-content');

        conteudo.innerHTML = `
            <h2 class="card-title">${this.nome}</h2>
            <p class="card-description">${this.desc}</p>
            <span class="card-price">R$ ${this.preco}</span>
        `;

        // Criar o botão de Whatsapp
        const botaoContainer = document.createElement('div');
        botaoContainer.classList.add('btn-container');

        const link = document.createElement('a');
        link.href = this.link;
        link.target = "_blank";
        link.classList.add('btn', 'card');

        link.textContent = "Quero esse amigurumi";

        botaoContainer.appendChild(link);

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