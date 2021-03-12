import React, { useEffect, useState } from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import PostImageHolder from './postImageHolder'
import st from './addInventory.module.scss'
import {SET_ATTACHMENT} from "../../../redux/reducers/cms/editInventory";
const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};

export default function ImageUploader({
   fileContainerStyle= {},
   buttonStyles= {},
   accept= "image/*",
   name= "",
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
 }){

  let inputElement = '';

  const [ selectedPicture, setSelectedPicture ] = useState(null);



  const [ fileErrors, setFileErrors ] = useState([]);

  const images = useSelector(state => 'images' in state.editInventory ?
    state.editInventory.images : []);

  const hasExtension = (fileName) => {
    const pattern = '(' + imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  const dispatch = useDispatch();

  const onDropFile = (e) => {
    const files = e.target.files;
    const allFilePromises = [];
    const fe = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name,
      };
      if (!hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fe.push(fileError);
        continue;
      }
      if(file.size > maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fe.push(fileError);
        continue;
      }

      allFilePromises.push(readFile(file));
    }

    setFileErrors(fe);

    Promise.all(allFilePromises).then(newFilesData => {

      const newData = newFilesData.map(newFileData => {
        return {
          url: newFileData.dataURL,
          file: newFileData.file
        };
      });
      dispatch({ type: SET_ATTACHMENT, data: newData});
      setSelectedPicture(newData[newData.length - 1].url);
    });
  }

  const onUploadClick = (e) => {
    e.target.value = null;
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  };

  const renderErrors = () => {
    return fileErrors.map((fileError, index) => {
      return (
        <div className={'errorMessage ' + errorClass} key={index} style={errorStyle}>
          * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? fileSizeError: fileTypeError}
        </div>
      );
    });
  };


  useEffect(() => {
    setSelectedPicture( images.length > 0 ? images[images.length - 1].url : null)
  }, [images]);

  const renderLabel = () => {
    if (withLabel) {
      return <p className={labelClass} style={labelStyles}>{label}</p>
    }
  };

  const triggerFileUpload = () => {
    inputElement.click();
  };

  return (
    <div className={st.gallery}>
      <div className={st.thumbnailList}>
    <div className={st.fileUploader} style={style}>
      <div className={st.fileContainer} style={fileContainerStyle}>
        <input
          type="file"
          ref={input => inputElement = input}
          name={name}
          multiple={!singleImage}
          onChange={onDropFile}
          onClick={onUploadClick}
          accept={accept}
        />
        <PostImageHolder setSelectedPicture={setSelectedPicture}/>
      </div>
      {
        images.length > 0 ? (
          <div className={st.addImageButton} onClick={triggerFileUpload}>
            <svg viewBox="0 0 24 24">
              <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>
        ) : null
      }
        </div>
      </div>
      <div className={st.bigImage} >
        {selectedPicture !== null ? <img src={ selectedPicture }/> : null}
        {
          images.length === 0 ? (
            <div className={st.uploadImageHintContainer}>
              <div className={st.errorsContainer}>
                {renderErrors()}
              </div>
              <button
                className={st.chooseFileButton}
                type={buttonType}
                style={buttonStyles}
                onClick={triggerFileUpload}
              >
                {buttonText}
              </button>
              {renderLabel()}
            </div>
          ) : null
        }
      </div>
    </div>
  )
}