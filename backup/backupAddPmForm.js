import React from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import {connect} from "react-redux";
import { addPm } from "../redux/actions/ecommerce/pms";

import st from '@components/ecommerce/stripe/checkout.module.scss'

class AddPmForm extends React.PureComponent{

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.numberOptions = {
      showIcon: true,
      classes: {
        base: "FormBase SpecialFormBase",
      },
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '24px',
          fontWeight: 300,
          fontSize: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder':{
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
          borderColor: '#fa755a'
        }
      }
    }

    this.expiryOption = {
      showIcon: true,
      classes: {
        base: "ExpiryBox"
      },
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '24px',
          fontWeight: 300,
          fontSize: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
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

    this.cvcOption = {
      showIcon: true,
      classes: {
        base: "CvcBox"
      },
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '24px',
          fontWeight: 300,
          fontSize: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
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
      card: this.props.elements.getElement(this.cardElement),
    });

    if (!error) {
      const {id: token} = paymentMethod;
      this.props.addPaymentMethod(token)
    }
    else{
      window.console.error(error)
    }
  }


  render() {
    return (
      <form className="StripeForm" onSubmit={this.handleSubmit} style={{maxWidth: 400}}>
        <label>
          <h4> Card Information </h4>
          <CardNumberElement
            options={this.numberOptions}
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
              options={this.expiryOption}
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
              options={this.cvcOption}
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
        <label>
          <h4> Delivery Address </h4>
          <input placeholder="Address Line 1" type="address" className="FormBase"/>
          <input placeholder="Address Line 2" type="address" className="FormBase"/>
        </label>

        <h6> 謹此聲明本人已年滿18歲。
          I declare that I am over 18 years old.
          按「確認付款」後，你的交易便不能取消。
        </h6>
        <button className="StripeFormButton" type="submit">Continue</button>
        <h6>本人點擊「確認付款」，即代表本人已同意本人的購買將受  一般條款及細則  及  私隱政策  的約束。</h6>

      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, ourProps) => ({
  addPm: (token) => dispatch( addPm(token))
});

const ConnectedAddPmForm = connect(
  null,
  mapDispatchToProps
)(AddPmForm);

export default () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <ConnectedAddPmForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);