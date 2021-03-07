import React, { PureComponent } from 'react'
import classnames from 'classnames'

class ResizableBox extends PureComponent{

  constructor(props){
    super(props)
    this.getStyle = this.getStyle.bind(this)
    this.getBoxClass = this.getBoxClass.bind(this)
    this.state = {

    }
    this.onMouseDown = this.onMouseDown.bind(this)
  }

//   onHeaderCell(column => {
//   let colw = this.state.columnWidth;
//   return {
//   onMouseDown: e => {
//   this.mouseDownX = e.clientX;
//   this.beginDrag = true;
// },
// onMouseUp: () => {
//   this.beginDrag = false;
// },
//   onMouseMove: e => {
//   if(this.beginDrag === true) {
//     this.updateColumnWidth(colw +
//       Math.round((e.clientX - this.mouseDownX)*.05));
//   }
// }
// };
// }
  onMouseDown(e) {
    // only left mouse button
  //  if (e.button !== 0) return
  //   var pos = $(this.getDOMNode()).offset()
  //   this.setState({
  //     dragging: true,
  //     rel: {
  //       x: e.pageX - pos.left,
  //       y: e.pageY - pos.top
  //     }
  //   })
  //   e.stopPropagation()
  //   e.preventDefault()
  }

  getBoxClass(){
    let classes = []
    if(this.props.maxContent) classes.push('maxContent')
    if(this.props.locked) classes.push('locked')
    return classnames(classes)
  }

  onMouseUp(e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  }
  onMouseMove(e) {
    if (!this.state.dragging) return
    this.setState({
      pos: {
        x: e.pageX - this.state.rel.x,
        y: e.pageY - this.state.rel.y
      }
    })
    e.stopPropagation()
    e.preventDefault()
  }


  getStyle() {
    return this.props.readOnly
      ? classnames('readOnly')
      : classnames('storyPage', 'hidden')
  }

  render(){
    const { header, children, text, maxContent, locked } = this.props
    console.log(maxContent)

    const content =  <div className={this.getBoxClass()}>
      {children}
      <div className="columnDragger" onMouseDown={this.onMouseDown()}/>
      <svg className="tableInputLockIcon" viewBox="0 0 24 24">
        <path d="M18 8C19.1 8 20 8.89 20 10V20C20 21.1 19.1 22 18 22H6C4.89 22 4 21.1 4 20V10C4 8.89 4.89 8 6 8H7V6C7 3.24 9.24 .998 12 .998C14.76 .998 17 3.24 17 6V8H18M12 3C10.34 3 9 4.34 9 6V8H15V6C15 4.34 13.66 3 12 3M11 19L17.25 12.76L15.84 11.35L11 16.18L8.41 13.6L7 15L11 19Z" />
      </svg>
      <div className="rowDragger"/>
    </div>

    if(header){
      return (<th className="tableListCol">
        {content}
      </th>)
    }
    else {
      return (
        <td className="tableListCol">
          {content}
        </td>
      )
    }
  }
}

export default ResizableBox

ResizableBox.defaultProps = {
  maxContent: true
}

