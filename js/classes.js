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

        // Criar o botão de Whatsapp e o contêiner
        const botaoContainer = document.createElement('div');
        botaoContainer.classList.add('btn-container');

        // Configurando o link do Whatsapp
        const numeroLoja = "5511999999999";
        const textoMensagem = `Olá, tenho interesse no amigurumi ${this.nome}!`

        const link = document.createElement('a');
        link.href = `https://api.whatsapp.com/send?phone=${numeroLoja}&text=${encodeURIComponent(textoMensagem)}`
        link.target = "_blank";
        link.classList.add('btn', 'card');
        link.textContent = "Quero esse amigurumi";

        // Colocando o botão dentro do contêiner também
        botaoContainer.appendChild(infoContainer);
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