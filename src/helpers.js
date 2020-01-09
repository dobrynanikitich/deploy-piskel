export function getEmptyImageCanvas() {
    const pixelsNumber = 1638400;
    const canvasDefaultColor = 128; 
    const arr = new Uint8ClampedArray(pixelsNumber);

    // Iterate through every pixel
    for (let i = 0; i < arr.length; i += 4) {
      arr[i + 0] = canvasDefaultColor;   
      arr[i + 1] = canvasDefaultColor; 
      arr[i + 2] = canvasDefaultColor;   
      arr[i + 3] = canvasDefaultColor; 
    }
    return new ImageData(arr, 640, 640);
}
