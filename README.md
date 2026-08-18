# Amigurumis da Vovó

Landing page responsiva para divulgação e venda de amigurumis artesanais. O projeto nasceu inicialmente como um protótipo desenvolvido durante o Projeto Integrado Inovação da faculdade Anhanguera e, desde então, vem sendo expandido e refinado como parte do meu portfólio.

A aplicação é full-stack: possui catálogo de produtos com filtro por categoria, carrinho de compras com registro de pedidos no banco de dados, finalização via WhatsApp e autenticação de usuários com JWT.

## Visão Geral

- Catálogo de produtos carregado dinamicamente consumindo uma API REST
- Filtro por categoria no front-end integrado a query params na API
- Carrinho de compras com painel lateral e contador de itens no header
- Pedido salvo no banco antes de redirecionar ao WhatsApp (com itens e preços no momento da compra)
- Cadastro e login de clientes com autenticação via JWT
- Banco de dados relacional com quatro tabelas: `products`, `users`, `orders` e `order_items`
- Navegação responsiva com menu mobile
- Foco visível, contraste revisado e textos alternativos descritivos
- Estrutura pensada para evolução em fases, documentadas no roadmap

## Tecnologias Utilizadas

**Front-end:**
- `HTML5` para a estrutura da página
- `CSS3` organizado em arquivos base, utilitários, variáveis e componentes
- `JavaScript` modular, consumindo a API e gerenciando o carrinho com classes
- `JustValidate` para a validação de formulários no front-end
- `Font Awesome` para ícones da interface
- `Google Fonts` para tipografia

**Back-end e Banco de Dados:**
- `Node.js` com `Express` para a criação da API REST
- `PostgreSQL` como banco de dados relacional
- `pg` (node-postgres) para conectar a aplicação ao banco de dados
- `bcrypt` para hash seguro de senhas
- `jsonwebtoken` para autenticação via JWT

## Arquitetura

O projeto é full-stack, dividido de forma simples:

**Back-end:**
- `server.js` — Configura o servidor Express, gerencia a conexão com o banco e expõe as rotas da API
- `db/schema.sql` — Scripts SQL para criação das tabelas e população dos dados iniciais
- `.env` — (A ser criado por quem for rodar o projeto) Armazena as credenciais do banco e o segredo do JWT

**Front-end:**
- `index.html` — Estrutura principal da página
- `css/` — Variáveis, estilos base, resets e componentes modulares
- `js/main.js` — Requisição à API e renderização dos produtos
- `js/classes.js` — Encapsula a criação dos elementos de produto
- `js/cart.js` — Lógica completa do carrinho (classe `Cart`) e integração com a API de pedidos
- `js/menu.js` — Comportamento do menu mobile
- `js/auth/` — Lógica das telas de cadastro e login
- `auth/` — Páginas HTML de cadastro (`register.html`) e login (`login.html`)

## Como Executar Localmente

Para rodar o projeto na sua máquina, você precisará do **Node.js** e do **PostgreSQL** instalados.

### 1. Clone o repositório

```bash
git clone https://github.com/grazielle-marttdev/amigurumis-vovo.git
cd amigurumis-vovo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

O projeto usa PostgreSQL. Você precisará criar um banco de dados e executar o script que cria as tabelas.

**Passo a passo:**

1. Abra seu PostgreSQL (via **pgAdmin** ou via terminal com `psql`).

2. Crie um banco de dados (pode nomear como quiser — aqui usamos `amigurumis_db` como exemplo):
   ```sql
   CREATE DATABASE amigurumis_db;
   ```

3. Conecte-se ao banco recém-criado e execute o arquivo `db/schema.sql`.

   **Pelo terminal:**
   ```bash
   psql -U seu_usuario -d amigurumis_db -f db/schema.sql
   ```

   **Pelo pgAdmin:** Abra o banco criado, acesse o **Query Tool** e cole o conteúdo do arquivo `db/schema.sql`. Execute tudo de uma vez com `F5`.

   > Esse script cria as tabelas `products`, `users`, `orders` e `order_items`, e popula a tabela de produtos com os dados iniciais.

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_USER=seu_usuario_do_postgres
DB_HOST=localhost
DB_DATABASE=amigurumis_db
DB_PASSWORD=sua_senha_do_postgres
DB_PORT=5432

JWT_SECRET=uma_chave_secreta_longa_e_aleatoria
```

> **Dica:** Para gerar um `JWT_SECRET` seguro, rode o comando abaixo no terminal e copie o resultado:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 5. Inicie o servidor

```bash
node server.js
```

O servidor rodará em `http://localhost:3000`.

### 6. Execute o front-end

Com a API rodando, sirva os arquivos estáticos. Em um **novo terminal**, na raiz do projeto:

```bash
npx serve .
```

*(Ou use a extensão **Live Server** no VS Code.)*

Pronto! Acesse o endereço gerado e a aplicação estará funcionando, consumindo os dados do seu banco PostgreSQL.

## Rotas da API

| Método | Rota | Autenticação | Descrição |
|--------|------|:---:|-----------|
| `GET` | `/products` | — | Lista todos os produtos. Aceita `?category=` como filtro. |
| `GET` | `/products/:id` | — | Retorna um produto pelo ID. |
| `POST` | `/auth/register` | — | Cadastra um novo cliente. |
| `POST` | `/auth/login` | — | Autentica e retorna um token JWT. |
| `POST` | `/orders` | ✅ JWT | Cria um pedido com os itens do carrinho. |

## Estado Atual

O projeto está na **Fase 3 (em andamento)**, com foco em autenticação e painel administrativo. O que já está funcionando:

- ✅ Catálogo com categorias e disponibilidade
- ✅ Carrinho de compras com persistência de pedidos no banco
- ✅ Finalização de pedido via WhatsApp com mensagem automática
- ✅ Cadastro e login de clientes com JWT
- ✅ Middlewares de autenticação e autorização por perfil (admin / cliente)

Próximas etapas:

- Área do cliente com histórico de pedidos
- Painel administrativo (CRUD de produtos e gestão de pedidos)
- Preparação para deploy

O plano completo de evolução está em [ROADMAP.md](./ROADMAP.md).

## Uso de IA no Processo

A inteligência artificial tem sido usada como apoio prático durante a evolução do projeto, especialmente para:

- Revisar possibilidades de refatoração
- Identificar melhorias de semântica e acessibilidade
- Esclarecer decisões de estrutura e organização do código
- Auxiliar na modelagem do banco de dados e arquitetura da API

Esse apoio tem sido importante para tornar o desenvolvimento mais consciente e iterativo, ajudando a transformar o protótipo inicial em uma aplicação full-stack.

## Observações

- Parte do conteúdo visual e textual foi gerada com apoio de IA para fins de prototipação
- O back-end ainda roda localmente — deploy será abordado em uma fase futura

---

Projeto desenvolvido para portfólio 💻✨🧶
