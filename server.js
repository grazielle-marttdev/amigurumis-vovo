// 1. IMPORTAÇÃO DOS MÓDULOS (DEPENDÊNCIAS)
// O Express é um framework que vai ajudar a gerenciar as rotas, requisições e respostas HTTP de forma simples.
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;
const JWT_EXPIRES_IN = '1h';

// O "Pool" do módulo "pg" permite gerenciar uma fila de conexões com o PostgreSQL
const { Pool } = require('pg');

// O dotenv carrega as variáveis de ambiente escritas lá no arquivo .env para o objeto process.env do Node.js
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            data: null,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Token de autenticação não fornecido ou inválido.'
            }
        });
    }

    const token = authorizationHeader.substring('Bearer '.length);

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = {
            id: decodedToken.sub,
            role: decodedToken.role
        };

        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: null,
            error: {
                code: 'INVALID_TOKEN',
                message: 'Token inválido ou expirado.'
            }
        });
    }
}

function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            data: null,
            error: {
                code: 'FORBIDDEN',
                message: 'Acesso permitido apenas para administradores.'
            }
        });
    }

    return next();
}

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não foi definido no .env');
}

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
        // Pegamos a categoria da URL (se existir)
        const category = req.query.category;

        let result; // variável para guardar o resultado do banco

        // Verificamos: o usuário passou alguma categoria?
        if (category) {
            // Se passou, filtramos usando o WHERE 
            result = await pool.query('SELECT * FROM products WHERE category = $1 ORDER BY name ASC', [category]);  
        } else {
            // Se não passou, mostramos todos (comportamento padrão)
            result = await pool.query('SELECT * FROM products ORDER BY name ASC');
        }

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


// Rota POST /auth/register: cadastra um novo usuário (customer)
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (
        typeof name !== 'string' ||
        !name.trim() || 
        typeof email !== 'string' ||
        !email.trim() ||
        typeof password !== 'string' ||
        password.length < 8
    ) {
        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Informe nome, email válido e uma senha de pelo menos 8 caracteres.'
            }  
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
        const passwordHash = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `insert into users (name, email, password_hash)
            values ($1, $2, $3)
            returning id, name, email, role, created_at`,
            [name.trim(), normalizedEmail, passwordHash]
        );

        return res.status(201).json({
            success: true,
            message: "Cadastro realizado com sucesso!",
            data: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                data: null,
                error: {
                    code: 'EMAIL_ALREADY_EXISTS',
                    message: 'Já existe uma conta com este email.'
                }
            });
        }

        console.error('Erro ao cadastrar usuário:', error);

        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Erro ao cadastrar usuário.'
            }
        });
    }
});

// Rota POST /auth/login: autentica um usuário e retorna um token JWT
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (
        typeof email !== 'string' ||
        !email.trim() ||
        typeof password !== 'string' ||
        !password
    ) {
        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Informe email e senha.'
            }
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
        const result = await pool.query(
            `SELECT id, name, email, password_hash, role, is_active
             FROM users
             WHERE email = $1`,
            [normalizedEmail]
        );

        const user = result.rows[0];

        if (!user || !user.is_active) {
            return res.status(401).json({
                success: false,
                data: null,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Email ou senha inválidos.'
                }
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                data: null,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Email ou senha inválidos.'
                }
            });
        }

        const token = jwt.sign(
            {
                sub: user.id,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso!',
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);

        return res.status(500).json({
            success: false,
            data: null,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Erro ao fazer login.'
            }
        });
    }
});

// Rota POST /orders: cria um novo pedido (precisa estar logado)
app.post('/orders', authenticateToken, async (req, res) => {
    // O "authenticateToken" já verificou o token e colocou o id do usuário em req.user.id
    const userId = req.user.id;
    const { items } = req.body;

    // Validação: items precisa ser um array com pelo menos 1 item
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            data: null,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'O pedido precisa ter pelo menos um item.'
            }
        });
    }

    // Usamos uma "transação do banco de dados"
    // Isso garante que: ou tudo salva, ou nada salva (evita pedidos sem itens)
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Cria o pedido na tabela orders
        const orderResult = await client.query(
            `INSERT INTO orders (user_id, status)
            VALUES ($1, 'pending')
            RETURNING id, status, created_at`,
            [userId]
        );

        const orderId = orderResult.rows[0].id;

        // Para cada item do carrinho, insere na tabela order_items
        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
                VALUES ($1, $2, $3, $4)`,
                [orderId, item.productId, item.quantity, item.unitPrice]
            );
        }
        
        // Se chegou até aqui sem erro, confirma tudo no banco
        await client.query('COMMIT');
    
        return res.status(201).json({
            success: true,
            message: 'Pedido criado com sucesso!',
            data: {
                orderId: orderId,
                status: 'pending',
                createdAt: orderResult.rows[0].created_at
            }
        });

    } catch (error) {
        // Se deu qualquer erro, desfaz tudo
        await client.query('ROLLBACK');
        console.error('Erro ao criar pedido:', error);

        return res.status(500).json({
            success: false, 
            data: null,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'Erro ao criar o pedido.'
            }
        });
        
    } finally {
        // Libera a conexão de volta pro pool (importante)
        client.release();
    }


})


// 5. INICIALIZAÇÃO DO SERVIDOR
// Definimos a porta que o servidor vai escutar. Primeiro busca se tem alguma configurada
// no arquivo .env (process.env.PORT) ou utiliza por padrão a porta 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}! 🚀`);
});