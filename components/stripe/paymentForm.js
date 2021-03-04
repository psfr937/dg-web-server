import React, { useState, useEffect } from "react";

import {connect, useDispatch, useSelector} from "react-redux";
import { CREATE_SETUP_INTENT_SUCCESS } from "../../redux/reducers/cart/createSetupIntent";
import { CREATE_SETUP_INTENT } from "../../redux/actions/stripe";
import { numberOptions, cvcOptions, expiryOptions } from "@components/stripe/stripeElementsOptions";
import loaderSt from './loader.module.scss';
import Spinner from "../spinner";
import {loadStripe} from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement, Elements,
  useStripe, useElements
} from "@stripe/react-stripe-js";
import {ADD_PM, BUY, SELL} from "../../redux/actions/transaction";

const stripeTestPromise = loadStripe('pk_test_F4EG4MqVhoWyuxSs8jIO2xIr');

const types = {
  ADD_PM: 'ADD_PM',
  SELL: 'SELL',
  BUY: 'BUY'
}

//https://stripe.com/docs/api/setup_intents/confirm?lang=node
function PaymentForm({ type = types.BUY }){

  const stripe = useStripe();
  const elements = useElements();

  const [ succeeded, setSucceeded ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ processing, setProcessing ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);
  const [ empty, setEmpty ] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch({type: CREATE_SETUP_INTENT});
  }, []);

  const createSetupIntent = useSelector(state => state.createSetupIntent);
  const createSetupIntentReady = createSetupIntent.readyStatus === CREATE_SETUP_INTENT_SUCCESS;
  const clientSecret = createSetupIntent.clientSecret;

  const handleChange = async e => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(createSetupIntent);
    setProcessing(true);

    const payload = await stripe.confirmCardSetup(
      clientSecret.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement)
        }
      }
    );
    console.log(payload)
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      switch(type) {
        case types.BUY:
          dispatch({type: BUY,  savePm: true, paymentMethod: payload.setupIntent.payment_method});
          break;
        case types.SELL:
          dispatch({type: SELL, savePm: true, paymentMethod: payload.setupIntent.payment_method});
          break;
        case types.ADD_PM:
          dispatch({type: ADD_PM, paymentMethod: payload.setupIntent.payment_method});
          break;
        default:
          break;
      }
    }
  };

  const isButtonDisabled = () => !createSetupIntentReady || disabled
    || processing || succeeded;


  return (
    <form className="StripeForm" onSubmit={handleSubmit} style={{maxWidth: 400}}>
      <label>
        <h4> Card Information </h4>
        <CardNumberElement
          handleChange={handleChange}
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

      <h6> 謹此聲明本人已年滿18歲。
        I declare that I am over 18 years old.
        按「確認付款」後，你的交易便不能取消。
      </h6>
      <button
        disabled={isButtonDisabled()}
        className={loaderSt.stripeFormButton}
        type="submit"
      >
        {processing || !createSetupIntentReady ? (

          <Spinner/>

        ) : (
          "Continue"
        )}
      </button>
      <h6>本人點擊「確認付款」，即代表本人已同意本人的購買將受  一般條款及細則  及  私隱政策  的約束。</h6>

    </form>
  )

}

export default () => {
  return (
    <div className="checkoutForm">
      <Elements stripe={stripeTestPromise}>
          <PaymentForm/>
      </Elements>
    </div>
  );
};
