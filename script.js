const inputRange = document.querySelector('#qtd-caracteres');
const spanQtdCaracteres = document.querySelector('.qtd-caracteres__valor');
const gerarSenhaBtn = document.querySelector('.gerar-senha-btn');
const senhaContainer = document.querySelector('.senha-container');
const senha = document.querySelector('.senha-container__senha');
const senhaMsg = document.querySelector('.senha-container__msg');
const inputNumeros = document.querySelector('#numeros');
const inputEspeciais = document.querySelector('#caracteres-especiais');

let caracteres = 'abcdefghijklmnopqrstuvxywzABCDEFGHIJKLMNOPQRSTUVXYWZ0123456789!@#$%&*.?-_;';

/* mostrando o valor do input range na tela */
inputRange.addEventListener('input', ({ target }) => {
    spanQtdCaracteres.innerText = target.value
});

gerarSenhaBtn.addEventListener('click', () => {
    senha.innerText = '';
    filtraSenhaAleatoria();
    senhaMsg.innerHTML = `Clique na senha acima para copiá-la!&#x261D;`;
});

senha.addEventListener('click', () => {
    navigator.clipboard.writeText(senha.textContent);
    senhaMsg.innerHTML = `Senha copiada!&#x1F4BE;`;
});

/* gerando uma senha aleatoria com base no valor do input range */
function gerarSenhaAleatoria(caracteresFiltrados) {
    const tamanhoCaracteres = caracteresFiltrados.length;
    const qtdCaracteres = Number(inputRange.value);
    for (let i = 0; i < qtdCaracteres; i++) {
        const numeroAleatorio = Math.floor(Math.random() * tamanhoCaracteres);
        senha.innerText += caracteresFiltrados[numeroAleatorio]
    }
}

function mostraSenha() {
    senhaContainer.style.display = 'block';
}

function filtraSenhaAleatoria() {
    if (inputNumeros.checked && inputEspeciais.checked) {
        gerarSenhaAleatoria(caracteres);
        mostraSenha();
        return;
    }

    if (inputNumeros.checked) {
        const filtraCaracteres = caracteres.replace(/[!@#$%&*.?_;-]/g, '');
        gerarSenhaAleatoria(filtraCaracteres);
        mostraSenha();
        return;
    }

    if (inputEspeciais.checked) {
        const filtraCaracteres = caracteres.replace(/[0-9]/g, '');
        gerarSenhaAleatoria(filtraCaracteres);
        mostraSenha();
        return;
    }
    
    const filtraCaracteres = caracteres.replace(/[-!@#$%&*.?_;0-9]/g, '');
    gerarSenhaAleatoria(filtraCaracteres);
    mostraSenha();
    return;
}
