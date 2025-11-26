const botaoWhatsapp = document.querySelectorAll('.whatsapp');

botaoWhatsapp.forEach(botao => {
    botao.addEventListener('click', () => {        
        botao.href = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20de%20amigurumi.";
    })
});