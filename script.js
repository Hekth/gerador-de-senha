const inputRange = document.querySelector('#qtd-caracteres');
const spanQtdCaracteres = document.querySelector('.qtd-caracteres__valor');
const gerarSenhaBtn = document.querySelector('.gerar-senha-btn');
const senhaContainer = document.querySelector('.senha-container');
const senha = document.querySelector('.senha-container__senha');
const senhaMsg = document.querySelector('.senha-container__msg');
const btnConfig = document.querySelector('.btn-config');
const configuracoes = document.querySelector('.configuracoes');
const configBtns = document.querySelectorAll('.configuracoes__btn-config');
const configCampos = document.querySelectorAll('.configuracoes__container input');
const caracteresRestantes = document.querySelector('.caracteres-restantes');
const palavraEspecifica = document.querySelector('#palavra-especifica');

// const inputNumeros = document.querySelector('#numeros');
let estado = {
    palavra: '',
    numeros: true,
    letras: true,
    especiais: true
};

const caracteres = {
    letras: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','W','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','w','y','z'],
    numeros: ['0','1','2','3','4','5','6','7','8','9'],
    especiais: ['!','@','#','$','%','&','*','_','-','.',';','?']
};

palavraEspecifica.addEventListener('input', (e) => {
    const diferenca = (inputRange.value - 1) - e.target.value.length;
    if (diferenca >= 0) {
        caracteresRestantes.innerText = diferenca;
    }
})

/* funções do dialog */
btnConfig.addEventListener('click', () => configuracoes.showModal());

configBtns[0].addEventListener('click', () => {
    /* adicionando os valores do formulario ao estado */
    configCampos.forEach((campo) => {
        const valor = campo.hasAttribute('checked') ? campo.checked : campo.value;
        estado[campo.name] = valor;
    });

    if (validaCampos()) {
        configuracoes.close();
    }
    
});

configBtns[1].addEventListener('click', () => {
    configuracoes.close();
    estado = {
        palavra: '',
        numeros: true,
        letras: true,
        especiais: true
    }
});

/* mostrando o valor do input range na tela */
inputRange.addEventListener('change', () => {
    estado.palavra = '';
    console.log(estado);
    palavraEspecifica.value = '';
    // configCampos.forEach((campo) => {
    //     campo.hasAttribute('checked') ? campo.checked = true : campo.value = '';
    // });
});

inputRange.addEventListener('input', ({ target }) => {
    spanQtdCaracteres.innerText = target.value;
    caracteresRestantes.innerText = target.value - 1;
    palavraEspecifica.setAttribute('maxlength', target.value - 1);
});

gerarSenhaBtn.addEventListener('click', () => {
    senha.innerText = '';
    filtraSenhaAleatoria();
    mostraSenha();
    senhaMsg.innerHTML = `Clique na senha acima para copiá-la!&#x261D;`;
});

senha.addEventListener('click', () => {
    navigator.clipboard.writeText(senha.textContent);
    senhaMsg.innerHTML = `Senha copiada!&#x1F4BE;`;
});

/* gerando uma senha aleatoria com base no valor do input range */
function gerarSenhaAleatoria(caracteresFiltrados) {
    let senhaAleatoria = '';
    const tamanhoCaracteres = caracteresFiltrados.length;
    const qtdCaracteres = Number(inputRange.value);
    for (let i = 0; i < qtdCaracteres - estado.palavra.length; i++) {
        const numeroAleatorio = Math.floor(Math.random() * tamanhoCaracteres);
        senhaAleatoria += caracteresFiltrados[numeroAleatorio]
    }

    if (estado.palavra) {
        const numeroAleatorio = Math.floor(Math.random() * (senhaAleatoria.length + 1));
        const senhaAleatoriaArray = senhaAleatoria.split('');
        senhaAleatoriaArray.splice(numeroAleatorio, 0, estado.palavra)
        senhaAleatoria = senhaAleatoriaArray.join('');
    }

    senha.innerText = senhaAleatoria;
}   

function mostraSenha() {
    senhaContainer.style.display = 'block';
}

function filtraSenhaAleatoria() {
    let todosCaracteres = [];
    const filtros = Object.entries(estado).filter((e) => e[1]).map((element) => element[0]);
    filtros.forEach((e) => {
        if (e !== 'palavra') todosCaracteres = todosCaracteres.concat(caracteres[e]);
    });
    gerarSenhaAleatoria(todosCaracteres);
}

function validaCampos() {
    try {
        const valoresDoEstado = Object.values(estado);
        valoresDoEstado.shift();
        const validacao = valoresDoEstado.every((valor) => !valor);
        if (validacao) throw new Error('É preciso selecionar pelo menos UMA das opções.');
        return true;
    } catch (error) {
        return alert(error);
    }
}
