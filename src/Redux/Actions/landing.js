import { UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESSFULL } from '../type';

export function uploadImage(file){
    return dispatch => {
        console.log('file', file)
        for(var i=0; i<4 ;i++){
            var base64Data = `${file[i].uri}` //data:image/png;base64,
            var element = document.createElement('a')
            element.setAttribute('href', base64Data)
            element.setAttribute('download', `image_${file[0].width}x${file[0].height}`)
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        }
        
    }
}