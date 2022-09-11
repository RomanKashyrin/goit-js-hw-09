function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}

const refs = {
    bodyElem: document.querySelector('body'),
    btnStartElem: document.querySelector('button[data-start]'),
    btnStopElem: document.querySelector('button[data-stop]'),
};

let timerId = null;
refs.btnStopElem.disabled = true;

refs.btnStartElem.addEventListener('click', () => {
    refs.btnStartElem.disabled = true;
    refs.btnStopElem.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        refs.bodyElem.style.background = color;
    }, 1000);
});

refs.btnStopElem.addEventListener('click', () => {
    refs.btnStartElem.disabled = false;
    refs.btnStopElem.disabled = true;
    clearTimeout(timerId);
});
