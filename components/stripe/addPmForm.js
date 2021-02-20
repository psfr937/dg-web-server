import React from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import router from 'next/router'
import {connect} from "react-redux";
import { addPm } from "../../redux/actions/pms";
import { createPaymentIntent } from '../../redux/actions/cart'
import {CREATE_PAYMENT_INTENT_SUCCESS} from "../../redux/reducers/cart/createPaymentIntent";
import { numberOptions, cvcOptions, expiryOptions } from "@components/stripe/stripeElementsOptions";
import loaderSt from './loader.module.scss'
class AddPmForm extends React.PureComponent{

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      succeeded: false,
      error: null,
      processing: true,
      disabled: false
    }

    this.setError = this.setError.bind(this)
    this.setProcessing = this.setProcessing.bind(this)
    this.setSucceeded = this.setSucceeded.bind(this)
    this.setDisabled = this.setDisabled.bind(this)
    this.isButtonDisabled = this.isButtonDisabled.bind(this)
  }

  componentDidMount() {
    this.props.createPaymentIntent()
  }

  setError(err){
    this.setState({error: err})
  }

  setProcessing(boo){
    this.setState({processing: boo})
  }

  setSucceeded(boo){
    this.setState({succeeded: boo})
  }

  setDisabled(boo){
    this.setState({disabled: boo})
  }

  async handleChange(event){
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    this.setDisabled(event.empty);
    this.setError(event.error ? event.error.message : "");
  }

  async handleSubmit(event){
    event.preventDefault();
    this.setProcessing(true);
    const payload = await this.props.stripe.confirmCardPayment(
      this.props.clientSecret,
  {
          payment_method: {
            card: this.props.elements.getElement(CardNumberElement)
          }
        }
      );
    console.log(payload)

    if (payload.error) {
      this.setError(`Payment failed ${payload.error.message}`);
      this.setProcessing(false);
    } else {
      this.setError(null);
      this.setProcessing(false);
      this.setSucceeded(true);
      router.push('/checkout-success')
    }
  }

  isButtonDisabled(){
    return !this.props.createPaymentIntentReady
    || this.state.disabled || this.state.processing || this.state.succeeded
  }

  render() {
    return (
      <form className="StripeForm" onSubmit={this.handleSubmit} style={{maxWidth: 400}}>
          <label>
            <h4> Card Information </h4>
            <CardNumberElement
              handleChange={this.handleChange}
              options={numberOptions}
              onReady={() => {
                console.log("CardNumberElement [ready]");
              }}
              onChange={event => {
                console.log("CardNumberElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardNumberElement [blur]");
              }}
              onFocus={() => {
                console.log("CardNumberElement [focus]");
              }}
            />
          </label>
          <div className={"ExpiryAndCvcRow"}>
            <label>
              <CardExpiryElement
                options={expiryOptions}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>

            <label>
              <CardCvcElement
                options={cvcOptions}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
          </div>
          <label>
            <h4> Name on card </h4>
            <input className="FormBase"/>
          </label>
        

          <button
            disabled={this.isButtonDisabled()}
            className={loaderSt.stripeFormButton}
            type="submit"
          >
            {this.state.processing || !this.props.createPaymentIntentReady ? (

                <div className={loaderSt.loader}>
                  <svg className={loaderSt.circular} viewBox="25 25 50 50">
                    <circle className={loaderSt.path} cx="50" cy="50" r="20" fill="none" stroke-width="4"
                            stroke-miterlimit="10"/>
                  </svg>
                </div>

            ) : (
              "Continue"
            )}
          </button>
      </form>
    )
  }
}

const mapStateToProps = ({createPaymentIntent}) => {
  return {
    createPaymentIntentReady: createPaymentIntent.readyStatus === CREATE_PAYMENT_INTENT_SUCCESS,
    clientSecret: createPaymentIntent.clientSecret
  }
}


const mapDispatchToProps = (dispatch, ourProps) => ({
  createPaymentIntent: () => dispatch(createPaymentIntent()),
  addPm: (token) => dispatch( addPm(token))
});

const ConnectedAddPmForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPmForm);

export default () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <ConnectedAddPmForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);