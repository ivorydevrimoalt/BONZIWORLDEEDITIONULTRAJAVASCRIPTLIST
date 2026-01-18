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
    s.connect(audioCtx.destination);
    s.start();
  }

  // ================= STYLE =================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%{transform:translate(0,0)}
      25%{transform:translate(6px,-4px)}
      50%{transform:translate(-6px,4px)}
      75%{transform:translate(4px,6px)}
      100%{transform:translate(0,0)}
    }
    .shake{animation:shake .2s}
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
    transform:translate(-50%,-50%);
    width:180px;
    image-rendering:pixelated;
    z-index:999998;
  `;
  wrap.appendChild(jim);

  // ================= VISUAL CORRUPTION =================
  function corruptTextNode(node) {
    const text = node.nodeValue;
    if (!text || text.length < 5) return;

    let arr = text.split("");

    for (let i = 0; i < 5; i++) {
      const p = Math.floor(Math.random() * arr.length);
      arr[p] = String.fromCharCode(33 + Math.random() * 60);
    }

    node.nodeValue = arr.join("");
  }

  function corruptRandomElement() {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const texts = [];
    let n;
    while ((n = walker.nextNode())) texts.push(n);

    if (texts.length === 0) return;

    corruptTextNode(texts[Math.floor(Math.random() * texts.length)]);
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
      z-index:999999;
      pointer-events:none;
    `;
    wrap.appendChild(hammer);

    let t = 0;
    const dur = 25;
    const curve = (Math.random() - 0.5) * 200;
    const dx = ex - sx;
    const dy = ey - sy;
    const spin = Math.random() * 720 + 360;

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

        wrap.classList.add("shake");
        setTimeout(() => wrap.classList.remove("shake"), 200);

        corruptRandomElement(); // ← visible change
        hit();
      }
    }, 16);
  }

  // ================= SPEED RAMP =================
  let interval = 400;

  function loop() {
    throwHammer();

    interval *= 0.99; // FASTENS OVER TIME
    if (interval < 10) interval = 10;

    setTimeout(loop, interval);
  }

  loop();
})();
