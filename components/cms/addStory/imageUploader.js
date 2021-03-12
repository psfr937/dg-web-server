import React, { useEffect, useState } from 'react';
import {connect, useSelector} from "react-redux";
import PostImageHolder from './postImageHolder'
import st from './addInventory.module.scss'
const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};

export default function ImageUploader({
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
    setAttachment
 }){

  let inputElement = '';

  const { pictures, files } = useSelector(state => state.editInventory.attachment);
  const [ selectedPicture, setSelectedPicture ] = useState(null)

  const removeImage = (picture) => {
    const removeIndex = pictures.findIndex(e => e === picture);
    const filteredPictures = pictures.filter((e, index) => index !== removeIndex);
    const filteredFiles = files.filter((e, index) => index !== removeIndex);
    setAttachment( {pictures: filteredPictures, files: filteredFiles})
    setSelectedPicture(null);
  }

  const attachment = useSelector(state => state.editInventory.attachment);

  const hasExtension = (fileName) => {
    const pattern = '(' + imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  const onDropFile = (e) => {
    const files = e.target.files;
    const allFilePromises = [];
    const fe = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileError = {
        name: file.name,
      };
      // Check for file extension
      if (!hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fe.push(fileError);
        continue;
      }
      // Check for file size
      if(file.size > maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fe.push(fileError);
        continue;
      }

      allFilePromises.push(readFile(file));
    }

    // setFileErrors({
    //   fe
    // });
    setAttachment( { fileErrors: fe });

    Promise.all(allFilePromises).then(newFilesData => {
      const dataURLs = attachment.pictures.slice();
      const files = attachment.files.slice();

      newFilesData.forEach(newFileData => {
        dataURLs.push(newFileData.dataURL);
        files.push(newFileData.file);
      });
      // setPictures(dataURLs);
      // setFiles(files);
      setAttachment( {pictures: dataURLs, files: files})
      setSelectedPicture(dataURLs)
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
    const { fileErrors } = attachment;
    return fileErrors.map((fileError, index) => {
      return (
        <div className={'errorMessage ' + errorClass} key={index} style={errorStyle}>
          * {fileError.name} {fileError.type === ERROR.FILESIZE_TOO_LARGE ? fileSizeError: fileTypeError}
        </div>
      );
    });
  };

  const renderLabel = () => {
    if (withLabel) {
      return <p className={labelClass} style={labelStyles}>{label}</p>
    }
  };

  const triggerFileUpload = () => {
    inputElement.click();
  }

  const clearPictures = () => {
    this.setState({pictures: []});
    setAttachment( {pictures: [] });
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
        <PostImageHolder
          pictures={pictures}
          files={files}
          setAttachment={setAttachment}
          setSelectedPicture={setSelectedPicture}
          removeImage={removeImage}
        />
      </div>
      {
        attachment.pictures.length > 0 ? (
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
        {attachment.pictures.length > 0 ? <img src={ selectedPicture }/> : null}
        {
          attachment.pictures.length === 0 ? (
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