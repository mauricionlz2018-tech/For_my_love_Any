// ===== CONFIGURACIÓN INICIAL =====
const startDate = new Date('2024-06-06T00:00:00').getTime();
let quoteIndex = 0;
const quotes = 5;

// ===== SISTEMA DE FONDO DEGRADADO ANIMADO =====
function initGradientCanvas() {
    const canvas = document.getElementById('gradientCanvas');
    const ctx = canvas.getContext('2d');
    let animationId;
    let hue = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
        { h: 280, s: 70, l: 15 },    // Púrpura oscuro
        { h: 320, s: 80, l: 20 },    // Magenta oscuro
        { h: 240, s: 75, l: 15 },    // Azul oscuro
        { h: 200, s: 80, l: 20 },    // Cian oscuro
        { h: 0, s: 70, l: 15 }       // Rojo oscuro
    ];

    function drawGradient() {
        hue = (hue + 0.1) % 360;

        const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        // Crear un gradiente con múltiples colores que cambian
        const offset1 = (hue % 360) / 360;
        const offset2 = ((hue + 60) % 360) / 360;
        const offset3 = ((hue + 120) % 360) / 360;

        grd.addColorStop(0, `hsl(${(hue + 0) % 360}, 80%, 5%)`);
        grd.addColorStop(0.4, `hsl(${(hue + 60) % 360}, 70%, 8%)`);
        grd.addColorStop(0.7, `hsl(${(hue + 120) % 360}, 75%, 10%)`);
        grd.addColorStop(1, `hsl(${(hue + 180) % 360}, 80%, 5%)`);

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Agregar radiations sutiles
        const radialGrd = ctx.createRadialGradient(
            canvas.width * 0.3,
            canvas.height * 0.3,
            0,
            canvas.width * 0.5,
            canvas.height * 0.5,
            canvas.width
        );

        radialGrd.addColorStop(0, `hsla(${(hue + 180) % 360}, 90%, 20%, 0.15)`);
        radialGrd.addColorStop(1, `hsla(${(hue + 180) % 360}, 90%, 20%, 0)`);

        ctx.fillStyle = radialGrd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        animationId = requestAnimationFrame(drawGradient);
    }

    drawGradient();
}

// ===== SISTEMA DE ESTRELLAS =====
function initStars() {
    const container = document.getElementById('starsContainer');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;

        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = delay + 's';

        container.appendChild(star);
    }
}

// ===== SISTEMA DE COMETAS =====
function initComets() {
    const container = document.getElementById('cometsContainer');
    const cometCount = 8;

    function createComet() {
        const comet = document.createElement('div');
        comet.className = 'comet';

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        const angle = Math.random() * 45 + 45; // 45-90 grados
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 4;

        comet.style.left = x + 'px';
        comet.style.top = y + 'px';
        comet.style.setProperty('--angle', angle + 'deg');
        comet.style.animationDuration = duration + 's';
        comet.style.animationDelay = delay + 's';

        container.appendChild(comet);

        setTimeout(() => {
            comet.remove();
            if (Math.random() > 0.3) {
                createComet();
            }
        }, (duration + delay) * 1000);
    }

    for (let i = 0; i < cometCount; i++) {
        setTimeout(() => createComet(), Math.random() * 3000);
    }
}

// ===== CONTADOR DE TIEMPO =====
function updateCounter() {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Actualizar contador cada 100ms para movimiento suave
setInterval(updateCounter, 100);
updateCounter(); // Inicializar inmediatamente

// ===== CORAZONES FLOTANTES =====
function createFloatingHeart() {
    const container = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '♡';

    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + 50;

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    const colors = ['#ff1493', '#ff69b4', '#ffd700', '#00bfff', '#ff6b9d'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.textShadow = `0 0 10px ${heart.style.color}`;

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

// Crear corazones cada 2-3 segundos
setInterval(createFloatingHeart, Math.random() * 1000 + 2000);

// ===== HOJAS CAYENDO ROMÁNTICAS =====
function createFallingLeaves() {
    const leaves = ['🍂', '🍁', '💚', '🌿'];
    
    function createLeaf() {
        const container = document.querySelector('.cosmic-background');
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        
        const x = Math.random() * window.innerWidth;
        leaf.style.left = x + 'px';
        leaf.style.top = '-50px';
        
        const duration = Math.random() * 3 + 4;
        const delay = 0;
        
        leaf.style.animation = `fallingLeaf ${duration}s linear ${delay}s forwards`;
        leaf.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), duration * 1000);
    }
    
    // Crear hojas cada 2-4 segundos
    setInterval(() => {
        if (Math.random() > 0.5) {
            createLeaf();
        }
    }, Math.random() * 2000 + 2000);
}

// ===== PÉTALOS FLOTANTES ROMÁNTICOS =====
function createFloatingPetals() {
    const petals = ['🌸', '🌹', '💕', '✨'];
    
    function createPetal() {
        const container = document.querySelector('.cosmic-background');
        const petal = document.createElement('div');
        petal.className = 'floating-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        
        const x = Math.random() * window.innerWidth;
        petal.style.left = x + 'px';
        petal.style.top = window.innerHeight + 'px';
        
        const duration = Math.random() * 4 + 5;
        const delay = 0;
        
        petal.style.animation = `floatingPetal ${duration}s ease-in ${delay}s forwards`;
        petal.style.opacity = Math.random() * 0.6 + 0.4;
        
        container.appendChild(petal);
        
        setTimeout(() => petal.remove(), duration * 1000);
    }
    
    // Crear pétalos cada 1-3 segundos
    setInterval(() => {
        if (Math.random() > 0.6) {
            createPetal();
        }
    }, Math.random() * 2000 + 1000);
}

// ===== NAVEGACIÓN DE FRASES =====
function showQuote(index) {
    const quoteItems = document.querySelectorAll('.quote-item');
    
    quoteItems.forEach((item, i) => {
        item.classList.remove('active', 'prev-active');
        if (i === index) {
            item.classList.add('active');
        } else if (i < index) {
            item.classList.add('prev-active');
        }
    });

    // Actualizar indicador
    let indicator = '';
    for (let i = 0; i < quotes; i++) {
        indicator += i === index ? '●' : '○';
    }
    document.getElementById('quoteIndicator').textContent = indicator;
}

document.getElementById('nextQuote').addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes;
    showQuote(quoteIndex);
});

document.getElementById('prevQuote').addEventListener('click', () => {
    quoteIndex = (quoteIndex - 1 + quotes) % quotes;
    showQuote(quoteIndex);
});

// Cambiar frases automáticamente cada 8 segundos
setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes;
    showQuote(quoteIndex);
}, 8000);

// ===== EFECTOS AL PASAR EL MOUSE =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    // Efecto sutil en el fondo
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const distance = Math.sqrt(
            Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
        );
        if (distance < 0.5) {
            star.style.opacity = '1';
        }
    });
});

// ===== SCROLL SMOOTH Y EFECTOS =====
document.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.cosmic-background');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// ===== EFECTOS DE CARGA =====
window.addEventListener('load', () => {
    // Inicializar todos los sistemas
    initGradientCanvas();
    initStars();
    initComets();
    createFallingLeaves();
    createFloatingPetals();

    // Agregar clase de loaded para animar elementos
    document.body.classList.add('loaded');
});

// ===== INTERACTIVIDAD DE GALERÍA =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // Agregar efecto de clic
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===== EFECTOS DE TIPOGRAFÍA DINÁMICA =====
function createTypewriterEffect() {
    const title = document.querySelector('.beautiful-title');
    const subtitle = document.querySelector('.subtitle');
    
    // Efecto de brillo al cargar
    setTimeout(() => {
        title.style.animation = 'none';
        subtitle.style.animation = 'none';
    }, 2000);
}

createTypewriterEffect();

// ===== EFECTO ADICIONAL: Partículas de luz =====
function createLightParticles() {
    const canvas = document.getElementById('gradientCanvas');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = (Math.random() * 4 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(255, ${Math.random() * 150}, 200, ${Math.random() * 0.5})`;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.zIndex = '2';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatParticle ${Math.random() * 4 + 3}s ease-in-out infinite`;
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(255, 20, 147, ${Math.random() * 0.6})`;
        
        document.querySelector('.cosmic-background').appendChild(particle);
    }
}

createLightParticles();

// Agregar animación de partículas al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== MÚSICA DE FONDO INTERACTIVA (Opcional) =====
// Descomenta si quieres agregar música
/*
const audio = new Audio('https://example.com/music.mp3');
audio.loop = true;
audio.volume = 0.3;
document.addEventListener('click', () => {
    audio.play().catch(() => {});
});
*/

// ===== EASTER EGG =====
let clickCount = 0;
document.querySelector('.beautiful-title').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        alert('💝 Este sitio está dedicado a la persona más especial del mundo 💝\n\nAna Karen, eres mi razón de existir.\n\n♡ Te amo infinito ♡');
        clickCount = 0;
    }
});

// ===== MENSAJE DE CONSOLA =====
console.log('%c💝 Ana Karen, eres hermosa, especial y única 💝', 'color: #ff1493; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(255, 20, 147, 0.8);');
console.log('%cEste sitio web fue creado con todo el amor del mundo para ti', 'color: #ffd700; font-size: 14px; font-style: italic;');
console.log('%c"Eres la razón por la cual creo en la magia"', 'color: #00bfff; font-size: 12px;');
