// 1. IMPORTAÇÃO DOS MÓDULOS (DEPENDÊNCIAS)
// O Express é um framework que vai ajudar a gerenciar as rotas, requisições e respostas HTTP de forma simples.
const express = require('express');
const cors = require('cors');

// O "Pool" do módulo "pg" permite gerenciar uma fila de conexões com o PostgreSQL
const { Pool } = require('pg');

// O dotenv carrega as variáveis de ambiente escritas lá no arquivo .env para o objeto process.env do Node.js
require('dotenv').config();


// 2. INICIALIZAÇÃO DO EXPRESS
const app = express(); // aqui iniciamos nossa aplicação Express
app.use(cors()); // permite que o front acesse a API sem bloqueios do navegador

// Configura o Express para entender os dados enviados em formato JSON
app.use(express.json());


// 3. CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS
// Aqui, criamos uma nova instância do Pool configurada com as variáveis que estão no arquivo .env
const pool = new Pool({
    user: process.env.DB_USER,           // usuário do banco
    host: process.env.DB_HOST,           // onde o banco está rodando (normalmente localhost)
    database: process.env.DB_DATABASE,   // nome do banco: amigurumis_db
    password: process.env.DB_PASSWORD,   // senha do banco
    port: process.env.DB_PORT,           // porta do PostgreSQL (normalmente 5432)
})


// 4. CRIAÇÃO DAS ROTAS

// Rota GET /products: retorna a lista de todos os produtos ativos do banco
app.get('/products', async (req, res) => {
    try {
        // Executa uma consulta SQL no banco de dados
        // Ordenamos por "name" para a listagem vir sempre organizada
        const result = await pool.query('SELECT * FROM products ORDER BY name ASC');

        // Retorna o status 200 (Sucesso) e envia os dados (rows) em formato JSON.
        return res.status(200).json({
            success: true,
            message: "Produtos listados com sucesso!",
            data: result.rows
        });
    } catch (error) {
        // Se houver algum erro durante a consulta, capturamos e mostramos o erro no terminal do servidor...
        console.error('Erro ao buscar produtos:', error);
        
        //...e enviamos um status 500 (Erro Interno do Servidor) com uma mensagem em formato JSON
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro ao buscar produtos no banco de dados.",
                details: error.message
            }
        });
    }
});

// Rota GET /products/:id: retorna um produto específico pelo seu ID
// O ":id" na rota é um parâmetro dinâmico que o usuáiro informa na URL (ex: /products/3)
app.get('/products/:id', async (req, res) => {
    // Extraímos o ID que veio na URL
    const { id } = req.params;

    try {
        // Executamos a query SQL buscando o ID recebido
        // Usamos o formato com "$1" para proteger nossa API contra ataques de SQL Injection
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        // O result.rows é um array. Se não tiver nenhum item nele (comprimento 0), o produto não existe
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                data: null,
                error: {
                    code: "NOT_FOUND",
                    message: "Produto não encontrado."
                }
            });
        }

        // Se o produto existir, retornamos a primeira posição do array (o produto encontrado)
        return res.status(200).json({
            success: true,
            message: "Produto encontrado com sucesso!",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(`Erro ao buscar o produto de ID ${id}:`, error);
        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Erro ao buscar produtos no banco de dados.",
                details: error.message
            }
        });
    }
});


// 5. INICIALIZAÇÃO DO SERVIDOR
// Definimos a porta que o servidor vai escutar. Primeiro busca se tem alguma configurada
// no arquivo .env (process.env.PORT) ou utiliza por padrão a porta 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}! 🚀`);
});