// index.js
import { all } from "redux-saga/effects"

import inventories from './inventories';
import cart from './cart';
import account from "./account/account";
import auth from "./account/auth";
import plts from "./plts";
import plan from "./plan";
import pms from './pms';
import profile from "./account/profile";
import quotation from "./quotation";
import stripe from "./stripe";
import transaction from "./transaction";
import addresses from "./addresses";
import bts from "./bts";

export default function* rootSaga() {
  yield all([
    ...account,
    ...addresses,
    ...inventories,
    ...cart,
    ...auth,
    ...profile,
    ...plan,
    ...plts,
    ...pms,
    ...quotation,
    ...stripe,
    ...transaction,
    ...bts
  ])
}