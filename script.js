const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const appCard = document.querySelector('#timer');
const appImage = document.querySelector('.app__image');
const appTitle = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause')
const btComecar = document.querySelector('#start-pause span')
const btComecarImg = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('./sons/luna-rise-part-one.mp3')
const audioPause = new Audio ('./sons/pause.mp3')
const audioPlay = new Audio ('./sons/play.wav')


musica.loop = true
let tempoDecorridoemSegundos = 1500;
let intervalorId = null;

const temFoco = 1500;
const temCurto = 300;
const temLongo = 900;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}
)

focoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})
curtoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})     
longoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')


} )

function alterarContexto(contexto) {
    monstrarTempo();
    zerar();
    btComecar.textContent = 'Começar'
    btComecarImg.setAttribute('src', 'imagens/play_arrow.png');
    html.setAttribute('data-contexto', contexto)
    appImage.setAttribute('src', `./imagens/${contexto}.png`)
    buttons.forEach(function(contexto) {
        contexto.classList.remove('active')
    } )
    switch (contexto) {
        case "foco":
            appTitle.innerHTML = `Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            appTitle.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            appTitle.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}


const contagemRecresiva = () => {
    if(tempoDecorridoemSegundos <=0){
        zerar();
        alert('tempo finalizado!')
        btComecar.textContent = 'Começar'
        btComecarImg.setAttribute('src', './imagens/play_arrow.png');
        tempoDecorridoemSegundos = 5;
        return
    }
    tempoDecorridoemSegundos -= 1
    monstrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervalorId){
        zerar()
        audioPause.play();
        btComecar.textContent = 'Continuar'
        btComecarImg.setAttribute('src', './imagens/play_arrow.png');
        return
    }
    audioPlay.play();
    intervalorId = setInterval(contagemRecresiva, 1000)
    btComecar.textContent = 'Pausar';
    btComecarImg.setAttribute('src', './imagens/pause.png');

}

function zerar(){
    clearInterval(intervalorId)
    intervalorId = null
}

function monstrarTempo(){
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado =  tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `
        ${tempoFormatado}
    `
}
monstrarTempo();