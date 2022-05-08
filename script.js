// alert("We're Under Attack!");
// alert(" Stop the Alien Invasion!!");

const screens = document.querySelectorAll('.screen');

const choose_alien_btns = document.querySelectorAll('.choose-alien-btn');

const start_btn = document.getElementById('start-btn');

const game_container = document.getElementById('game-container');

const timeEl = document.getElementById('time');

const scoreEl = document.getElementById('score');

const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selected_alien = {};

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_alien_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_alien = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createAlien, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}


function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}


function createAlien() {
    const alien = document.createElement('div')
    alien.classList.add('alien')
    const { x, y } = getRandomLocation()
    alien.style.top = `${x}px`
    alien.style.left = `${y}px`
    alien.innerHTML = `<img src="${selected_alien.src}" alt="${selected_alien.alt}" style="transform: rotate(${Math.random() * 360}deg) "/>`

    alien.addEventListener('click', blastAlien)

    game_container.appendChild(alien)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (width - 200) + 100
    return { x, y }

}

function blastAlien() {
    increaseScore()
    this.classList.add('blasted')
    setTimeout(() => this.remove(), 500)
    addAliens()
}

function addAliens() {
    setTimeout(createAlien, 1000)
    setTimeout(createAlien, 1500)
}



function increaseScore() {
    score++
    if (score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}