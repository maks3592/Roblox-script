document.addEventListener("mousemove", (event) => {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;
    
    document.getElementById("background").style.background = 
        `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8))`;
});
