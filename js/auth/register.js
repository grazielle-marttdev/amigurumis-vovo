const registerValidator = new window.JustValidate('#register-form');

// Validação para campo de Nome
registerValidator  
    .addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Campo obrigatório'
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Mínimo de 3 caracteres'
        },
        {
            rule: 'maxLength',
            value: 100,
            errorMessage: 'Máximo de 100 caracteres'
        },
    ])
    
    // Validação para campo de E-mail
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
    
    // Validação para campo de Senha
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

        // 1. Pegar os valores que o usuário digitou nos campos do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // 2. Fazer a requisição POST para a rota de cadastro do nosso servidor
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // diz ao servidor que estamos enviando JSON
                },
                body: JSON.stringify({ name, email, password }) // converte os dados para JSON
            });

            // 3. Converter a resposta do servidor de JSON para um objeto javascript
            const result = await response.json();

            // 4. Verificar se o cadastro foi bem-sucedido
            if (result.success) {
                // Verifica se o usuário estava tentando finalizar um pedido
                const pendingCheckout = localStorage.getItem('pendingCheckout');

                if (pendingCheckout) { 
                    // Se estava finalizando um pedido, manda pro login com uma mensagem contextual
                    alert('Cadastro feito com sucesso! Agora faça login para finalizar seu pedido 🧶');
                } else {
                    alert('Cadastro feito com sucesso! Faça login para continuar.');
                }
                
                window.location.href = '../auth/login.html';
            } else {
                // O servidor retornou um erro (ex: email já existe)
                alert(result.error.message);
            }
            
        } catch (error) {
            // 5. Se deu erro de rede (servidor fora de ar, sem internet, etc.)
            alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
        }
    });