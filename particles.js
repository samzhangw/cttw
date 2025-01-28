// Particle Animation System
function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  const size = Math.random() * 5 + 1;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.top = '100vh';
  updateParticleColor(particle);
  
  const duration = Math.random() * 15 + 5;
  particle.style.animation = `float ${duration}s linear infinite`;
  
  return particle;
}

function updateParticleColor(particle) {
  const isDarkMode = document.body.classList.contains('dark-mode');
  if (isDarkMode) {
    particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
  } else {
    particle.style.backgroundColor = `rgba(0, 0, 0, ${Math.random() * 0.5 + 0.1})`;
  }
}

function updateParticlesColor() {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(updateParticleColor);
}

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    particlesContainer.appendChild(createParticle());
  }
}