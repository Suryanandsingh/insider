import React from 'react';
import { connect } from 'react-redux';
import Resizer from './ImageResizer';
import { uploadImage } from '../Redux/Actions/landing';
import '../Styles/landing.css';

const dimension = [
    {
        width: 755,
        height: 450
    },
    {
        width: 365,
        height: 450
    },
    {
        width: 365,
        height: 212
    },
    {
        width: 380,
        height: 380
    },

]

class LandingPage extends React.Component{
    constructor(){
        super()
        this.state = {
            images: [],
            imageError: ''
        }
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e){
        var imageFile = e.target.files[0];
        // var img = new Image();
        // img.src = window.URL.createObjectURL( imageFile );
        // img.onload = function(){
        //     console.log('im', img.width, img.height)
        //     if(img.width !== 1024 || img.height !== 1024){
        //         alert('Image dimension should be 1024x1024.')
        //         return false;
        //     }
        // }
        // console.log(img)
        this.handleChangeImageUpload(imageFile)
    }
    handleChangeImageUpload(image){
        dimension.map((data, index)=>{
            return Resizer.imageResizer(
                image, //file 
                data.width, //width
                data.height, //height
                'JPEG', //file format
                80, // quality
                uri => {
                    this.setState(prev=>({
                        images:[...this.state.images, {
                            uri,
                            width: data.width,
                            height: data.height
                        }]
                    }))
                },
            )
        })
        
    }
    _renderUploadComponent(){
        if(this.state.images.length === 0){
            return(
                <div className="upload-container center">
                    <div>
                        <h3>Upload image from your gallery</h3>
                        <p>Image size should be 1024x1024</p>
                    </div>
                    <label> Choose image
                        <input 
                            name="image" type="file" 
                            onChange={e => this.handleChange(e)} />
                    </label>
                </div>
            )
        }else{
            return null
        }
    }
    _renderImageView(images){
        return images.map((image, index)=>{ 
            return(
                <div className="img-content center" key={index} >
                    <img src={image.uri} alt={`loading ${image.width}x${image.height}`}/>
                    <p>{`${image.width}x${image.height}`}</p>
                </div>
            )
        })
    }
    _renderImageContainer(){
        const { images } = this.state;
        if(images.length>0){
            return(
                <div className="center" style={{flexDirection: 'column'}}>
                    <div className="img-containers">
                        {this._renderImageView(images)}
                    </div>
                    <div className="image-save">
                        <button onClick={()=>{this.props.uploadImage(images)}} >Save</button>
                        <button onClick={()=>{this.setState({images:[]})}} >Cancel</button>
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
    render(){
        console.log(this.state.images)
        return(
            <div className="containers center">
                {this._renderUploadComponent()}
                {this._renderImageContainer()}
            </div>
            
        )
    }
}

export default connect(null, { uploadImage })(LandingPage);