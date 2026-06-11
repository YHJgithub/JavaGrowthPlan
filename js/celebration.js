const VictoryConfetti = (function () {
  let canvas, ctx, particles, animId, running = false;
  let onResize = null;
  let intensity = 1;

  const COLORS = ['#378ADD', '#3ecf8e', '#7f77dd', '#ffd60a', '#ff9f0a', '#ff6b6b', '#bf5af2', '#ffffff'];

  function particleCount() {
    const area = window.innerWidth * window.innerHeight;
    const base = Math.min(140, Math.max(36, Math.floor(area / 10000)));
    return Math.max(18, Math.floor(base * intensity));
  }

  function createParticle() {
    const w = canvas.width;
    const h = canvas.height;
    return {
      x: Math.random() * w,
      y: -(Math.random() * h * 0.4 + 10),
      w: 5 + Math.random() * 9,
      h: 3 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2.5 + Math.random() * 5,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10,
      opacity: 0.65 + Math.random() * 0.35,
    };
  }

  function resize() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function tick() {
    if (!running || !ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.vx *= 0.999;
      p.rot += p.vr;

      if (p.y > h + 24 || p.x < -30 || p.x > w + 30) {
        Object.assign(p, createParticle());
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    animId = requestAnimationFrame(tick);
  }

  function start(canvasEl, options = {}) {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    intensity = options.intensity === 'light' ? 0.5 : 1;
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    resize();
    particles = Array.from({ length: particleCount() }, createParticle);
    running = true;
    onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });
    tick();
  }

  function stop() {
    running = false;
    intensity = 1;
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (onResize) {
      window.removeEventListener('resize', onResize);
      onResize = null;
    }
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    canvas = null;
    ctx = null;
    particles = null;
  }

  return { start, stop };
})();

const CelebrationAudio = (function () {
  let ctx = null;
  let master = null;
  let fadeTimer = null;

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.75;
      master.connect(ctx.destination);
    }
    return ctx;
  }

  function prepareSync() {
    const c = getCtx();
    if (c && c.state === 'suspended') c.resume();
  }

  async function prepare() {
    const c = getCtx();
    if (c && c.state === 'suspended') await c.resume();
  }

  function tone(freq, start, dur, type, vol) {
    const c = getCtx();
    if (!c || !master) return;
    const t = c.currentTime + start;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.018);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.04);
  }

  function chord(notes, start, dur, vol) {
    notes.forEach((f) => tone(f, start, dur, 'triangle', vol));
  }

  function stop(immediate) {
    if (fadeTimer) {
      clearTimeout(fadeTimer);
      fadeTimer = null;
    }
    const c = getCtx();
    if (!c || !master) return;
    if (immediate) {
      master.gain.cancelScheduledValues(c.currentTime);
      master.gain.setValueAtTime(0.75, c.currentTime);
      return;
    }
    master.gain.cancelScheduledValues(c.currentTime);
    master.gain.setValueAtTime(master.gain.value, c.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.35);
    fadeTimer = setTimeout(() => {
      if (master && ctx) master.gain.setValueAtTime(0.75, ctx.currentTime);
      fadeTimer = null;
    }, 400);
  }

  return { getCtx, prepareSync, prepare, tone, chord, stop };
})();

const VictoryMusic = (function () {
  const N = {
    C4: 261.63, E4: 329.63, G4: 392.0, A4: 440.0,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, C6: 1046.5,
    G3: 196.0, B3: 246.94, C3: 130.81,
  };

  function play(delaySec = 0) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    CelebrationAudio.prepareSync();
    CelebrationAudio.stop(true);
    const c = CelebrationAudio.getCtx();
    if (!c) return;

    const o = delaySec;
    const melody = [
      [N.G4, 0, 0.11, 'square', 0.18],
      [N.C5, 0.11, 0.11, 'square', 0.18],
      [N.E5, 0.22, 0.11, 'square', 0.18],
      [N.G5, 0.33, 0.32, 'square', 0.2],
      [N.F5, 0.68, 0.1, 'square', 0.16],
      [N.E5, 0.78, 0.1, 'square', 0.16],
      [N.D5, 0.88, 0.1, 'square', 0.16],
      [N.C5, 0.98, 0.22, 'square', 0.18],
      [N.E5, 1.24, 0.1, 'square', 0.18],
      [N.G5, 1.34, 0.1, 'square', 0.19],
      [N.C6, 1.44, 0.55, 'square', 0.2],
    ];

    melody.forEach(([f, s, d, ty, v]) => CelebrationAudio.tone(f, s + o, d, ty, v));

    CelebrationAudio.chord([N.C3, N.G3, N.C4, N.E4], o, 0.62, 0.14);
    CelebrationAudio.chord([N.G3, N.B3, N.D5, N.G4], o + 0.62, 0.58, 0.12);
    CelebrationAudio.chord([N.C3, N.C4, N.E4, N.G4], o + 1.22, 0.78, 0.14);

    [N.C6, N.E5, N.G5].forEach((f, i) => {
      CelebrationAudio.tone(f, o + 1.44 + i * 0.06, 0.35, 'sine', 0.09);
    });
  }

  return {
    prepare: CelebrationAudio.prepare,
    prepareSync: CelebrationAudio.prepareSync,
    play,
    stop: CelebrationAudio.stop,
  };
})();

const SectionMusic = (function () {
  const N = {
    G4: 392.0, B4: 493.88, D5: 587.33, G5: 783.99,
    G3: 196.0, B3: 246.94, D4: 293.66,
  };

  function play(delaySec = 0) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    CelebrationAudio.prepareSync();
    CelebrationAudio.stop(true);
    if (!CelebrationAudio.getCtx()) return;

    const o = delaySec;
    const melody = [
      [N.G4, 0, 0.12, 'square', 0.14],
      [N.B4, 0.12, 0.12, 'square', 0.14],
      [N.D5, 0.24, 0.28, 'square', 0.16],
      [N.G5, 0.54, 0.22, 'square', 0.15],
    ];

    melody.forEach(([f, s, d, ty, v]) => CelebrationAudio.tone(f, s + o, d, ty, v));
    CelebrationAudio.chord([N.G3, N.B3, N.D4, N.G4], o + 0.1, 0.55, 0.1);
  }

  return {
    prepare: CelebrationAudio.prepare,
    prepareSync: CelebrationAudio.prepareSync,
    play,
    stop: CelebrationAudio.stop,
  };
})();
