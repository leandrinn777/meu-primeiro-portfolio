// Digitação efeito
const titulo = document.querySelector('.hero h1');
const textoOriginal = titulo.textContent;
titulo.textContent = '';

let i = 0;
function digitar() {
  if (i < textoOriginal.length) {
    titulo.textContent += textoOriginal.charAt(i);
    i++;
    setTimeout(digitar, 100);
  }
}
digitar();

// Configuração do canvas para partículas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Atualiza canvas no resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Partículas
let particlesArray = [];
const colors = ['#360259', '#CAA9D9', '#A56DF2', '#3436afff'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  if (document.body.classList.contains('claro')) {
    ctx.fillStyle = '#fdfdfd';
  } else {
    ctx.fillStyle = '#101820';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Contador animado
const contador = document.getElementById('contador');
let projetos = 4;
let count = 0;

function animarContador() {
  if (count < projetos) {
    count++;
    contador.textContent = `Projetos realizados: ${count}`;
    setTimeout(animarContador, 300);
  }
}

// Só dispara quando a seção estiver visível
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador();
      observer.disconnect();
    }
  });
});
observer.observe(document.querySelector('.projetos'));

// Botão alternar tema com fade

const botaoModo = document.createElement('button');
botaoModo.textContent = '🌓 Alternar Tema';
botaoModo.style.position = 'fixed';
botaoModo.style.top = '20px';
botaoModo.style.right = '20px';
botaoModo.style.padding = '10px 20px';
botaoModo.style.background = '#A56DF2';
botaoModo.style.color = '#101820';
botaoModo.style.border = 'none';
botaoModo.style.cursor = 'pointer';
botaoModo.style.zIndex = '1000';
botaoModo.style.borderRadius = '4px';
botaoModo.style.fontWeight = '600';
document.body.appendChild(botaoModo);

// Overlay para o fade
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.backgroundColor = '#000'; // cor inicial para tema escuro
overlay.style.opacity = '0';
overlay.style.pointerEvents = 'none';
overlay.style.transition = 'opacity 0.5s ease';
overlay.style.zIndex = '9999';
document.body.appendChild(overlay);

let modoEscuro = true;

botaoModo.addEventListener('click', () => {
  // Define cor do overlay conforme tema atual (antes da troca)
  if (document.body.classList.contains('claro')) {
    overlay.style.backgroundColor = '#fff';
  } else {
    overlay.style.backgroundColor = '#000000ff';
  }

  // Fade in
  overlay.style.pointerEvents = 'auto';
  overlay.style.opacity = '1';

  setTimeout(() => {
    // Troca tema
    document.body.classList.toggle('claro');
    modoEscuro = !modoEscuro;
    botaoModo.textContent = modoEscuro ? '🌓 Alternar Tema' : '🌞 Alternar Tema';

    // Fade out
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.pointerEvents = 'none';
    }, 500);
  }, 500);
});

// Scroll suave para links internos (reforço)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetID);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
