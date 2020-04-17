class Resizer{
    static handleWidthHeight(height, maxHeight, width, maxWidth) {
        if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
        }
        if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
        }
        return {height, width}
    }
    static resizeImage(image, maxWidth, maxHeight, compressFormat = "jpeg" , quality = 100) {
        var qualityDecimal = quality / 100;
        var canvas = document.createElement('canvas');
    
        var width = image.width;
        var height = image.height;
    
        var newHeightWidth = this.handleWidthHeight(height, maxHeight, width, maxWidth);
        width = newHeightWidth.width;
        height = newHeightWidth.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height); 
    
        return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
    }
    static createResizedImage(file, maxWidth, maxHeight, compressFormat, quality, responseUriFunc) {
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var image = new Image();
                image.src = reader.result;
                image.onload = function () {
                var resizedDataUrl = Resizer.resizeImage(image, maxWidth, maxHeight, compressFormat, quality);
                responseUriFunc(resizedDataUrl)
                };        
            };
            reader.onerror = error => {
            responseUriFunc(error)
            };
        } else {responseUriFunc('File Not Found')}
    }
}

export default { imageResizer: (file, maxWidth, maxHeight, compressFormat, quality,  responseUriFunc) => {
    return Resizer.createResizedImage(file, maxWidth, maxHeight, compressFormat, quality,  responseUriFunc)
} 
}