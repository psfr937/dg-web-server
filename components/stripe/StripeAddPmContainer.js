
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripe as stripePublicKey } from '../../config'

import AddPmForm from './addPmForm'


const stripeTestPromise = loadStripe('pk_test_F4EG4MqVhoWyuxSs8jIO2xIr');

const StripePmContainer = () => {
  return (
    <div className="checkoutForm">
      <Elements stripe={stripeTestPromise}>
        <AddPmForm/>
      </Elements>
    </div>
  );
};

export default StripePmContainer;