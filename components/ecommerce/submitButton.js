import React from 'react'

import { submitAnswer } from "../redux/actions/submitAnswer";
import {connect} from "react-redux";

class SubmitButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = () => {

}

const mapDispatchToProps =  dispatch => ({
  submitAnswer: () => dispatch(submitAnswer())
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default connector(SubmitButton)