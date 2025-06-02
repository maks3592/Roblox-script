document.addEventListener("mousemove", (event) => {
    let blackhole = document.getElementById("blackhole");

    let x = event.clientX - blackhole.offsetWidth / 2;
    let y = event.clientY - blackhole.offsetHeight / 2;

    blackhole.style.transform = `translate(${x}px, ${y}px)`;
});