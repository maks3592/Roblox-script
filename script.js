document.addEventListener("mousemove", (event) => {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;

    document.body.style.backgroundPosition = `${x}% ${y}%`;
});