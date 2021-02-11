
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { stripe as stripePublicKey } from '../../config'

import CheckoutForm from "./checkoutForm";

const stripeTestPromise = loadStripe(stripePublicKey);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;