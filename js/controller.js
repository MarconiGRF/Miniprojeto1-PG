document.addEventListener('DOMContentLoaded', (event) => {

    const popup = document.querySelector('.sketch-popup');
    const container = document.querySelector('.p5-container')

    const openButtons = document.querySelectorAll('.open-sketch-popup-button');
    for (const openButton of openButtons) {
        openButton.addEventListener('click', () => openSketchPopup(openButton.getAttribute('data-sketch-id')));
    }

    const closeButton = popup.querySelector('.close-sketch-popup-button');
    closeButton.addEventListener('click', () => popup.hide());

    const fullscreenButton = popup.querySelector('.fullscreen-sketch-popup-button');

    function openSketchPopup(sketchId) {

        const loaderUrl = `loader.html?sketch-id=${sketchId}`;
        const frame = document.createElement('iframe');

        container.textContent = '';
        popup.label = `Questão ${sketchId}`;
        fullscreenButton.href = loaderUrl;

        frame.src = loaderUrl;

        container.appendChild(frame);

        popup.show();
    }

})
