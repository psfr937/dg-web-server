import React from 'react';
import UploadIcon from '../../static/UploadIcon.svg';
import {connect} from "react-redux";
import ImageHolder from './imageHolder'


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

class ImageChanger extends React.Component {
  constructor(props) {
    super(props);

    this.inputElement = '';
    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadClick = this.onUploadClick.bind(this);
    this.triggerFileUpload = this.triggerFileUpload.bind(this);
    this.renderIcon = this.renderIcon.bind(this)
    this.renderLabel = this.renderLabel.bind(this)
    this.editAttachment = this.editAttachment.bind(this)
  }

  /*
   Load image at the beggining if defaultImage prop exists
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.defaultImages !== this.props.defaultImages){
      this.props.editAttachment( {picture_url: nextProps.defaultImages} )
    }
  }

  editAttachment(data){
    this.props.editAttachment(data)
  }

  /*
	 Check file extension (onDropFile)
	 */
  hasExtension(fileName) {
    const pattern = '(' + this.props.imgExtension.join('|').replace(/\./g, '\\.') + ')$';
    return new RegExp(pattern, 'i').test(fileName);
  }

  onDropFile(e) {
    const files = e.target.files;
    const fileErrors = null;

    // Iterate over all uploaded files
    let file = files[0]
    let fileError = {
      name: file.name
    };
    // Check for file extension
    if (!this.hasExtension(file.name)) {
      fileError = Object.assign(fileError, {
        type: ERROR.NOT_SUPPORTED_EXTENSION
      });
      this.props.editAttachment( fileErrors )
    }
    else if(file.size > this.props.maxFileSize) {
      fileError = Object.assign(fileError, {
        type: ERROR.FILESIZE_TOO_LARGE
      });
      this.props.editAttachment( fileErrors )
    }
    else {
      this.readFile(file).then(newFilesData => {
        this.props.editAttachment({picture_url: newFilesData.dataURL, files: newFilesData.file})
      })
        .catch(err => window.alert(err));
    }
  }

  onUploadClick(e) {
    // Fixes https://github.com/JakeHartnell/react-images-upload/issues/55
    e.target.value = null;
  }

  readFile(file) {
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

  renderErrors() {
    const { fileErrors } = this.props.attachment;
    if(typeof filesErrors !== 'undefined') {
      return <div className={'errorMessage ' + this.props.errorClass} style={this.props.errorStyle}>
        * {fileErrors.name} {fileErrors.type === ERROR.FILESIZE_TOO_LARGE ? this.props.fileSizeError : this.props.fileTypeError}
      </div>
    }

  }

  renderIcon() {
    return <img src={UploadIcon} className="uploadIcon"	alt="Upload Icon" />;

  }

  renderLabel() {
    return <p className={this.props.labelClass} style={this.props.labelStyles}>{this.props.label}</p>
  }

  triggerFileUpload() {
    this.inputElement.click();
  }

  clearPictures() {
    this.props.editAttachment( {picture_url: null })
  }


  render() {
    return (
      <div className="fileContainer">
        <input
          type="file"
          ref={input => this.inputElement = input}
          name={this.props.name}
          multiple={!this.props.singleImage}
          onChange={this.onDropFile}
          onClick={this.onUploadClick}
          accept={this.props.accept}
        />
        <ImageHolder
          picture_url={this.props.picture_url}
          files={this.props.files}
          setAttachment={this.editAttachment}
          renderIcon={this.renderIcon}
          renderLabel={this.renderLabel}
          triggerFileUpload = {this.triggerFileUpload}
          fileErrors={this.props.fileErrors}
          layout={this.props.layout}
        />
      </div>
    )
  }
}


ImageChanger.defaultProps = {
  picture_url: null,
  files: null,
  fileErrors: null,
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
  label: "Max. 5MB ( jpg | gif | png )",
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
  editAttachment: data => {},
  layout: 'contain'
};


export default ImageChanger