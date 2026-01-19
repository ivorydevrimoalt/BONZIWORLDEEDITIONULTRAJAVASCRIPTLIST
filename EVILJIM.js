(() => {
  // ================= CONFIG =================
  const BASE =
    "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/raw/main/";

  const EVIL_JIM = BASE + "eviljim.png";
  const HAMMER = BASE + "hammer.png";

  const HIT_SOUND =
    "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg";

  // ================= AUDIO =================
  let audioCtx, hitBuffer, unlocked = false;

  async function unlock() {
    if (unlocked) return;
    unlocked = true;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const r = await fetch(HIT_SOUND);
    hitBuffer = await audioCtx.decodeAudioData(await r.arrayBuffer());
  }

  window.addEventListener("pointerdown", unlock, { once: true });

  function hit() {
    if (!audioCtx || !hitBuffer) return;

    const s = audioCtx.createBufferSource();
    s.buffer = hitBuffer;
    s.playbackRate.value = 0.6 + Math.random() * 1.4; // 👹 chaos pitch
    s.connect(audioCtx.destination);
    s.start();
  }

  // ================= STYLE =================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%{transform:translate(0,0)}
      20%{transform:translate(12px,-8px)}
      40%{transform:translate(-12px,8px)}
      60%{transform:translate(8px,12px)}
      80%{transform:translate(-8px,-12px)}
      100%{transform:translate(0,0)}
    }

    @keyframes flash {
      from { background: rgba(255,255,255,.8); }
      to { background: transparent; }
    }

    .shake { animation: shake .15s }
    .flash {
      position:fixed;
      inset:0;
      pointer-events:none;
      animation:flash .1s;
      z-index:9999999;
    }
  `;
  document.head.appendChild(style);

  // ================= WRAPPER =================
  const wrap = document.createElement("div");
  wrap.style = `
    position:fixed;
    inset:0;
    pointer-events:none;
    z-index:999997;
  `;
  document.body.appendChild(wrap);

  // ================= JIM =================
  const jim = document.createElement("img");
  jim.src = EVIL_JIM;
  jim.style = `
    position:fixed;
    left:50%;
    top:50%;
    width:180px;
    transform:translate(-50%,-50%);
    image-rendering:pixelated;
    z-index:999998;
  `;
  wrap.appendChild(jim);

  // Jim chaos movement
  setInterval(() => {
    const r = (Math.random() - 0.5) * 20;
    const rot = (Math.random() - 0.5) * 20;
    jim.style.transform =
      `translate(-50%,-50%) rotate(${rot}deg) translate(${r}px,${-r}px)`;
  }, 80);

  // ================= CORRUPTION =================
  function corruptRandomText() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) {
      if (n.nodeValue && n.nodeValue.trim().length > 4)
        nodes.push(n);
    }

    if (!nodes.length) return;

    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const arr = node.nodeValue.split("");

    for (let i = 0; i < 5; i++) {
      const p = Math.floor(Math.random() * arr.length);
      arr[p] = String.fromCharCode(33 + Math.random() * 60);
    }

    node.nodeValue = arr.join("");
  }

  // ================= HAMMER =================
  function throwHammer() {
    const r = jim.getBoundingClientRect();
    const sx = r.left + r.width / 2 - 32;
    const sy = r.top + r.height / 2 - 32;

    const ex = Math.random() * innerWidth;
    const ey = Math.random() * innerHeight;

    const hammer = document.createElement("img");
    hammer.src = HAMMER;
    hammer.style = `
      position:fixed;
      width:64px;
      left:${sx}px;
      top:${sy}px;
      pointer-events:none;
      z-index:999999;
    `;
    wrap.appendChild(hammer);

    let t = 0;
    const dur = 15 + Math.random() * 20;
    const curve = (Math.random() - 0.5) * 400;
    const spin = Math.random() * 1440;

    const dx = ex - sx;
    const dy = ey - sy;

    const loop = setInterval(() => {
      t++;
      const p = t / dur;

      const x = sx + dx * p;
      const y = sy + dy * p - Math.sin(p * Math.PI) * curve;

      hammer.style.transform =
        `translate(${x - sx}px,${y - sy}px) rotate(${spin * p}deg)`;

      if (p >= 1) {
        clearInterval(loop);
        hammer.remove();

        // FLASH
        const f = document.createElement("div");
        f.className = "flash";
        document.body.appendChild(f);
        setTimeout(() => f.remove(), 100);

        wrap.classList.add("shake");
        setTimeout(() => wrap.classList.remove("shake"), 150);

        // RANDOM FILTER GLITCH
        document.body.style.filter =
          `hue-rotate(${Math.random() * 360}deg) contrast(${1 + Math.random() * 2})`;

        corruptRandomText();
        hit();
      }
    }, 16);
  }

  // ================= CHAOS LOOP =================
  let interval = 350;

  function chaosLoop() {
    const burst = 1 + Math.floor(Math.random() * 6); // 💥 MULTI HAMMERS

    for (let i = 0; i < burst; i++) {
      setTimeout(throwHammer, Math.random() * 150);
    }

    // sometimes GO INSANE
    if (Math.random() < 0.15) interval *= 0.6;

    interval *= 0.97;
    if (interval < 15) interval = 15;

    setTimeout(chaosLoop, interval);
  }

  chaosLoop();
})();
