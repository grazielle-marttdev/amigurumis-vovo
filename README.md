# Amigurumis da Vovó

Landing page responsiva para divulgação e venda de amigurumis artesanais. O projeto nasceu inicialmente como um protótipo desenvolvido durante o Projeto Integrado Inovação da faculdade Anhanguera e, desde então, vem sendo expandido e refinado como parte do meu portfólio.

O projeto apresenta um catálogo de produtos renderizado dinamicamente consumindo uma API própria em Node.js integrada a um banco de dados PostgreSQL. Possui também seções institucionais e pontos de contato via WhatsApp. 

## Visão Geral

- Catálogo de produtos carregado dinamicamente consumindo uma API REST
- Banco de dados relacional para gerenciamento dos produtos
- Navegação responsiva com menu mobile
- Botões de contato via WhatsApp
- Foco visível, contraste revisado e textos alternativos descritivos
- Estrutura pensada para evolução em fases, documentadas no roadmap

## Tecnologias Utilizadas

**Front-end:**
- `HTML5` para a estrutura da página
- `CSS3` organizado em arquivos base, utilitários, variáveis e componentes
- `JavaScript` modular, carregando dados da API e renderizando cards
- `Font Awesome` para ícones da interface
- `Google Fonts` para tipografia

**Back-end e Banco de Dados:**
- `Node.js` com `Express` para a criação da API REST
- `PostgreSQL` como banco de dados relacional
- `pg` (node-postgres) para conectar a aplicação ao banco de dados

## Arquitetura Atual

O projeto agora é full-stack, dividido de forma simples:

**Back-end:**
- `server.js`: Configura o servidor Express, gerencia a conexão com o banco e expõe as rotas da API (ex: `/products`)
- `db/schema.sql`: Contém os scripts SQL para criação da tabela de produtos e os dados iniciais
- `.env`: (A ser criado pelo usuário) Gerencia as credenciais do banco de dados

**Front-end:**
- `index.html`: Concentra a estrutura principal da página
- `css/`: Diretório com variáveis, estilos base, resets e componentes modulares
- `js/main.js`: Faz a requisição (`fetch`) para a API local e renderiza os produtos
- `js/classes.js`: Encapsula a criação dos elementos de produto

## Como Executar Localmente

Para rodar o projeto completo na sua máquina, você precisará do **Node.js** e do **PostgreSQL** instalados.

### 1. Configurando o Banco de Dados

1. Abra seu PostgreSQL (via pgAdmin ou terminal) e crie um banco de dados chamado `amigurumis_db` (ou o nome que preferir).
2. Execute o conteúdo do arquivo `db/schema.sql` no seu banco de dados para criar a tabela `products` e popular com os amigurumis iniciais.

### 2. Configurando o Back-end (API)

1. No terminal, acesse a pasta raiz do projeto e instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo chamado `.env` na raiz do projeto, baseado nas suas credenciais do banco de dados:
   ```env
   DB_USER=seu_usuario_do_postgres
   DB_HOST=localhost
   DB_DATABASE=amigurumis_db
   DB_PASSWORD=sua_senha_do_postgres
   DB_PORT=5432
   ```
3. Inicie o servidor:
   ```bash
   node server.js
   ```
   *O servidor rodará na porta 3000 (`http://localhost:3000`).*

### 3. Executando o Front-end

Com a API rodando, você precisa servir os arquivos estáticos do front-end. Em um **novo terminal** (na raiz do projeto), você pode rodar:
```bash
npx serve .
```
*(Ou, se preferir, abra o projeto via extensão **Live Server** no VS Code).*

Pronto! Acesse o endereço gerado pelo servidor do front-end e veja a aplicação funcionando e consumindo os dados do seu banco PostgreSQL.

## Estado Atual

O projeto deu o seu primeiro passo no back-end, migrando os dados locais (JSON) para uma API Node.js conectada ao PostgreSQL. As próximas melhorias planejam a expansão dessa estrutura:

- Carrinho e registro de pedidos
- Painel administrativo com autenticação (CRUD completo)

## Uso de IA no Processo

A inteligência artificial tem sido usada como apoio prático durante a evolução do projeto, especialmente para:

- Revisar possibilidades de refatoração
- Identificar melhorias de semântica e acessibilidade
- Esclarecer decisões de estrutura e organização do código
- Auxiliar na modelagem do banco de dados e arquitetura da API

Esse apoio tem sido importante para tornar o desenvolvimento mais consciente e iterativo, ajudando a transformar o protótipo inicial em uma aplicação full-stack sólida.

## Em Desenvolvimento

O plano de evolução do projeto está documentado em [ROADMAP.md](./ROADMAP.md).

## Observações

- Parte do conteúdo visual e textual foi gerada com apoio de IA para fins de prototipação
- A IA também vem sendo utilizada como apoio técnico no processo de revisão e melhoria do projeto

---

Projeto desenvolvido para portfólio 💻✨☕
