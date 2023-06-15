function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const elements = {
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body") 
} 
elements.btnStop.disabled = true
let colors ;
elements.btnStart.addEventListener("click", onStartBtn);
elements.btnStop.addEventListener("click", onStopBtn);

function onStartBtn() {
    elements.btnStart.disabled = true
    elements.btnStop.disabled = false
    colors = setInterval(() => {
        elements.body.style.backgroundColor = getRandomHexColor()
    }, 1000
    )
}

function onStopBtn() {
    elements.btnStop.disabled = true
        elements.btnStart.disabled = false;
    clearInterval(colors)
}

