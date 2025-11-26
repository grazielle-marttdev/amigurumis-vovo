const botaoMenu = document.getElementById('menu-toggle-btn');
const iconeAbrir = document.querySelector('.fa-bars');
const iconeFechar = document.querySelector('.fa-xmark');

botaoMenu.addEventListener('click', () => {
    const mainNav = document.getElementById('main-nav');

    iconeAbrir.classList.toggle('hide');
    iconeFechar.classList.toggle('hide');

    if (iconeAbrir.classList.contains('hide')) {
        mainNav.classList.remove('hide');
    } else {
        mainNav.classList.add('hide');
    }
})