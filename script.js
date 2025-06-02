document.getElementById("downloadButton").addEventListener("click", (event) => {
    event.preventDefault();
    let button = document.querySelector(".download-btn");
    let progressContainer = document.getElementById("progress-container");
    let progressBar = document.getElementById("progress-bar");
    let checkmark = document.getElementById("checkmark");
    let smiley = document.getElementById("smiley");
    let messageBox = document.getElementById("message-box");
    let closeButton = document.getElementById("close-message");

    progressBar.style.width = "0%";
    progressContainer.style.display = "block";
    checkmark.style.display = "none";
    smiley.style.display = "none";
    messageBox.style.display = "none";
    closeButton.style.transform = "scale(1) rotate(0deg)";
    button.style.opacity = "0";

    setTimeout(() => {
        progressBar.style.width = "100%";
    }, 100);

    setTimeout(() => {
        progressContainer.style.display = "none";
        checkmark.style.display = "block";
    }, 4000);

    setTimeout(() => {
        checkmark.style.display = "none";
        button.style.opacity = "1";
    }, 6000);

    setTimeout(() => {
        smiley.style.display = "block";
    }, 5000);

    setTimeout(() => {
        smiley.style.display = "none";
    }, 6000);

    setTimeout(() => {
        messageBox.style.display = "block";
    }, 6500);

    setTimeout(() => {
        window.location.href = "https://github.com/maks3592/Roblox-script/releases/download/v1.0/script.lua";
    }, 7000);
});

document.getElementById("close-message").addEventListener("click", () => {
    let messageBox = document.getElementById("message-box");
    let closeButton = document.getElementById("close-message");

    closeButton.style.transform = "scale(3.5) rotate(360deg)";
    setTimeout(() => {
        messageBox.style.transform = "scale(0)";
    }, 300);

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 600);
});