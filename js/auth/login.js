const loginValidator = new window.JustValidate('#login-form');

loginValidator
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Campo obrigatório'
        },
        {
            rule: 'email',
            errorMessage: 'Formato de e-mail inválido'
        },
    ])
    .addField('#password', [
        {
            rule: 'required',
            errorMessage: 'Campo obrigatório'
        },
        {
            rule: 'minLength',
            value: 8,
            errorMessage: 'A senha deve conter pelo menos 8 caracteres'
        },
        {
            rule: 'customRegexp',
            value: /[A-Z]/,
            errorMessage: 'A senha deve conter pelo menos uma letra maiúscula'
        },
        {
            rule: 'customRegexp',
            value: /[a-z]/,
            errorMessage: 'A senha deve conter pelo menos uma letra minúscula'
        },
        {
            rule: 'customRegexp',
            value: /[0-9]/,
            errorMessage: 'A senha deve conter pelo menos um número'
        },
        {
            rule: 'customRegexp',
            value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            errorMessage: 'A senha deve conter pelo menos um caractere especial (ex: !@#$%&*)'
        },
        {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'A senha deve conter no máximo 20 caracteres'
        },
        {
            validator: (value) => !/\s/.test(value),
            errorMessage: 'A senha não pode conter espaços'
        },
    ])


// Evento disparado quando todas as validações passam
.onSuccess(async (event) => {
    event.preventDefault();

    // 1. Pegar os valores dos campos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 2. Fazer a requisição POST para a rota de login
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // 3. Converter a resposta 
        const result = await response.json();

        // 4. Verificamos o resultado
        if (result.success) {
            // Verifica se o usuário que está logando é diferente do anterior
            const usuarioAnterior = JSON.parse(localStorage.getItem('user'));
            const usuarioNovo = result.data.user;

            if (usuarioAnterior && usuarioAnterior.id !== usuarioNovo.id) {
                // É uma conta diferente: limpa o carrinho da conta anterior
                localStorage.removeItem('carrinho');
            }

            // Salvar o token e os dados do usuário no localStorage
            // Assim o navegador "lembra" que o usuário está logado
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));

            // Verifica se o usuário estava tentando finalizar um pedido
            const pendingCheckout = localStorage.getItem('pendingCheckout');

            if (pendingCheckout) {
                // Remove o sinal do pedido pendente e sinaliza para abrir o carrinho
                localStorage.removeItem('pendingCheckout');
                localStorage.setItem('openCart', 'true');
                window.location.href = '../index.html';
            } else {
                // Login normal, vai para a página principal
                window.location.href = '../index.html';
            }

        } else {
            // Credenciais inválidas ou outro erro
            alert(result.error.message);
        }

    } catch (error) {
        console.error('Erro na requisição', error);
        alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
});
   
