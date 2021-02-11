import React from 'react'

class Input extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return <Input
      value={this.state.value}
      type="text" name="name"
      onChange={this.handleChange}
    />
  }
}


export default Input


