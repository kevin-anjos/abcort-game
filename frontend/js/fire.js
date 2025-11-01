const fireArea = document.querySelector('#fire-area'); 

const firePixelsArray = [];
const fireColorsPalette = [{"r":22,"g":21,"b":21},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

const columns = 100; //width

const rows = 40; //height

const startFire = () => {
    createFireDataStructure();
    createFireSource();

    setInterval(calculateFirePropagation, 50);
};  

function createFireSource() {
    for (let column = 0; column <= columns; column++) {
        const overflowPixelIndex = columns * rows;
        const pixelIndex = (overflowPixelIndex - columns) + column

        firePixelsArray[pixelIndex] = 36;
    };
};

const createFireDataStructure = () => {
    const numberOfPixels = columns * rows;

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0;
    };
};


const updateFireIntensityPerPixel = (currentPixelIndex) => {
    const belowPixelIndex = currentPixelIndex + columns

    if (belowPixelIndex >= columns * rows) return
    
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

const calculateFirePropagation = () => {
    for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const pixelIndex = column + ( columns * row )

      updateFireIntensityPerPixel(pixelIndex)
    }
  }

    renderFire()
};

const renderFire = () => {
    let fireTable = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < rows; row++) {
        fireTable += '<tr>';
           
        for (let column = 0; column < columns; column++) {
            const pixelIndex = column + columns * row;
            const fireIntensity = firePixelsArray[pixelIndex];
            const color = fireColorsPalette[fireIntensity];
                const colorString = `${color.r},${color.g},${color.b}`


             fireTable += `<td class="pixel" style="background-color: rgb(${colorString})"></td>`
        };

        fireTable += '</tr>';
    };
    
    fireTable += '</table>';

    fireArea.innerHTML = fireTable;
};

export {
    startFire
};