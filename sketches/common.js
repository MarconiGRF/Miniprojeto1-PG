const viewportSize = {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
}

const canvasSize = {
    width: 800,
    height: 600
};

const colorPalette = {
    lightBlue: '#009DFF',
    lightGray: '#EEEEEE',
    slateGray: '#73828C'
};

const targetFrameRate = 60;
