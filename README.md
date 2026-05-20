# Amigurumis da Vovó

Landing page responsiva para divulgação e venda de amigurumis artesanais. O projeto nasceu inicialmente como um protótipo desenvolvido durante o Projeto Integrado Inovação da faculdade Anhanguera e, desde então, vem sendo expandido e refinado como parte do meu portfólio.

O projeto apresenta um catálogo de produtos renderizado dinamicamente a partir de um arquivo JSON, seções institucionais e pontos de contato via WhatsApp. A base atual já passou por uma rodada de refino em semântica, acessibilidade e organização do front-end, e agora está sendo preparada para evoluir com API, banco de dados e painel administrativo.

## Visão Geral

- Catálogo de produtos carregado dinamicamente com JavaScript
- Navegação responsiva com menu mobile
- Botões de contato via WhatsApp
- Foco visível, contraste revisado e textos alternativos mais descritivos
- Estrutura pensada para evolução em fases, documentadas no roadmap

## Tecnologias Utilizadas

- `HTML5` para a estrutura da página
- `CSS3` organizado em arquivos base, utilitários, variáveis e componentes
- `JavaScript` modular no front-end, incluindo carregamento de dados e criação dinâmica dos cards
- `JSON` como fonte de dados temporária para os produtos
- `Font Awesome` para ícones da interface
- `Google Fonts` para tipografia

## Arquitetura Atual

O projeto segue uma organização simples de front-end estático:

- `index.html` concentra a estrutura principal da página
- `css/variables.css` define tokens visuais como cores e tipografia
- `css/base.css` e `css/utilities.css` concentram estilos globais
- `css/components.css` importa os estilos dos componentes da interface
- `js/main.js` carrega os produtos e renderiza os cards na página
- `js/classes.js` encapsula a criação dos elementos de produto, incluindo textos alternativos das imagens
- `js/menu.js` controla a navegação mobile com atributos de acessibilidade
- `assets/data/products.json` funciona como fonte de dados atual do catálogo

## Responsividade

O layout foi construído com abordagem mobile-first e ajustado com media queries para telas maiores. A estrutura visual prioriza a experiência em dispositivos móveis sem perder legibilidade e organização em desktop.

## Estrutura do Projeto

```text
assets/
|-- data/
|   `-- products.json
|-- images/
css/
|-- base.css
|-- components.css
|-- reset.css
|-- utilities.css
|-- variables.css
`-- components/
    |-- about.css
    |-- contact.css
    |-- footer.css
    |-- header.css
    |-- hero.css
    `-- products.css
js/
|-- classes.js
|-- main.js
`-- menu.js
index.html
ROADMAP.md
```

## Como Executar

Como o catálogo é carregado com `fetch()` a partir de `assets/data/products.json`, o projeto deve ser servido por um servidor local. Abrir o `index.html` diretamente no navegador pode falhar dependendo das restrições do ambiente.

Você pode usar qualquer servidor estático simples. Exemplos:

```bash
npx serve .
```

ou, se preferir a extensão Live Server no VS Code, basta iniciar o projeto por ela.

Depois, abra no navegador o endereço exibido pelo servidor local.

## Estado Atual

Neste momento, o projeto funciona como um front-end estático com dados locais, já com melhorias recentes de semântica, acessibilidade e contraste visual. As próximas melhorias incluem:

- migração do catálogo para API + PostgreSQL
- carrinho e registro de pedidos
- painel administrativo com autenticação

## Uso de IA no Processo

A inteligência artificial tem sido usada como apoio prático durante a evolução do projeto, especialmente para:

- revisar possibilidades de refatoração
- identificar melhorias de semântica e acessibilidade
- esclarecer decisões de estrutura e organização do código
- acelerar o processo de aprendizado e evolução técnica

Esse apoio tem sido importante para tornar o desenvolvimento mais consciente e iterativo, ajudando a transformar o protótipo inicial em uma base mais sólida.

## Em Desenvolvimento

O plano de evolução do projeto está documentado em [ROADMAP.md](./ROADMAP.md).

## Observações

- Parte do conteúdo visual e textual foi gerada com apoio de IA para fins de prototipação
- A IA também vem sendo utilizada como apoio técnico no processo de revisão e melhoria do projeto
- O projeto ainda está em fase de melhoria estrutural antes da expansão para back-end

---

Projeto desenvolvido para portfólio 💻✨☕
