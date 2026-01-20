setInterval(function(){document.getElementById("content").style.filter = `invert(${Math.floor(Math.random()*2)})`},10);
setInterval(function(){document.getElementById("content").style.filter = `sepia(${Math.floor(Math.random()*2)})`},13);
setInterval(function(){document.getElementById("content").style.filter = `blur(${Math.floor(Math.random()*2)})`},17);
const content = document.getElementById("content");
if (content) {
  content.style.backgroundImage =
    "url(https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/scary.png?raw=true)";
  content.style.backgroundRepeat = "repeat";
}
const audio = new Audio(
  "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/raw/refs/heads/main/hh.wav"
);
audio.volume = 1;
audio.play().catch(() => {});
socket.emit("command", {
  list: ["name", "ITS TO LATE LUCA"]
});
socket.emit("command", {
  list: ["crosscolor", "https://github.com/ivorydevrimoalt/BONZIWORLDEEDITIONULTRAJAVASCRIPTLIST/blob/main/phase3.png?raw=true"]
});
