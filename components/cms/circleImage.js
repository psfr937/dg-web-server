import React, { PureComponent } from 'react'


class CircleImage extends PureComponent {

  constructor(props){
    super(props)
    this.changeSrc = this.changeSrc.bind(this)

    this.state = {
      src: props.src,
      errored: false,
    };

  }

  changeSrc(newSrc){
    if(!this.state.errored) {
      this.setState({
        errored: true,
        src: newSrc
      })
    }
  }

  render() {
    const { imageUrl } = this.props

    return (
      <div className="profileIconWrapper"  onClick={this.toggleProfileOption}>
        <img
          className="profileIcon"
          alt="me"
          onError={this.changeSrc('https://i.imgur.com/aBcof3d.png')}
          src={this.state.errored ? this.state.src : imageUrl }
        />
      </div>
    )
  }
}

export default CircleImage
