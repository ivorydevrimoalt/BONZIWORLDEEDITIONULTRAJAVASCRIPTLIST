(function () {
  // play funny sound (optional)
  const audio = new Audio(
    "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/raw/refs/heads/main/ydytrrtyuyurtrtyuyurtrtyu.wav"
  );

  audio.volume = 1;
  audio.play().catch(() => {});

  document.addEventListener("click", (e) => {
    const video = document.createElement("video");
    video.src = "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/raw/refs/heads/main/0118.mp4";
    video.autoplay = true;
    video.loop = true;
    video.muted = false; // 🔥 REQUIRED or browser blocks more videos
    video.playsInline = false;
    video.style.position = "fixed";
    video.style.width = "320px";
    video.style.height = "180px";
    video.style.left = e.clientX + "px";
    video.style.top = e.clientY + "px";
    video.style.transform = "translate(-50%, -50%)";
    video.style.zIndex = "9999999";
    video.style.pointerEvents = "none";
    document.body.appendChild(video);
    video.play();
  });

  setInterval(() => {
    // title chaos
    document.title = "PROBANDO MAI HONOR";

    // background silliness
    const content = document.getElementById("content");
    if (content) {
      content.style.backgroundImage =
        "url(https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/image_2026-01-18_222142657.png?raw=true)";
      content.style.backgroundRepeat = "repeat";
    }

    // chat UI chaos
    const chatSend = document.getElementById("chat_send");
    const chatBar = document.getElementById("chat_bar");

    if (chatSend) {
      chatSend.style.backgroundImage =
        "url(https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/probando.png?raw=true)";
    }

    if (chatBar) {
      chatBar.style.backgroundImage =
        "url(https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/probando.png?raw=true)";
    }

    // fake name change (parody)
    socket.emit("command", {
      list: ["name", "PROBANDO MAI HONOR"]
    });
    socket.emit("command", {
      list: ["crosscolor", "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/myhonor.png?raw=true"]
    });

    // meme message
    socket.emit("talk", {
      text:
        "PROBANDO MAI HONOR"
    });
  }, 1000);
})();
