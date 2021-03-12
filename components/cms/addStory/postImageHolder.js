import React, { useEffect } from 'react';
import FlipMove from 'react-flip-move';
import {connect, useSelector} from "react-redux";
import st from './addInventory.module.scss'
const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
}

export default function PostImageHolder({
   className= '',
   fileContainerStyle= {},
   buttonClassName= "",
   buttonStyles= {},
   withPreview= false,
   accept= "image/*",
   name= "",
   withIcon= true,
   buttonText= "Choose images",
   buttonType= "button",
   withLabel= true,
   label= "Max file size= 5mb, accepted= jpg|gif|png",
   labelStyles= {},
   labelClass= "",
   imgExtension= ['.jpg', '.jpeg', '.gif', '.png'],
   maxFileSize= 5242880,
   fileSizeError= " file size is too big",
   fileTypeError= " is not a supported file extension",
   errorClass= "",
   style= {},
   errorStyle= {},
   singleImage= false,
   onChange= () => {},
    defaultImages= [],
    setAttachment,
    setSelectedPicture,
  pictures, files, removeImage
}){
  let inputElement = '';

  useEffect(() => {
    setAttachment( { pictures: defaultImages } )
  }, []);

  const renderPreviewPictures = () => {
    console.log(pictures)
    return pictures.map((picture, index) => {
      return (
        <div key={index} onClick={() => setSelectedPicture(picture)} className={st.uploadPictureContainer}>

          <img src={picture} className={st.uploadPicture} alt="preview"/>
          <div className={st.deleteImage} onClick={() => removeImage(picture)}> <h6>Remove</h6></div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      {renderPreviewPictures()}
    </React.Fragment>
  )

}
