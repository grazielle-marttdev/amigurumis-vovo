// ==========================================
// ABRIR E FECHAR O CARRINHO
// ==========================================

const btnAbrirCarrinho = document.getElementById('cart-toggle-btn');
const btnFecharCarrinho = document.getElementById('close-cart-btn');
const sidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('cart-overlay');

// Retorna todos os elementos focáveis dentro do painel
function getElementosFocaveis() {
    return Array.from(sidebar.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled);
}

// Mantém o foco "preso" dentro do painel enquanto ele estiver aberto
function trapFocus(event) {
    if (event.key !== 'Tab') return;

    const focaveis = getElementosFocaveis();
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (event.shiftKey) {
        // Shift+Tab: se estiver no primeiro, pula para o último
        if (document.activeElement === primeiro) {
            event.preventDefault();
            ultimo.focus();
        }
    } else {
        // Tab: se estiver no último, volta para o primeiro
        if (document.activeElement === ultimo) {
            event.preventDefault();
            primeiro.focus();
        }
    }
}

// Função que adiciona a classe "open"
function abrirCarrinho() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    sidebar.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden'; // bloqueia o scroll do site
    btnFecharCarrinho.focus();  // leva o foco para dentro do painel
    document.addEventListener('keydown', trapFocus); // ativa o focus trap
}

// Função para remover a classe "open"
function fecharCarrinho() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true'); // esconde do leitor quando fechado
    document.body.style.overflow = ''; // desbloqueia o scroll do site
    btnAbrirCarrinho.focus(); // devolve o foco para o botão principal
    document.removeEventListener('keydown', trapFocus); // desativa o focus trap
}

// Abrem o carrinho ao clicar no ícone
btnAbrirCarrinho.addEventListener('click', abrirCarrinho);

// Fecham o carrinho ao clicar no botão fechar
btnFecharCarrinho.addEventListener('click', fecharCarrinho);

// Se o usuário clicar no overlay, fecha o carrinho
overlay.addEventListener('click', fecharCarrinho);

// Fecha o painel ao pressionar a tecla 'Escape' do teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
        fecharCarrinho();
    }
})

// ==========================================
// ADICIONAR PRODUTOS AO CARRINHO
// ==========================================

// Criar variável (uma lista/array) que começa vazia
let itensDoCarrinho = [];

// Função que adiciona um item ao carrinho
export function adicionarAoCarrinho(produto) {
    itensDoCarrinho.push(produto);

    // Atualiza o número da bolinha do carrinho no topo da tela
    const contador = document.getElementById('cart-counter');
    contador.innerText = itensDoCarrinho.length;

    salvarCarrinho();

    atualizarCarrinhoHTML();
    abrirCarrinho();
}

// ==========================================
// DESENHAR OS ITENS NA TELA
// ==========================================
function atualizarCarrinhoHTML() {
    const containerItens = document.getElementById('cart-items');
    const containerTotal = document.getElementById('cart-total-price');  

    // Limpar a gaveta toda vez para não duplicar 
    containerItens.innerHTML = "";

    // Se a pessoa removeu tudo e a lista ficou vazia:
    if (itensDoCarrinho.length === 0) {
        containerItens.innerHTML = "<p style='text-align: center; color: gray; margin-top: 2rem;'>Seu carrinho está vazio 🧶</p>";
        containerTotal.innerText = "R$ 0,00";
        return; // Interrompe a função aqui
    }

    let valorTotal = 0;

    // Percorrer cada item na lista de compras
    itensDoCarrinho.forEach((produto, index) => {
        // Transforma o preço (que vem como texto do banco) em número para somar
        valorTotal += Number(produto.preco);

        // Cria a caixinha HTML desse produto
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item-div');

        // Injeta o conteúdo dentro da caixinha usando template literal
        itemDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${produto.img}" alt="${produto.alt}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4 style="font-size: 1rem; margin: 0; color: var(--cozy-brown);">${produto.nome}</h4>
                    <span style="font-weight: bold; color: var(--deep-moss);">R$ ${produto.preco}</span>
                </div>
            </div>
        `;

        // Botão de lixeira para remover o produto
        const btnRemover = document.createElement('button');
        btnRemover.setAttribute('aria-label', `Remover ${produto.nome} do carrinho`)
        btnRemover.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnRemover.classList.add('cart-btn-remover');

        // Se clicar na lixeira, remove o produto da lista e manda desenhar a tela de novo
        btnRemover.addEventListener('click', () => {
            itensDoCarrinho.splice(index, 1);
            document.getElementById('cart-counter').innerText = itensDoCarrinho.length;
            salvarCarrinho();
            atualizarCarrinhoHTML();
        });

        // Coloca a lixeira dentro da caixinha, e a caixinha dentro da gaveta
        itemDiv.appendChild(btnRemover);
        containerItens.appendChild(itemDiv);

        // Atualiza o texto do Total com a soma final
        containerTotal.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')
        }`;
    })
}

// ==========================================
// FINALIZAR PEDIDO (SALVAR + WHATSAPP)
// ==========================================

const btnCheckout = document.getElementById('checkout-btn');

btnCheckout.addEventListener('click', async () => {
    // Previne que a pessoa mande mensagem sem ter comprado nada
    if (itensDoCarrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione alguns produtos primeiro 🧶");
        return;
    }

    // Verifica se o usuário está logado (tem token no localStorage?)
    const token = localStorage.getItem('token');

    if (!token) {
        // Salvar um sinal para saber que, depois de logar, ele quer finalizar o pedido
        localStorage.setItem('pendingCheckout', 'true');

        alert('Para finalizar seu pedido, você precisa criar uma conta ou fazer login 🧶');
        window.location.href = 'auth/login.html';
        return;  
    }

    // Está logado, então monta os itens no formato que o backend espera
    const items = itensDoCarrinho.map(produto => ({
        productId: produto.id,
        quantity: 1,
        unitPrice: produto.preco
    }));

    try {
        // Envia o pedido pro backend
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // envia o token para provar que está logado
            },
            body: JSON.stringify({ items })
        });

        const result = await response.json();

        if (!result.success) {
            // Se o token expirou ou é inválido, redireciona para o login
            if (result.error.code === 'INVALID_TOKEN') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.setItem('pendingCheckout', 'true');
                alert('Sua sessão expirou. Faça login novamente para concluir o pedido 🧶');
                window.location.href = 'auth/login.html';
                return;
            }

            alert(result.error.message);
            return;
        }

        // Pedido salvo, agora é montar a mensagem do WhatsApp
        const user = JSON.parse(localStorage.getItem('user'));
        let textoMensagem = `Olá! Meu nome é ${user.name} e gostaria de fazer o seguinte pedido:\n\n`;
        let valorTotal = 0;
    
        // Passamos pela lista adicionando o nome e preço de cada item
        itensDoCarrinho.forEach(produto => {
            textoMensagem += `${produto.nome} (R$ ${produto.preco})\n`;
            valorTotal += Number(produto.preco);
        });
    
        // Coloca o total no final, em negrito (usando os asteriscos do WhatsApp)
        textoMensagem += `\n*Total estimado: R$ ${valorTotal.toFixed(2).replace('.', ',')}*`;
        textoMensagem += `\n*Pedido nº ${result.data.orderId}*`
        textoMensagem += `\n\nAguardo o retorno para combinarmos o pagamento e a entrega!`;
    
        // O navegador precisa "codificar" o texto para poder enviar em um link
        const textoCodificado = encodeURIComponent(textoMensagem); 
        const numeroLoja = "5561999999999";

        // Limpa o carrinho (que já foi salvo no banco)
        itensDoCarrinho = [];
        salvarCarrinho();
        document.getElementById('cart-counter').innerText = '0'; // Atualiza a bolinha no topo
        atualizarCarrinhoHTML();
        fecharCarrinho();
    
        // Abre a aba do WhatsApp Web / App
        window.open(`https://wa.me/${numeroLoja}?text=${textoCodificado}`, '_blank');
    } catch (error) {
        console.error('Erro ao finalizar pedido', error);
        alert('Erro ao finalizar pedido. Tente novamente.');
    }
});


// ==========================================
// SALVAR / CARREGAR CARRINHO DO LOCALSTORAGE
// ==========================================

// Função para salvar no localStorage para não perder quando trocar de página
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(itensDoCarrinho));
}

// Carrega o carrinho do localStorage quando a página abre
function carregarCarrinho() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));

    if (carrinhoSalvo) {
        itensDoCarrinho = carrinhoSalvo;

        // Atualiza o contador e o HTML do carrinho
        document.getElementById('cart-counter').innerText = itensDoCarrinho.length;
        atualizarCarrinhoHTML();
    }

    // Se o usuário acabou de logar para finalizar um pedido, abre o carrinho automaticamente
    if (localStorage.getItem('openCart')) {
        localStorage.removeItem('openCart');
        abrirCarrinho();
    }
}

carregarCarrinho();