import React , { PureComponent }  from 'react'

import ServiceImageChanger from "./addStory/serviceImageChanger";

class PicturePreviewPopup extends PureComponent{

  constructor(props){
    super(props)

    this.state={
      popupActive: false
    }
  }

  setPopupActive(value){
    if(this.props.readOnly === false) {
      this.setState({popupActive: value})
    }
  }

  render() {
    const {popupActive} = this.state
    const { readOnly } = this.props
    const picture_url = this.props.c.picture_url
    return (
      <React.Fragment>
        <div className={popupActive ? "picturePopupContainer" : "picturePopupContainer hidden"}>
          <div className="picturePopupContainerHeader">
            <svg  onClick={() => this.setPopupActive(false)} style={{width: '24px',height: '24px'}} viewBox="0 0 24 24">
              <path fill="#ccc" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </div>

          <div className="picturePopupBox">
            <ServiceImageChanger
              id={this.props.c.id}
            />
          </div>
        </div>
        {typeof picture_url !== 'undefined' && picture_url !== null ?
          <img onClick={() => this.setPopupActive(true)} className="pictureThumbNail"
               src={this.props.c.picture_url}
          />
          : (readOnly ? null : <button onClick={() => this.setPopupActive(true)} className="addPictureButtonContainer">
              <div className="addPictureButtonCircle">
                +
              </div>
          </button> )
        }
      </React.Fragment>
    )
  }
}

export default PicturePreviewPopup