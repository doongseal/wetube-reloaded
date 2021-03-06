const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer")
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovemnetTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;



const handelPlayClick = (e) => {

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";

}

const handelmute = (e) => {
    if (video.muted) {
        video.muted = false;

    } else {
        video.muted = true;

    }
    muteBtnIcon.classList = video.muted
        ? "fas fa-volume-mute"
        : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;

}

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "mute";

    }
    if (value === 0) {
        muteBtnIcon.classList = "fas fa-volume-off";
    } else {
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    volumeValue = value;
    video.volume = value;
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);

}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimelineChange = (event) => {
    const { target: { value }, } = event;
    video.currentTime = value;

};

const handleFullscreen = () => {

    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }

};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovemnetTimeout) {
        clearTimeout(controlsMovemnetTimeout);
        controlsMovemnetTimeout = null;

    }
    videoControls.classList.add("showing");
    controlsMovemnetTimeout = setTimeout(hideControls, 3000);


};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);

}
const handleEnded = () => {
    const {id} = videoContainer.dataset
    fetch(`/api/videos/${id}/views`,{method:"POST"},)

}

playBtn.addEventListener("click", handelPlayClick);
muteBtn.addEventListener("click", handelmute);
volumeRange.addEventListener("input", handleVolumeChange)
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate)
video.addEventListener("ended", handleEnded)
timeline.addEventListener("input", handleTimelineChange)
fullScreenBtn.addEventListener("click", handleFullscreen)
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);