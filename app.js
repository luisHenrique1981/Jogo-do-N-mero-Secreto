let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

}

exibirMensagemInicial();

function verificarChute() {
    //vai pegar o valor da do input e comparar pra ver se é o mesmo do numero secreto
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavratentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O chute é maior que o número secreto');
        } else {
            exibirTextoNaTela('p', 'O chute é menor que o número secreto');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;

    //se a quantidade de elementos na lista for igual a 3, ele limpa a lista.
    if (quantidadeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    //verifica se o NumeroEscolhido existe(include) dentro da ListaDeNumerosSorteados.
    //Se existir ele gera um novo número aleatório
    //Se não, ele adiciona o numeroEscolhido a listaDeNumerosSorteados.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute= document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}