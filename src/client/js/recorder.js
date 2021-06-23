
const video = document.getElementById("preview")
const startBtn = document.getElementById("startBtn");

const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
    });
    video.srcObject = stream;
    video.play();
} 

startBtn.addEventListener("click", handleStart)