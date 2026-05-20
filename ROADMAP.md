# 🧶 Amigurumis da Vovó — Roadmap v2.0

> Documento vivo. Atualizar à medida que tarefas forem concluídas.  
> Última atualização: abril/2025

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

- [ ] Instalar Node.js (se ainda não tiver)
- [ ] Inicializar projeto Node com `npm init`
- [ ] Instalar dependências: `express`, `pg`, `dotenv`
- [ ] Criar arquivo `.env` com as variáveis de conexão (e adicionar ao `.gitignore`!)
- [ ] Instalar e configurar PostgreSQL localmente

### 🗄️ Banco de dados

- [ ] Criar banco de dados `amigurumis_db`
- [ ] Definir uma estratégia de versionamento do banco (`schema.sql`, migrations ou ambos)
- [ ] Criar tabela `products` com os campos adequados:
  - `id` (serial / primary key)
  - `name`
  - `description`
  - `price`
  - `image_url`
  - `is_active`
  - `created_at`
  - `updated_at`
- [ ] Popular a tabela com os produtos que estão no `products.json` atual
- [ ] Versionar a estrutura inicial do banco no repositório para facilitar recriação do ambiente

### 🔌 API REST

- [ ] Criar servidor Express básico (`server.js`)
- [ ] Criar rota `GET /products` — retorna todos os produtos
- [ ] Criar rota `GET /products/:id` — retorna um produto específico
- [ ] Testar as rotas com [Insomnia](https://insomnia.rest/) ou [Thunder Client](https://www.thunderclient.com/) (extensão VS Code)
- [ ] Definir um formato de resposta consistente para facilitar a evolução do front-end

### 🔗 Integração com o front-end

- [ ] Substituir a leitura do `products.json` pelo consumo da API de produtos
- [ ] Centralizar a URL base da API para facilitar ambiente local e futuro deploy
- [ ] Garantir que o comportamento visual do site permanece igual
- [ ] Tratar erros de rede de forma elegante (o que mostrar se a API falhar?)
- [ ] Validar manualmente o fluxo completo: API disponível, listagem carregada e fallback em caso de erro

---

## Fase 2 — Carrinho de compras + pedidos

> **Objetivo:** Permitir que o cliente monte um pedido antes de entrar em contato via WhatsApp — e registrar esse pedido no banco.

### Front-end

- [ ] Criar componente de carrinho em JS puro (boa oportunidade de praticar classes!)
- [ ] Botão "Adicionar ao carrinho" em cada produto
- [ ] Ícone de carrinho no header com contador de itens
- [ ] Painel lateral (ou modal) mostrando os itens e o total
- [ ] Definir o fluxo oficial de checkout: salvar o pedido no banco antes de redirecionar para o WhatsApp
- [ ] Botão "Finalizar pedido via WhatsApp" — gera mensagem automática com os itens e referência do pedido

### Back-end

- [ ] Criar tabela `orders` (`id`, `status`, `created_at`, `whatsapp_number`)
- [ ] Criar tabela `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`)
- [ ] Criar rota `POST /orders` — salva o pedido e seus itens
- [ ] Criar rota `GET /orders` — lista todos os pedidos (para o admin, na fase seguinte)
- [ ] Garantir que o total do pedido seja calculado com base nos valores persistidos no back-end
- [ ] Validar manualmente criação de pedido, persistência dos itens e geração da mensagem final do WhatsApp

---

## Fase 3 — Painel admin

> **Objetivo:** Interface para gerenciar produtos e visualizar pedidos sem precisar tocar no código ou no banco diretamente, já com acesso protegido.

### Autenticação mínima do admin

- [ ] Instalar `bcrypt` e `jsonwebtoken`
- [ ] Criar tabela `users` (simples: só email e senha hash)
- [ ] Criar rota `POST /auth/login` — valida credenciais e retorna JWT
- [ ] Proteger as rotas do admin com middleware de autenticação
- [ ] Criar tela de login simples para o painel

### Interface e operações

- [ ] Criar página `admin/index.html` separada
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

## Notas gerais

- Cada fase deve ser concluída e funcionando antes de partir para a próxima
- Criar uma branch por fase no Git (`fase-0-refatoracao`, `fase-1-banco`, etc.)
- Commitar com frequência — mensagens de commit descritivas fazem parte da prática
- Dúvidas e decisões tomadas durante o desenvolvimento podem ser anotadas aqui
