(() => {
  const gravity = 1;
  const bounceMin = 0.35;
  const bounceMax = 0.8;

  const sounds = [
    "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg",
    "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
    "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
  ];

  const elements = Array.from(document.body.querySelectorAll("*"))
    .filter(el =>
      el !== document.body &&
      el !== document.documentElement &&
      !["SCRIPT", "STYLE", "LINK"].includes(el.tagName)
    );

  const items = elements.map(el => {
    const rect = el.getBoundingClientRect();

    // FREEZE element visually in same place
    el.style.position = "fixed";
    el.style.left = rect.left + "px";
    el.style.top = rect.top + "px";
    el.style.margin = "0";
    el.style.transform = "none";
    el.style.zIndex = "9999";

    return {
      el,
      x: rect.left,
      y: rect.top,
      vy: 0,
      bounce:
        bounceMin + Math.random() * (bounceMax - bounceMin),
      sound:
        sounds[Math.floor(Math.random() * sounds.length)]
    };
  });

  function loop() {
    items.forEach(o => {
      o.vy += gravity;
      o.y += o.vy;

      const floor =
        window.innerHeight - o.el.offsetHeight;

      if (o.y > floor) {
        o.y = floor;

        if (Math.abs(o.vy) > 2) {
          const s = new Audio(o.sound);
          s.volume = Math.min(1, Math.abs(o.vy) / 18);
          s.play();
        }

        o.vy = -o.vy * o.bounce;
      }

      // ONLY move by transform — keeps start position perfect
      o.el.style.transform = `translateY(${o.y - o.el.getBoundingClientRect().top}px)`;
    });

    requestAnimationFrame(loop);
  }

  loop();
})();
