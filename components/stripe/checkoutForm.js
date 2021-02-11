import React from "react";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import {connect} from "react-redux";
import { checkout } from "../../redux/actions/checkout";
import axios from 'axios'
import console from "../../pages/console";

class CheckoutForm extends React.PureComponent{

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.options = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder':{
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    }
  }

  async handleSubmit(event){
    event.preventDefault();
    const { error, paymentMethod } = await this.props.stripe.createPaymentMethod({
      type: "card",
      card: this.props.elements.getElement(CardElement),
    });

    if (!error) {
        const {id: token} = paymentMethod;
        this.props.submitPayment(token)
    }
    else{
      window.console.error(error)
    }
  }


  render() {
    return (
    <form className="stripeForm" onSubmit={this.handleSubmit} style={{maxWidth: 400}}>
      <div className="form-row">
        <label for="card-element"> Credit or debit card </label>
        <CardElement
          options={this.options}
        />
        <button className="stripeFormButton" type="submit">Submit Payment</button>
      </div>
    </form>)
  }
}

const mapDispatchToProps = (dispatch, ourProps) => ({
  submitPayment: (token) => dispatch( checkout(token))
});

const ConnectedCheckoutForm = connect(
  null,
  mapDispatchToProps
)(CheckoutForm);

export default () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <ConnectedCheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);