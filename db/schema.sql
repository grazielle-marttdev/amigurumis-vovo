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


update products
set description = 'Uma companheira delicada e cheia de ternura! Feita com fios super macios em tons de branco e rosa bebê, ela possui orelhinhas longas charmosas, bochechas rosadas e um olhar doce. Perfeita para decorar o quartinho do bebê, presentear em datas especiais ou ser a nova melhor amiga de quem você ama.'
where id = 1;

update products
set description = 'Um símbolo de fé, proteção e amor tecido à mão. Nossa Senhora Aparecida em amigurumi traz um belíssimo manto azul, delicadamente adornado com detalhes e coroa em fio dourado. Com as mãozinhas em prece e uma expressão serena, é uma peça muito especial, ideal para presentear, decorar seu cantinho de oração ou demonstrar carinho a quem ama.'
where id = 2;

update products
set description = 'O Gatinho Sol chegou para iluminar e alegrar o seu dia! Com sua pelagem listrada que lembra um tigrinho, olhinhos verdes expressivos e um focinho muito fofo. Um amigurumi perfeito para os apaixonados por felinos, trazendo aquele aconchego e charme todo especial para a decoração ou para as brincadeiras.'
where id = 3;

update products
set description = 'Uma raposinha dorminhoca feita com muito carinho! Com uma pelagem alaranjada, detalhes em branco e marrom, e uma carinha serena de quem está tirando uma soneca gostosa. Essa peça é perfeita para decorar ambientes infantis, nichos ou ser a companhia ideal para quem ama este animalzinho.'
where id = 4;

update products
set description = 'Esse pequeno e simpático Dinossarinho Verde é a prova de que eles são adoráveis! Com sua crista detalhada nas costas, bochechinhas coradas e um tamanho perfeito para abraçar, ele é o presente ideal para pequenos aventureiros, crianças curiosas e também para adultos que não perderam o encanto por eles.'
where id = 5;

update products
set description = 'Este Pinguim Elegante está pronto para espalhar fofura por aí! Com seu cachecol vermelho super charmoso e bochechas coradinhas, ele é o companheiro perfeito para todas as estações. Uma peça encantadora que vai trazer muita alegria para a decoração ou se tornar um amigo inseparável de alguém.'
where id = 6;

update products
set description = 'A plantinha perfeita que nunca vai precisar de água! Nossa Suculentinha em amigurumi traz um toque de natureza e aconchego para qualquer cantinho. Feita com um vasinho charmoso na cor terracota e folhas verdes ricas em detalhes, é uma excelente opção para decorar mesas de trabalho, prateleiras ou presentear de um jeito criativo quem ama plantas.'
where id = 7;

update products
set description = 'O clássico ursinho que todo mundo ama! Feito em tons acolhedores de marrom e creme, o Ursinho Mel tem o tamanho perfeito para os abraços mais apertados. Com seu focinho bordado super simpático e orelhinhas fofas, ele é um presente inesquecível para chás de bebê, aniversários ou simplesmente para demonstrar carinho.'
where id = 8;