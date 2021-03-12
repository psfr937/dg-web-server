import React, { useState, useEffect } from 'react';
import FlipMove from 'react-flip-move';

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
};

export default function ImageHolder({
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
    label= "Max file size= 5MB | Format= .jpg / .gif / .png",
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
    layout= 'contain',
    fileErrors,
    picture_url,
    renderLabel,
    triggerFileUpload,
    setAttachment
}){
  let inputElement = '';
  const [error, setError ] = useState([false])

  useEffect(() => {
    setAttachment( { picture_url: defaultImages } )
  }, [defaultImages]);
  /*
   Load image at the beggining if defaultImage prop exists
   */


  /*
	 Check file extension (onDropFile)
	 */
  const hasExtension = (fileName) => {
    const pattern = '(' + imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Remove the image from state
   */
  const removeImage = () => {
    setAttachment( {picture_url: null, files: null})
  }

  /*
   Check if any errors && render
   */
  const renderErrors = () => {
    if(typeof fileErrors !== 'undefined' && fileErrors !== null) {
      return <div className={'errorMessage ' + errorClass} style={errorStyle}>
        * {fileErrors.name} {fileErrors.type === ERROR.FILESIZE_TOO_LARGE ?
        fileSizeError : fileTypeError}
      </div>
    }
    else{
      return null
    }
  };

  const hideBrokenIcon = () => {
    if (!error) {
       setError(true);
    }
  };

  const renderPreviewPictures = () => {
    if(typeof picture_url !== 'undefined') {
      return <img src={picture_url}
             className={ error ? "uploadPicture hidden" : "uploadPicture"}
             onError={hideBrokenIcon}
     />
    }
  }

  const clearPictures = () => {
    setAttachment( { picture_url: null } )
  }

  const getHintContainerStyle = () => {
    if(typeof this.props.picture_url ==='string' && this.props.picture_url.length > 0 ){
      return "uploadImageHintContainer hasImage"
    }
    else{
      return "uploadImageHintContainer"
    }
  }



  if(layout === 'contain') {
    return (
      <div className="uploadPicturesWrapper">

        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {renderPreviewPictures()}
        </FlipMove>
        <div className={getHintContainerStyle()}>
          {renderLabel()}
          <div className="errorsContainer">
            {renderErrors()}
          </div>
          <button
            type={buttonType}
            className={"chooseFileButton " + buttonClassName}
            style={buttonStyles}
            onClick={triggerFileUpload}
          >
            {buttonText}
          </button>
          <button onClick={removeImage} className="removeImageButton">
            <svg style={{'width':'24px','height':'24px'}} viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className="uploadPicturesWrapper">

        <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
          {renderPreviewPictures()}
        </FlipMove>
        <div className="uploadImageHintContainer">
          {renderLabel()}
          <div className="errorsContainer">
            {renderErrors()}
          </div>
          <button
            type={buttonType}
            className={"chooseFileButton " + buttonClassName}
            style={buttonStyles}
            onClick={triggerFileUpload}
          >
            buttonText}
          </button>
          <button onClick={removeImage} className="removeImageButton">
            <svg style={{'width':'24px','height':'24px'}} viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
}

