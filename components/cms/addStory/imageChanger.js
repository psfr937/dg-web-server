import React, { useEffect } from 'react';
import {connect} from "react-redux";
import ImageHolder from './imageHolder'
import st from './addInventory.module.scss'

const ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};

export default function ImageChanger({
    picture_url= null,
    files= null,
    fileErrors= null,
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
    label= "Max. 5MB ( jpg | gif | png )",
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
    editAttachment= data => {},
    layout= 'contain',
    attachment,
    filesErrors
  }){


    let inputElement = '';

  /*
   Load image at the beggining if defaultImage prop exists
   */
  useEffect(() => {
   editAttachment( {picture_url: defaultImages} )
  }, defaultImages);


  /*
	 Check file extension (onDropFile)
	 */
  const hasExtension = (fileName) => {
    const pattern = '(' + imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  const onDropFile = (e) => {
    const files = e.target.files;
    const fileErrors = null;

    // Iterate over all uploaded files
    let file = files[0];
    let fileError = {
      name: file.name
    };
    // Check for file extension
    if (!hasExtension(file.name)) {
      fileError = Object.assign(fileError, {
        type: ERROR.NOT_SUPPORTED_EXTENSION
      });
      editAttachment( fileErrors )
    }
    else if(file.size > maxFileSize) {
      fileError = Object.assign(fileError, {
        type: ERROR.FILESIZE_TOO_LARGE
      });
      editAttachment( fileErrors )
    }
    else {
      readFile(file).then(newFilesData => {
        editAttachment({picture_url: newFilesData.dataURL, files: newFilesData.file})
      })
        .catch(err => window.alert(err));
    }
  }

  const onUploadClick = (e) => {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  const readFile = file =>  {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
        resolve({file, dataURL});
      };

      reader.readAsDataURL(file);
    });
  }

  const renderErrors = () => {
    const { fileErrors } = attachment;
    if(typeof filesErrors !== 'undefined') {
      return <div className={'errorMessage ' + errorClass} style={errorStyle}>
        * {fileErrors.name} {fileErrors.type === ERROR.FILESIZE_TOO_LARGE ? fileSizeError : fileTypeError}
      </div>
    }
  };

  const renderIcon = () => {
    return <img src={"/UploadIcon.svg"} className="uploadIcon"	alt="Upload Icon" />;

  }

  const renderLabel = () => {
    return <p className={labelClass} style={labelStyles}>{label}</p>
  }

  const triggerFileUpload = () => {
    inputElement.click();
  }

  const clearPictures = () => {
    editAttachment( {picture_url: null })
  }


  return (
    <div className="fileContainer">
      <input
        type="file"
        ref={input => inputElement = input}
        name={name}
        multiple={!singleImage}
        onChange={onDropFile}
        onClick={onUploadClick}
        accept={accept}
      />
      <ImageHolder
        picture_url={picture_url}
        files={files}
        setAttachment={editAttachment}
        renderIcon={renderIcon}
        renderLabel={renderLabel}
        triggerFileUpload = {triggerFileUpload}
        fileErrors={fileErrors}
        layout={layout}
      />
    </div>
  )

}