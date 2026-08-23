'use strict';

(function initLoader() {
  const bar = document.getElementById('loaderBar');
  const status = document.getElementById('loaderStatus');
  const enterBtn = document.getElementById('loaderEnterBtn');
  const loader = document.getElementById('loader');

  const messages = [
    'Preparing the arena...',
    'Loading squads...',
    'Igniting spotlights...',
    'Setting up the league table...',
    'Ready to play...'
  ];

  let progress = 0;
  let msgIndex = 0;
  let animFrame;

  initLoaderCanvas();

  function tick() {
    progress += 0.4 + Math.random() * 0.6;
    if (progress > 100) progress = 100;

    bar.style.width = progress + '%';

    const mIdx = Math.floor((progress / 100) * messages.length);
    if (mIdx !== msgIndex && mIdx < messages.length) {
      msgIndex = mIdx;
      status.textContent = messages[msgIndex];
    }

    if (progress < 100) {
      animFrame = requestAnimationFrame(tick);
    } else {
      status.textContent = 'The arena is ready.';
      setTimeout(() => {
        enterBtn.style.display = 'block';
      }, 600);
    }
  }

  setTimeout(() => requestAnimationFrame(tick), 800);
})();

window.enterSite = function () {
  const loader = document.getElementById('loader');
  const site = document.getElementById('site');
  loader.classList.add('fade-out');
  site.style.opacity = '1';
  site.style.pointerEvents = 'auto';
  site.style.animation = 'fadeUp 0.8s ease forwards';
  setTimeout(() => { loader.style.display = 'none'; }, 900);
  document.body.style.overflow = 'auto';
};

document.body.style.overflow = 'hidden';

function initLoaderCanvas() {
  const canvas = document.getElementById('loaderCanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  const vsSource = `
    attribute vec4 aPos;
    void main() { gl_Position = aPos; }
  `;
  const fsSource = `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uRes;

    float spotlight(vec2 uv, vec2 origin, float angle, float spread, float falloff) {
      vec2 d = uv - origin;
      float a = atan(d.x, d.y);
      float da = abs(mod(a - angle + 3.14159, 6.28318) - 3.14159);
      float cone = smoothstep(spread, 0.0, da);
      float dist = length(d);
      return cone * (1.0 - smoothstep(0.0, falloff, dist));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - uRes * 0.5) / uRes.y;
      vec3 col = vec3(0.03, 0.0, 0.0);

      float t = uTime * 0.4;
      vec2 top = vec2(0.0, 0.6);
      col += vec3(0.9, 0.05, 0.08) * spotlight(uv, top + vec2(-0.3 + sin(t)*0.05, 0.0), 3.14159, 0.12, 1.2) * 0.6;
      col += vec3(0.9, 0.05, 0.08) * spotlight(uv, top + vec2(0.0, 0.0), 3.14159, 0.1, 1.2) * 0.7;
      col += vec3(0.9, 0.05, 0.08) * spotlight(uv, top + vec2(0.3 + cos(t)*0.04, 0.0), 3.14159, 0.12, 1.2) * 0.6;
      col += vec3(0.9, 0.05, 0.08) * spotlight(uv, top + vec2(-0.55, 0.0), 3.14159, 0.08, 1.0) * 0.4;
      col += vec3(0.9, 0.05, 0.08) * spotlight(uv, top + vec2(0.55, 0.0), 3.14159, 0.08, 1.0) * 0.4;

      float mist = smoothstep(0.1, -0.4, uv.y) * 0.15;
      col += vec3(0.8, 0.0, 0.05) * mist;

      float vig = 1.0 - dot(uv * 1.2, uv * 1.2);
      col *= max(vig, 0.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource));
  gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uRes = gl.getUniformLocation(prog, 'uRes');

  let start = Date.now();
  function render() {
    if (!document.getElementById('loader') || document.getElementById('loader').style.display === 'none') return;
    const t = (Date.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }
  render();
}

function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawSpotlights(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width;
    const cy = 0;
    const beams = [
      { x: cx * 0.1, angle: 0.3 + Math.sin(t * 0.3) * 0.02 },
      { x: cx * 0.25, angle: 0.15 + Math.sin(t * 0.25 + 1) * 0.015 },
      { x: cx * 0.5, angle: 0 + Math.sin(t * 0.2 + 2) * 0.01 },
      { x: cx * 0.75, angle: -0.15 + Math.sin(t * 0.28 + 3) * 0.015 },
      { x: cx * 0.9, angle: -0.3 + Math.sin(t * 0.32 + 4) * 0.02 },
    ];

    beams.forEach(b => {
      const grd = ctx.createLinearGradient(b.x, 0, b.x + Math.tan(b.angle) * canvas.height, canvas.height);
      grd.addColorStop(0, 'rgba(230,57,70,0.15)');
      grd.addColorStop(1, 'rgba(230,57,70,0)');

      ctx.beginPath();
      ctx.moveTo(b.x, 0);
      const spread = 0.06;
      ctx.lineTo(b.x + Math.tan(b.angle - spread) * canvas.height, canvas.height);
      ctx.lineTo(b.x + Math.tan(b.angle + spread) * canvas.height, canvas.height);
      ctx.closePath();
      ctx.fillStyle = grd;
      ctx.fill();
    });

    const groundGrd = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);
    groundGrd.addColorStop(0, 'rgba(230,57,70,0)');
    groundGrd.addColorStop(1, 'rgba(230,57,70,0.06)');
    ctx.fillStyle = groundGrd;
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
  }

  let t = 0;
  function loop() {
    t += 0.016;
    drawSpotlights(t);
    requestAnimationFrame(loop);
  }
  loop();
}

function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const particles = [];
  const N = 40;

  for (let i = 0; i < N; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      background: ${Math.random() > 0.5 ? '#e63946' : '#ff7700'};
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 0 4px currentColor;
    `;
    container.appendChild(el);

    const p = {
      el,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      vy: 0.02 + Math.random() * 0.05,
      vx: (Math.random() - 0.5) * 0.02,
      life: Math.random(),
      decay: 0.002 + Math.random() * 0.003,
    };
    particles.push(p);
    resetParticle(p);
  }

  function resetParticle(p) {
    p.x = Math.random() * 100;
    p.y = 80 + Math.random() * 20;
    p.life = Math.random() * 0.5;
    p.vy = 0.02 + Math.random() * 0.06;
    p.vx = (Math.random() - 0.5) * 0.025;
    p.decay = 0.002 + Math.random() * 0.002;
  }

  function animate() {
    particles.forEach(p => {
      p.y -= p.vy;
      p.x += p.vx;
      p.life += p.decay;

      if (p.life >= 1 || p.y < -5) {
        resetParticle(p);
      }

      const opacity = p.life < 0.3 ? p.life / 0.3 : 1 - (p.life - 0.3) / 0.7;
      p.el.style.opacity = Math.max(0, opacity * 0.7);
      p.el.style.left = p.x + '%';
      p.el.style.top = p.y + '%';
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function initTrophy() {
  const scene = document.getElementById('trophyScene');
  const trophy = document.getElementById('trophy3d');
  if (!scene || !trophy) return;

  let rotX = 5, rotY = 0;
  let targetX = 5, targetY = 0;
  let isDragging = false;
  let lastX = 0, lastY = 0;
  let isHovering = false;

  scene.addEventListener('mouseenter', () => {
    isHovering = true;
    trophy.style.animation = 'none';
  });
  scene.addEventListener('mouseleave', () => {
    isHovering = false;
    isDragging = false;
    targetX = 5;
    targetY = 0;
    setTimeout(() => {
      if (!isHovering) trophy.style.animation = 'trophyFloat 4s ease-in-out infinite';
    }, 800);
  });
  scene.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      const rect = scene.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetY = nx * 25;
      targetX = 5 - ny * 15;
    }
  });

  scene.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    scene.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    scene.style.cursor = 'grab';
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    targetY += dx * 0.5;
    targetX -= dy * 0.3;
    targetX = Math.max(-30, Math.min(30, targetX));
    lastX = e.clientX;
    lastY = e.clientY;
  });

  scene.addEventListener('touchstart', (e) => {
    isDragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    trophy.style.animation = 'none';
    e.preventDefault();
  }, { passive: false });
  scene.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    targetY += dx * 0.5;
    targetX -= dy * 0.3;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    e.preventDefault();
  }, { passive: false });
  scene.addEventListener('touchend', () => {
    isDragging = false;
    targetX = 5;
    targetY = 0;
    setTimeout(() => trophy.style.animation = 'trophyFloat 4s ease-in-out infinite', 800);
  });

  function animateTrophy() {
    rotX += (targetX - rotX) * 0.08;
    rotY += (targetY - rotY) * 0.08;
    trophy.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    requestAnimationFrame(animateTrophy);
  }
  animateTrophy();
}

function initCountdown() {
  const target = new Date('2026-07-15T09:00:00+05:30').getTime();
  const els = {
    d: document.getElementById('cdDays'),
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMins'),
    s: document.getElementById('cdSecs'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      if (els.d) els.d.textContent = '00';
      if (els.h) els.h.textContent = '00';
      if (els.m) els.m.textContent = '00';
      if (els.s) els.s.textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if (els.d) els.d.textContent = pad(days);
    if (els.h) els.h.textContent = pad(hours);
    if (els.m) els.m.textContent = pad(mins);
    if (els.s) els.s.textContent = pad(secs);
  }
  update();
  setInterval(update, 1000);
}

function initNav() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    const sections = ['home', 'about', 'tracks', 'schedule', 'teams', 'leaderboard', 'prizes', 'register'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!el || !link) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  hamburger && hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  navLinks && navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger && hamburger.querySelectorAll('span');
      if (spans) { spans[0].style.transform = ''; spans[1].style.opacity = ''; spans[2].style.transform = ''; }
    });
  });
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.analogy-card, .track-card, .schedule-item, .team-card, .lb-row, .prize-card, .special-card, .org-card, .section-header'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

function initTeamCards() {
  const grid = document.getElementById('teamsGrid');
  if (!grid) return;

  const teams = [
    { name: 'Udupi Unicorns', abbr: 'UU', track: 'Track A', rgb: '230, 57, 70' },
    { name: 'Manipal Mavericks', abbr: 'MM', track: 'Track B', rgb: '185, 28, 28' },
    { name: 'Mangalore Monarchs', abbr: 'MG', track: 'Track C', rgb: '127, 29, 29' },
    { name: 'Kundapur Knights', abbr: 'KK', track: 'Track A', rgb: '153, 27, 27' },
    { name: 'Coastal Crusaders', abbr: 'CC', track: 'Track B', rgb: '212, 175, 55' }, 
    { name: 'Karkala Kings', abbr: 'KR', track: 'Track C', rgb: '220, 38, 38' },
    { name: 'Brahmavar Blazers', abbr: 'BB', track: 'Track A', rgb: '200, 35, 51' },
    { name: 'Shirva Strikers', abbr: 'SS', track: 'Track B', rgb: '160, 16, 32' },
    { name: '? Your Squad', abbr: '??', track: 'Register Now!', rgb: '100, 100, 100' },
  ];

  teams.forEach((team, i) => {
    const card = document.createElement('div');
    card.className = 'squads-carousel-card';
    card.style.setProperty('--index', String(i));
    card.style.setProperty('--color-card', team.rgb);
    card.innerHTML = `
      <div class="squads-carousel-content">
        <div class="squad-logo-circle">${team.abbr}</div>
        <div class="squad-carousel-name">${team.name}</div>
        <div class="squad-carousel-track">${team.track}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const squadInput = document.getElementById('squadName');
  const leaderInput = document.getElementById('leaderName');
  const trackSelect = document.getElementById('trackSelect');

  const cardSquad = document.getElementById('cardSquadName');
  const cardLeader = document.getElementById('cardLeaderName');
  const cardTrack = document.getElementById('cardTrack');

  if (squadInput && cardSquad) {
    squadInput.addEventListener('input', (e) => {
      cardSquad.textContent = e.target.value.trim() || 'SQUAD NAME';
    });
  }

  if (leaderInput && cardLeader) {
    leaderInput.addEventListener('input', (e) => {
      cardLeader.textContent = e.target.value.trim() || 'TEAM LEADER';
    });
  }

  if (trackSelect && cardTrack) {
    trackSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      cardTrack.textContent = val ? `TRACK ${val}` : 'TRACK A';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✅ REGISTRATION RECEIVED!';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'SUBMIT REGISTRATION';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
      if (cardSquad) cardSquad.textContent = 'SQUAD NAME';
      if (cardLeader) cardLeader.textContent = 'TEAM LEADER';
      if (cardTrack) cardTrack.textContent = 'TRACK A';
    }, 4000);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

const siteObserver = new MutationObserver((mutations) => {
  mutations.forEach(m => {
    if (m.type === 'attributes' && m.attributeName === 'style') {
      const site = document.getElementById('site');
      if (site && site.style.opacity === '1') {
        siteObserver.disconnect();

        const vid = document.getElementById('heroBgVideo');
        if (vid) {
          vid.muted = true;
          vid.play().catch(() => {

            document.addEventListener('click', () => vid.play(), { once: true });
          });
        }

        initTrophy();
        initCountdown();
        initNav();
        initScrollReveal();
        initTeamCards();
        initForm();
        initSmoothScroll();
        initStarfieldVisibility();
      }
    }
  });
});

const siteEl = document.getElementById('site');
if (siteEl) siteObserver.observe(siteEl, { attributes: true });

initCountdown();

const supabaseUrl = 'https://bmbdkunspjrsysbtxejy.supabase.co';
const supabaseKey = 'sb_publishable_qv1Dg4bumL8xTDooUEGrWg_g8IfYGds'; 
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function registerSquad(squadData) {
  const { data, error } = await supabase
    .from('squads')
    .insert([squadData]);

  if (error) {
    console.error('Registration failed:', error);
  } else {
    console.log('Registration successful:', data);
  }
}

function initStarfieldVisibility() {
  const starsContainer = document.querySelector('.starfield-bg');
  const hero = document.getElementById('home');
  if (!starsContainer || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (!entry.isIntersecting) {
        starsContainer.classList.add('visible');
      } else {
        starsContainer.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);
}
