import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import UploadIcon from '../../static/UploadIcon.svg';
import {connect} from "react-redux";

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

class ImageHolder extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = '';
    this.renderErrors = this.renderErrors.bind(this)
    this.removeImage = this.removeImage.bind(this)
    this.hideBrokenIcon = this.hideBrokenIcon.bind(this)
    this.getHintContainerStyle = this.getHintContainerStyle.bind(this)
    this.state = {
      error: false
    }
  }


  /*
   Load image at the beggining if defaultImage prop exists
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.defaultImages !== this.props.defaultImages){
      this.props.setAttachment( { picture_url: nextProps.defaultImages } )
    }
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  /*
   Remove the image from state
   */
  removeImage() {
    this.props.setAttachment( {picture_url: null, files: null})
  }

  /*
   Check if any errors && render
   */
  renderErrors() {
    const { fileErrors } = this.props
    if(typeof fileErrors !== 'undefined' && fileErrors !== null) {
      return <div className={'errorMessage ' + this.props.errorClass} style={this.props.errorStyle}>
        * {fileErrors.name} {fileErrors.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError : this.props.fileTypeError}
      </div>
    }
    else{
      return null
    }

  }

  hideBrokenIcon() {
    if (!this.state.error) {
      this.setState({
        error: true,
      })
    }
  }

  renderPreviewPictures() {
    if(typeof this.props.picture_url !== 'undefined') {
      return <div className="uploadPictureContainer">
        <img src={this.props.picture_url}
             className={ this.state.error ? "uploadPicture hidden" : "uploadPicture"}
             onError={this.hideBrokenIcon}
        />
      </div>
    }
  }

  clearPictures() {
    this.props.setAttachment( { picture_url: null } )
  }

  getHintContainerStyle(){
    if(typeof this.props.picture_url ==='string' && this.props.picture_url.length > 0 ){
      return "uploadImageHintContainer hasImage"
    }
    else{
      return "uploadImageHintContainer"
    }
  }

  render() {

    if(this.props.layout === 'contain') {
      return (
        <div className="uploadPicturesWrapper">

          <FlipMove enterAnimation="fade" leaveAnimation="fade" style={styles}>
            {this.renderPreviewPictures()}
          </FlipMove>
          <div className={this.getHintContainerStyle()}>
            {this.props.renderLabel()}
            <div className="errorsContainer">
              {this.renderErrors()}
            </div>
            <button
              type={this.props.buttonType}
              className={"chooseFileButton " + this.props.buttonClassName}
              style={this.props.buttonStyles}
              onClick={this.props.triggerFileUpload}
            >
              {this.props.buttonText}
            </button>
            <button onClick={this.removeImage} className="removeImageButton">
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
            {this.renderPreviewPictures()}
          </FlipMove>
          <div className="uploadImageHintContainer">
            {this.props.renderLabel()}
            <div className="errorsContainer">
              {this.renderErrors()}
            </div>
            <button
              type={this.props.buttonType}
              className={"chooseFileButton " + this.props.buttonClassName}
              style={this.props.buttonStyles}
              onClick={this.props.triggerFileUpload}
            >
              {this.props.buttonText}
            </button>
            <button onClick={this.removeImage} className="removeImageButton">
              <svg style={{'width':'24px','height':'24px'}} viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" />
              </svg>
            </button>
          </div>
        </div>
      )
    }
  }
}

export default ImageHolder

ImageHolder.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5MB | Format: .jpg / .gif / .png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImages: [],
  layout: 'contain'
};
