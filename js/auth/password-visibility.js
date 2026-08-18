// Lógica para mostrar/esconder senha
const inputPassword = document.getElementById('password');
const displayPasswordIcon = document.querySelector('.fa-eye-slash');
const hidePasswordIcon = document.querySelector('.fa-eye');

displayPasswordIcon.addEventListener('click', () => {
    inputPassword.setAttribute('type', 'text');
    displayPasswordIcon.classList.add('hide');
    hidePasswordIcon.classList.remove('hide');
});

hidePasswordIcon.addEventListener('click', () => {
    inputPassword.setAttribute('type', 'password');
    hidePasswordIcon.classList.add('hide');
    displayPasswordIcon.classList.remove('hide');
});

