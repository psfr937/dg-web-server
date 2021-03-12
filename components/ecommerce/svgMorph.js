import React from 'react'
import {MorphReplace} from "react-svg-morph";
import st from "../authBox/login.module.scss"
class SvgDef extends React.Component {
  render() {
    return (
      <svg height="0" width="0">
        <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1
        c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/>

      </svg>
    )
  }
}

class Before extends React.Component {
  render() {
    return (
      <svg height="0" width="0">
            <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1
        c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/>
      </svg>
    )
  }
}


class After extends React.Component {
  render() {
    return (

      <svg height="0" width="0">
        <defs>
          <clipPath id="svgPath">
        <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1
        c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/>

          </clipPath>
        </defs>
      </svg>
    )
  }
}

class SvgMorph extends React.PureComponent{
  constructor(props){
    super(props)

    this.state = {
      shape: 0
    }
  }

  changeState(){
    this.setState({shape: 1})
  }

  render(){
    return(
      <React.Fragment>
        <div className={st.svgMorph}>
          <MorphReplace width={100} height={100}>
            {this.state.shape === 0 ? <Before key="checked" /> : <After key="checkbox" />}
          </MorphReplace>
        </div>
        {/*<svg height="0" width="0">*/}
        {/*  <defs>*/}
        {/*    <clipPath id="svgPath">*/}
        {/*      <path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6*/}
        {/*c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1*/}
        {/*c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/>*/}

        {/*    </clipPath>*/}
        {/*  </defs>*/}
        {/*</svg>*/}

      </React.Fragment>
    )
  }
}

export default SvgMorph