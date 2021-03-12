import React from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement, Elements,
  ElementsConsumer
} from "@stripe/react-stripe-js";
import router from 'next/router'
import {connect, useDispatch, useSelector} from "react-redux";
import { CREATE_PAYMENT_INTENT_SUCCESS} from "../redux/reducers/ecommerce/cart/createPaymentIntent";
import { CREATE_SETUP_INTENT } from "../redux/actions/ecommerce/stripe";
import { CREATE_PAYMENT_INTENT } from "../redux/actions/ecommerce/stripe";
import { numberOptions, cvcOptions, expiryOptions } from "@components/ecommerce/stripe/stripeElementsOptions";
import loaderSt from '@components/ecommerce/stripe/loader.module.scss';
import Spinner from "@components/ecommerce/spinner";
import {loadStripe} from "@stripe/stripe-js";

const stripeTestPromise = loadStripe('pk_test_F4EG4MqVhoWyuxSs8jIO2xIr');

//https://stripe.com/docs/api/setup_intents/confirm?lang=node
function PaymentForm({ stripe = null, elements = null, payNow = false }){

  const [ succeeded, setSucceeded ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ processing, setProcessing ] = useState(true);
  const [ disabled, setDisabled ] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if(payNow) {
      dispatch({type: CREATE_PAYMENT_INTENT});
    }
    else{
      dispatch({type: CREATE_SETUP_INTENT});
    }
  }, []);

  const createPaymentIntent = useSelector(state => state.createPaymentIntent);
  const createPaymentIntentReady = createPaymentIntent.readyStatus === CREATE_PAYMENT_INTENT_SUCCESS;
  const clientSecret = createPaymentIntent.clientSecret;

  const handleChange = async e => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);
    let setupPayload;
    let paymentPayload;
    if(payNow === false){
      paymentPayload = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)
          }
        }
      )
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        router.push('/checkout-success')
      }

    }else{
      setupPayload = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement)
          }
        }
      );
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        router.push('/checkout-success');
        dispatch({type: TRANSACTION, paymentMethod: setupPayload.paymentMethod })
      }
    }


  };

  const isButtonDisabled = () => !createPaymentIntentReady || disabled
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


      <button
        disabled={isButtonDisabled()}
        className={loaderSt.stripeFormButton}
        type="submit"
      >
        {processing || !createPaymentIntentReady ? (

          <Spinner/>

        ) : (
          "Continue"
        )}
      </button>
    </form>
  )

}

export default ({ payNow = false }) => {
  return (
    <div className="checkoutForm">
      <Elements stripe={stripeTestPromise}>
        <ElementsConsumer>
          {({stripe, elements}) => (
            <PaymentForm stripe={stripe} elements={elements} payNow={payNow} />
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};
