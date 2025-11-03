window.onload = function() {
    const audio = document.getElementById('myAudio');
    const canvas = document.getElementById('visualizerCanvas');
    const ctx = canvas.getContext('2d');

    // Settings - Maximum values
    const waveLength = 5; // Maximum
    const amplitude = 70;   // Maximum
    const color = 'white';  // Fixed White Color
    let phase = 0;

    canvas.width = window.innerWidth;
    canvas.height = 200;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(0, canvas.height / 2);


        for (let i = 0; i < canvas.width; i++) {
            let audioValue = (dataArray[Math.floor(i * bufferLength / canvas.width)] - 128) / 128;
            let y = canvas.height / 2 + amplitude * Math.sin(i / waveLength + phase) * audioValue;

            ctx.lineTo(i, y);
        }

        ctx.stroke();
        phase += 0.05;
    }


    audio.addEventListener('canplaythrough', () => {
        audioContext.resume();  // Resume AudioContext on 'canplaythrough'
        draw();
    });

    // Start visualizing on first play
    audio.addEventListener('play', () => {
        audioContext.resume();  // Ensure AudioContext is running
        if (!isPlaying) {
            draw();
            isPlaying = true; // Flag so it doesn't start multiple times.
        }
    });

    //A flag to determine if we have started the animation once already or not
    let isPlaying = false;
};



