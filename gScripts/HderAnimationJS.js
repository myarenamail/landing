// Language data
const languages = [
  { code: "ar", name: "العربية", flag: "ps" },
  { code: "en", name: "English", flag: "us" },
  { code: "es", name: "Español", flag: "es" },
  { code: "de", name: "Deutsch", flag: "de" },
  { code: "fr", name: "Français", flag: "fr" },
  { code: "it", name: "Italiano", flag: "it" },
  { code: "tr", name: "Türkçe", flag: "tr" },
  { code: "ru", name: "Русский", flag: "ru" },
  { code: "pt", name: "Português", flag: "pt" },
  { code: "hi", name: "हिन्दी", flag: "in" },
  { code: "ro", name: "Română", flag: "ro" },
  { code: "ja", name: "日本語", flag: "jp" },
  { code: "ko", name: "한국어", flag: "kr" },
  { code: "he", name: "עברית", flag: "il" }
];

const listContainer = document.getElementById("languageList");

// Render the list
function renderLanguages() {
  listContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  languages.forEach(lang => {
    const li = document.createElement("li");
    li.setAttribute("role", "menuitem");
    li.innerHTML = `
      <a class="dropdown-item d-flex align-items-center" href="${CONFIG.BASE_URL}/${lang.code}/index.html">
        <img src="https://flagcdn.com/20x15/${lang.flag}.png" alt="${lang.name}" class="language-flag" loading="lazy">
      &nbsp;  ${lang.name} &nbsp;
      </a>
    `;
    fragment.appendChild(li);
  });

  listContainer.appendChild(fragment);
}

// Initial render
renderLanguages();
 















const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 60; // Number of dots
    const connectionDistance = 150; // Distance to draw lines
    const mouseDistance = 200; // Distance mouse affects particles
    
    // Resize function
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    // Mouse tracking
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity X (Slow)
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y (Slow)
            this.size = Math.random() * 2 + 1;
            // Gold and White colors
            this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(255, 255, 255, '; 
        }
    
        update() {
            this.x += this.vx;
            this.y += this.vy;
    
            // Mouse Repel Effect
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 3; // Push strength
                    const directionY = forceDirectionY * force * 3;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
    
            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
    
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.7)'; // Opacity
            ctx.fill();
        }
    }
    
    // Initialize
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
    
        // Update and Draw Particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
    
            // Connect Particles
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
    
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Fade out line as distance increases
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = 'rgba(212, 175, 55, ' + (opacity * 0.2) + ')'; // Gold lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    window.addEventListener('resize', init);
    init();
    animate();



