//© Zero - Código libre no comercial

// --------------------------------------------------
// Inicio por click
// --------------------------------------------------
let iniciado = false;

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.id = 'start-overlay';
  overlay.innerHTML = '<div>Click para iniciar mi vida 😍❤</div>';
   const ref = document.getElementById('dedication-text');
  if (ref) {
    const style = getComputedStyle(ref);
    overlay.style.fontFamily = style.fontFamily;
    overlay.style.fontWeight = style.fontWeight;
    overlay.style.letterSpacing = style.letterSpacing;
  }

  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(255,255,255,0.95)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.fontSize = '1.8em';
  overlay.style.cursor = 'pointer';
  overlay.style.zIndex = '9999';

  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    if (iniciado) return;
    iniciado = true;
    overlay.remove();
    iniciarProyecto(); // 👈 arranca TODO
  });
});

// --------------------------------------------------
// Proyecto completo
// --------------------------------------------------
function iniciarProyecto() {

  fetch('Img/file.svg')
    .then(res => res.text())
    .then(svgText => {
      const container = document.getElementById('tree-container');
      container.innerHTML = svgText;
      const svg = container.querySelector('svg');
      if (!svg) return;

      const allPaths = Array.from(svg.querySelectorAll('path'));
      allPaths.forEach(path => {
        path.style.stroke = '#222';
        path.style.strokeWidth = '2.5';
        path.style.fillOpacity = '0';

        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = 'none';
      });

      setTimeout(() => {
        allPaths.forEach(path => {
          path.style.transition =
            'stroke-dashoffset 2s cubic-bezier(.77,0,.18,1), fill-opacity 0.4s 1.6s';
          path.style.strokeDashoffset = 0;

          setTimeout(() => {
            path.style.fillOpacity = '1';
            path.style.stroke = '';
            path.style.strokeWidth = '';
          }, 1600);
        });

        const totalDuration = 2000;

        setTimeout(() => {
          svg.classList.add('move-and-scale');

          setTimeout(() => {
            showDedicationText();
            startFloatingObjects();
            showCountdown();
            playBackgroundMusic(); // 🎵 ahora sí permitido
          }, 1200);
        }, totalDuration);
      }, 50);

      const heartPaths = allPaths.filter(el => {
        const style = el.getAttribute('style') || '';
        return style.includes('#FC6F58') || style.includes('#C1321F');
      });

      heartPaths.forEach(path => {
        path.classList.add('animated-heart');
      });
    });
}

// --------------------------------------------------
// Utilidades URL
// --------------------------------------------------
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// --------------------------------------------------
// Texto dedicatoria
// --------------------------------------------------
function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = `Mi amor, mi vida, mi niña hermosa y preciosa, mi divina de mi corazón, mi kerucita:\n\nNo sabes lo emocionado que estoy de pasar esta primera Navidad juntos. Me llena de ilusión y me hace sentir el hombre más afortunado del mundo.\n\nGracias por regalarme este momento tan hermoso a tu lado.\n\nTe amo con todo mi ser. 🎄❤️`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');

  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// --------------------------------------------------
// Firma
// --------------------------------------------------
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');

  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : 'Con amor, Tu Kito❤️';
  signature.classList.add('visible');
}

// --------------------------------------------------
// Objetos flotantes
// --------------------------------------------------
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;

  function spawn() {
    const el = document.createElement('div');
    el.className = 'floating-petal';

    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `${100 + Math.random() * 10}%`;
    el.style.opacity = 0.7 + Math.random() * 0.3;

    container.appendChild(el);

    const duration = 2000 + Math.random() * 1500;
    const drift = (Math.random() - 0.5) * 60;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform =
        `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => el.remove(), duration + 2000);

    setTimeout(spawn, count++ < 32 ? 350 + Math.random() * 500 : 1200 + Math.random() * 1200);
  }

  spawn();
}

// --------------------------------------------------
// Cuenta regresiva
// --------------------------------------------------
function showCountdown() {
  const container = document.getElementById('countdown');

  let startDate = getURLParam('start')
    ? new Date(getURLParam('start') + 'T00:00:00')
    : new Date('2025-07-12T00:00:00');

  let eventDate = getURLParam('event')
    ? new Date(getURLParam('event') + 'T00:00:00')
    : new Date('2025-12-24T00:00:00');

  function update() {
    const now = new Date();
    let days = Math.floor((now - startDate) / 86400000);
    let diff = eventDate - now;

    let d = Math.max(0, Math.floor(diff / 86400000));
    let h = Math.max(0, Math.floor(diff / 3600000) % 24);
    let m = Math.max(0, Math.floor(diff / 60000) % 60);
    let s = Math.max(0, Math.floor(diff / 1000) % 60);

    container.innerHTML =
      `Llevamos juntos: <b>${days}</b> días<br>` +
      `Navidad Juntos: <b>${d}d ${h}h ${m}m ${s}s</b>`;

    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}

// --------------------------------------------------
// Música
// --------------------------------------------------
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  audio.volume = 0.7;
  audio.loop = true;
  audio.play();
}
