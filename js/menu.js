const mainNav = document.getElementById('main-nav');
const btnMenuToggle = document.getElementById('menu-toggle-btn');
const openIcon = document.querySelector('.fa-bars');
const closeIcon = document.querySelector('.fa-xmark');

function openMenu() {
    mainNav.classList.remove('hide');
    openIcon.classList.add('hide');
    closeIcon.classList.remove('hide');
    btnMenuToggle.setAttribute('aria-expanded', 'true');
    btnMenuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
}

function closeMenu() {
    mainNav.classList.add('hide');
    openIcon.classList.remove('hide');
    closeIcon.classList.add('hide');
    btnMenuToggle.setAttribute('aria-expanded', 'false');
    btnMenuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
}

function toggleMenu() {
    // Verifica o estado atual do menu usando o atributo aria-expanded
    const isExpanded = btnMenuToggle.getAttribute('aria-expanded') === 'true';
    isExpanded ? closeMenu() : openMenu();
}

// Adiciona o evento de clique ao botão de toggle 
// As funções de abrir e fechar serão chamadas dependendo do estado atual do menu
btnMenuToggle.addEventListener('click', toggleMenu);

// Fecha o menu quando uma das opções de navegação for clicada
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fecha o menu quando a tecla Escape (Esc) for pressionada
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && btnMenuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
    }
})

