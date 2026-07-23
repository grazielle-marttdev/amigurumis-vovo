# 🧶 Amigurumis da Vovó — Roadmap v3.0

> Documento vivo. Atualizar à medida que tarefas forem concluídas.  
> Última atualização: julho/2026

---

## Fase 0 — Arrumando a casa

> **Objetivo:** Consolidar a base atual do projeto antes de adicionar novas funcionalidades.  
> Foco em semântica, acessibilidade, clareza do código e documentação.

### ♻️ Refatoração do front-end atual

- [X] Refatorar o menu mobile para que a estrutura HTML e o comportamento em JavaScript sejam mais semânticos e fáceis de manter
- [X] Garantir que o estado do menu esteja centralizado em atributos e classes consistentes, sem depender apenas da troca visual de ícones
- [X] Revisar trechos de JS com responsabilidade ambígua e separar melhor o que é renderização, comportamento e integração com links externos
- [X] Identificar repetições ou acoplamentos desnecessários que possam virar funções ou módulos mais claros

### ♿ Acessibilidade (a11y)

> Referência principal: [WCAG 2.1 — Nível AA](https://www.w3.org/TR/WCAG21/)  
> Ferramenta de auditoria gratuita: [axe DevTools](https://www.deque.com/axe/) (extensão de navegador)

#### Navegação e menu

- [X] Garantir que o botão do menu tenha nome acessível e informe corretamente seu estado expandido/recolhido
- [X] Verificar se a navegação mobile funciona bem com teclado e leitores de tela
- [X] Revisar o comportamento de abertura e fechamento do menu para não depender apenas de elementos visuais

#### Semântica e estrutura

- [X] Revisar se todos os elementos interativos usam a tag correta (`<button>`, `<a>`, etc.)
- [X] Confirmar que a hierarquia de headings continua lógica e sem saltos desnecessários
- [x] Substituir containers genéricos por elementos semânticos quando isso melhorar a estrutura do documento

#### Links, foco e interação

- [X] Garantir que links importantes já existam com `href` válido no HTML, sem depender do clique para se tornarem funcionais
- [X] Verificar se todos os elementos interativos são utilizáveis via teclado (`Tab`, `Enter`, `Space`)
- [X] Garantir foco visível e ordem de navegação coerente em toda a página

#### Conteúdo visual

- [X] Revisar textos alternativos das imagens para manter descrições úteis e contextuais
- [X] Confirmar que imagens decorativas sejam ignoradas corretamente por tecnologias assistivas
- [X] Verificar contraste de cores e garantir que nenhuma informação seja comunicada apenas por cor

### 📄 Documentação

- [X] Atualizar o `README.md` para refletir o estado real do projeto
- [X] Corrigir instruções de execução para o comportamento real do front-end atual
- [X] Mencionar com mais precisão a arquitetura atual (HTML, CSS organizado por camadas/componentes e JavaScript modular)
- [X] Adicionar uma seção "Em desenvolvimento" apontando para este roadmap
- [X] Publicar este `ROADMAP.md` no repositório

---

## Fase 1 — Banco de dados

> **Objetivo:** Substituir o `products.json` por um banco PostgreSQL real, com uma API Node.js servindo os dados.

### 🛠️ Ambiente e configuração

- [X] Instalar Node.js (se ainda não tiver)
- [X] Inicializar projeto Node com `npm init`
- [X] Instalar dependências: `express`, `pg`, `dotenv`
- [X] Criar arquivo `.env` com as variáveis de conexão (e adicionar ao `.gitignore`!)
- [X] Instalar e configurar PostgreSQL localmente

### 🗄️ Banco de dados

- [X] Criar banco de dados `amigurumis_db`
- [X] Definir uma estratégia de versionamento do banco (`schema.sql`, migrations ou ambos)
- [X] Criar tabela `products` com os campos adequados:
  - `id` (serial / primary key)
  - `name`
  - `description`
  - `price`
  - `image_url`
  - `is_active`
  - `created_at`
  - `updated_at`
- [X] Popular a tabela com os produtos que estão no `products.json` atual
- [X] Versionar a estrutura inicial do banco no repositório para facilitar recriação do ambiente

### 🔌 API REST

- [X] Criar servidor Express básico (`server.js`)
- [X] Criar rota `GET /products` — retorna todos os produtos
- [X] Criar rota `GET /products/:id` — retorna um produto específico
- [X] Testar as rotas com [Insomnia](https://insomnia.rest/) ou [Thunder Client](https://www.thunderclient.com/) (extensão VS Code)
- [X] Definir um formato de resposta consistente para facilitar a evolução do front-end

### 🔗 Integração com o front-end

- [X] Substituir a leitura do `products.json` pelo consumo da API de produtos
- [X] Centralizar a URL base da API para facilitar ambiente local e futuro deploy
- [X] Garantir que o comportamento visual do site permanece igual
- [X] Tratar erros de rede de forma elegante (o que mostrar se a API falhar?)
- [X] Validar manualmente o fluxo completo: API disponível, listagem carregada e fallback em caso de erro

---

## Fase 2 — Catálogo aprimorado, carrinho de compras e pedidos

> **Objetivo:** Enriquecer o catálogo com categorias e disponibilidade, implementar o carrinho de compras e registrar pedidos no banco antes de redirecionar ao WhatsApp.

### 🏷️ Categorias e disponibilidade (banco + front-end)

- [X] Adicionar campo `category` na tabela `products` (ex: `amigurumi`, `chaveiro`, `fios_linhas`, `agulhas`, `acessorios`, `kit`)
- [X] Adicionar campo `availability` na tabela `products` (ex: `in_stock`, `on_demand`)
- [X] Atualizar `schema.sql` com os novos campos e dados iniciais
- [X] Exibir a categoria e o status de disponibilidade nos cards de produto
- [X] Implementar filtro por categoria no front-end (botões ou dropdown)
- [X] Atualizar rota `GET /products` para aceitar filtro por categoria (query param: `?category=amigurumi`)

### 🛒 Carrinho de compras (front-end)

- [ ] Criar componente de carrinho em JS puro (boa oportunidade de praticar classes!)
- [ ] Botão "Adicionar ao carrinho" em cada produto
- [ ] Ícone de carrinho no header com contador de itens
- [ ] Painel lateral (ou modal) mostrando os itens e o total
- [ ] Definir o fluxo oficial de checkout: salvar o pedido no banco antes de redirecionar para o WhatsApp
- [ ] Botão "Finalizar pedido via WhatsApp" — gera mensagem automática com os itens e referência do pedido

### 📦 Pedidos (back-end)

- [ ] Criar tabela `orders` (`id`, `status`, `created_at`, `whatsapp_number`)
- [ ] Criar tabela `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`)
- [ ] Criar rota `POST /orders` — salva o pedido e seus itens
- [ ] Criar rota `GET /orders` — lista todos os pedidos (para o admin, na fase seguinte)
- [ ] Garantir que o total do pedido seja calculado com base nos valores persistidos no back-end
- [ ] Validar manualmente criação de pedido, persistência dos itens e geração da mensagem final do WhatsApp

---

## Fase 3 — Autenticação e painel admin

> **Objetivo:** Implementar autenticação tanto para o admin (gerenciar loja) quanto para clientes (acompanhar pedidos), e criar o painel administrativo.

### 🔐 Autenticação (base compartilhada)

- [ ] Instalar `bcrypt` e `jsonwebtoken`
- [ ] Criar tabela `users` (`id`, `email`, `password_hash`, `name`, `role`, `created_at`)
  - `role`: `admin` ou `customer`
- [ ] Criar rota `POST /auth/register` — cadastro de clientes (com validação de email e senha segura)
- [ ] Criar rota `POST /auth/login` — valida credenciais e retorna JWT
- [ ] Criar middleware de autenticação (verificação de JWT)
- [ ] Criar middleware de autorização por role (admin vs. customer)

### 👤 Área do cliente (front-end)

- [ ] Criar tela de cadastro e login para clientes
- [ ] Exibir área logada no header (nome do usuário, link para "Minha Conta")
- [ ] Página "Minha Conta" com histórico de pedidos do cliente
- [ ] Criar rota `GET /orders/my` — retorna pedidos do cliente autenticado

### 🛠️ Painel admin

- [ ] Criar página `admin/index.html` separada
- [ ] Criar tela de login para o admin
- [ ] Proteger as rotas do admin com middleware de autorização (`role: admin`)
- [ ] Listagem de produtos com opções de editar e excluir
- [ ] Formulário para adicionar novo produto
- [ ] Listagem de pedidos recebidos com status
- [ ] Exibir feedback visual para ações de salvar, editar, excluir e atualizar status
- [ ] Tratar estados de carregamento, erro e vazio no painel
- [ ] Rotas da API:
  - `POST /products` — adiciona produto
  - `PUT /products/:id` — edita produto
  - `DELETE /products/:id` — remove produto
  - `PATCH /orders/:id/status` — atualiza status do pedido
- [ ] Validar manualmente o fluxo de login e o CRUD principal do painel

---

## Fase 4 — Segurança, revisão e preparo para deploy

> **Objetivo:** Consolidar a segurança do painel, revisar pontos críticos da aplicação e preparar a base para publicação futura.

- [ ] Revisar armazenamento e envio do token no front-end do admin
- [ ] Validar expiração, ausência e invalidez do token nas rotas protegidas
- [ ] Revisar permissões mínimas das rotas administrativas
- [ ] Padronizar tratamento de erros da API para facilitar manutenção e depuração
- [ ] Revisar variáveis de ambiente e configuração do projeto para ambiente local e futuro deploy
- [ ] Criar um checklist de validação final antes de publicar novas versões

---

## 🔮 Melhorias futuras

> Funcionalidades identificadas a partir de pesquisa de mercado e referências de lojas artesanais (Fofurumi, Amigu Online, Armarinho São José, Do Chão Artes). Não são prioridade imediata, mas ficam documentadas para não se perderem.

### 🔍 Busca e navegação

- [ ] Barra de pesquisa no header (buscar por nome/descrição do produto)
- [ ] Rota `GET /products?search=...` para busca no back-end

### ⭐ Prova social e confiança

- [ ] Seção de depoimentos/avaliações na landing page
- [ ] Sinais de confiança no footer (ícones de meios de pagamento aceitos, selo de segurança)
- [ ] Informações de parcelamento (ex: "parcele em até 3x sem juros" — mesmo que visual por enquanto)

### 📄 Conteúdo institucional

- [ ] Página ou seção de FAQ (perguntas frequentes sobre encomendas, prazos, materiais)
- [ ] Informações de frete e entrega (texto explicativo ou futura integração com Correios/Melhor Envio)
- [ ] Footer completo: formas de pagamento, contato, formas de envio e redes sociais

### 📸 Detalhes do produto

- [ ] Múltiplas fotos por produto (tabela `product_images` ou galeria simples)
- [ ] Informações de tamanho/medidas nos produtos (altura, material do fio)
- [ ] Página individual do produto com detalhes expandidos

### 🛍️ Variedade do catálogo

- [ ] Expandir para além de amigurumis: fios e linhas, agulhas, chaveiros, acessórios, kits
- [ ] Navegação visual por categorias na landing page (carrossel de categorias com ícones, estilo Armarinho São José)

### 📬 Engajamento com o cliente

- [ ] Notificações de produtos novos para clientes cadastrados (via email ou WhatsApp)
- [ ] Newsletter simples ou lista de interesses
- [ ] Opção "Quero ver novidades!" na área do cliente (inspirado na Fofurumi)

### 💳 Pagamento

- [ ] Exibição de opções de parcelamento por produto
- [ ] Futura integração com gateway de pagamento (Mercado Pago, Stripe, etc.)

---

## Notas gerais

- Cada fase deve ser concluída e funcionando antes de partir para a próxima
- Criar uma branch por fase no Git (`fase-0-refatoracao`, `fase-1-banco`, etc.)
- Commitar com frequência — mensagens de commit descritivas fazem parte da prática
- Dúvidas e decisões tomadas durante o desenvolvimento podem ser anotadas aqui