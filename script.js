const block = document.getElementById('block');
const setup = document.getElementById('setup');
const reward = document.getElementById('reward');
const coinSound = document.getElementById('coin-sound');
const contador = document.getElementById('contador');
const item = document.getElementById('item');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('btn-start');
const bgMusic = document.getElementById('bg-music');

const powerSound = new Audio('https://www.myinstants.com/media/sounds/super-mario-bros-power-up.mp3');

let musicStarted = false;
let count = 0;

/* 🎮 INICIO DEL JUEGO */
if (startBtn) {
    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';

        if (bgMusic) {
            bgMusic.volume = 0.15;
            bgMusic.play().catch(() => {});
        }
    });
}

/* 🎯 BLOQUE */
block.addEventListener('click', () => {
    if (count >= 10) return;

    // 💥 vibración
    document.body.style.transform = "translateY(-3px)";
    setTimeout(() => {
        document.body.style.transform = "translateY(0)";
    }, 80);

    // 🎵 iniciar música si no ha iniciado
    if (!musicStarted && bgMusic) {
        bgMusic.volume = 0.2;
        bgMusic.play().catch(() => {});
        musicStarted = true;
    }

    count++;
    contador.textContent = count;

    // 💥 animación bloque
    block.classList.add('bump');
    setTimeout(() => block.classList.remove('bump'), 150);

    // 🔊 sonido moneda
    coinSound.currentTime = 0;
    coinSound.play().catch(() => {});

    // 💰 moneda aleatoria
    const coin = document.createElement('div');
    coin.innerHTML = "💰";
    coin.style.position = "absolute";
    coin.style.left = Math.random() * 60 + "px";
    coin.style.top = "-20px";
    coin.style.animation = "floatUp 0.6s forwards";
    block.appendChild(coin);

    setTimeout(() => coin.remove(), 600);

    if (count === 10) revealPrize();
});

/* 🎁 RECOMPENSA */
function revealPrize() {
    block.style.backgroundColor = "#86592d";
    block.innerText = "";
    block.style.boxShadow = "none";

    // 🍄 mostrar item
    item.classList.remove('hidden');
    powerSound.play();

    setTimeout(() => {
        item.classList.add('hidden');

        setup.classList.add('hidden');
        block.classList.add('hidden');
        reward.classList.remove('hidden');
    }, 1200);
}

/* 🎉 BOTÓN FINAL (VERSIÓN PRO) */
document.getElementById('btn-confirm').addEventListener('click', () => {

    // 🎮 overlay
    const overlay = document.createElement('div');
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "#5C94FC";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.color = "white";
    overlay.style.fontFamily = "'Press Start 2P', cursive";
    overlay.style.textAlign = "center";
    overlay.style.zIndex = "999";

    overlay.innerHTML = `
        <h1 style="text-shadow:4px 4px black;">🎉 MISIÓN COMPLETADA 🎉</h1>
        <p>Jugador 2 desbloqueada 💛</p>
        <p id="loading-text" style="margin-top:20px; font-size:12px; opacity:0.8;">
            Conectando con jugador 2...
        </p>
    `;

    document.body.appendChild(overlay);

    // ✨ animación de puntitos
    let dots = 0;
    const text = document.getElementById('loading-text');

    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        text.textContent = "Conectando con jugador 2" + ".".repeat(dots);
    }, 500);

    // ⏳ redirección
    setTimeout(() => {
        clearInterval(interval);

        const mensaje = "¡Hola Mai! Acepto la invitación para ver Mario Bros 🍄⭐️";

        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = `https://api.whatsapp.com/send?phone=573178300244&text=${encodeURIComponent(mensaje)}`;
        } else {
            window.open(`https://web.whatsapp.com/send?phone=573178300244&text=${encodeURIComponent(mensaje)}`, '_blank');
        }

    }, 2500);
});