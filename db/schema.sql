-- Esse schema basicamente armazena os comandos que você usou lá no seu banco de dados
-- Se um dia precisar relembrar ou mostrar para alguém os comandos que foram executados, você tem esse arquivo como seu aliado. 


-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN 
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Criar a tabela de produtos
CREATE TABLE IF NOT EXISTS products ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    alt TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar o trigger que chama a função de atualização ao editar a linha 
-- Usamos um DROP antes para evitar erro se rodar o script mais de uma vez
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- =============================
-- Popular a tabela com os produtos iniciais
-- =============================
INSERT INTO products (name, description, alt, price, image_url) VALUES
('Coelhinha Luna', 'Coelhinha delicada com orelinhas longas e roupinha rosada', 'Amigurumi de uma coelhinha branca com orelhas compridas e vestido rosa.', 45.00, 'assets/images/produto-coelhinha.jpeg'),
('Nossa Senhora Aparecida', 'Uma peça especial de devoção, com manto azul e detalhes dourados. Ideal para presentear ou decorar com fé e carinho', 'Amigurumi da Nossa Senhora Aparecida com manto azul bordado e coroa.', 35.00, 'assets/images/produto-nossa-senhora.jpeg'),
('Gatinho Sol', 'Gatinho laranja listrado com olhinhos verdes brilhantes.', 'Amigurumi de um gatinho laranja listrado sentado.', 50.00, 'assets/images/produto-gato.jpeg'),
('Raposinha Adormecida', 'Uma raposa serena, com olhos fechados e pelagem detalhada. Excelente para decoração e como companhia suave.', 'Amigurumi de uma raposa laranja e branca com olhos fechados.', 55.00, 'assets/images/produto-raposa.jpeg'),
('Dinossaurinho Verde', 'Um pequeno dinossauro em tom verde-musgo. Ideal para crianças curiosas e adultos que não perderam o encanto.', 'Amigurumi de um dinossauro verde com cristas amarelas nas costas.', 38.00, 'assets/images/produto-dinossauro.jpeg'),
('Pinguim Elegante', 'Com um cachecol vermelho e expressão charmosa.', 'Amigurumi de um pinguim preto e branco usando um cachecol vermelho.', 49.00, 'assets/images/produto-pinguim.jpeg'),
('Suculentinha Amigurumi', 'Perfeita para quem ama plantas, mas não quer regar nada.', 'Amigurumi de uma planta suculenta verde em um vasinho marrom.', 30.00, 'assets/images/produto-suculenta.jpeg'),
('Ursinho Mel', 'Ursinho fofo em tons de marrom e creme, perfeito para abraçar.', 'Amigurumi de um ursinho marrom claro com um laço no pescoço.', 55.00, 'assets/images/produto-ursinho.jpeg');