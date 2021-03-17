// index.js
import { all } from "redux-saga/effects"

import inventories from './ecommerce/inventories';
import cart from './ecommerce/cart';
import account from "./account/account";
import auth from "./account/auth";
import plts from "./ecommerce/plts";
import plan from "./ecommerce/plan";
import pms from './ecommerce/pms';
import profile from "./account/profile";
import quotation from "./ecommerce/quotation";
import stripe from "./ecommerce/stripe";
import transaction from "./ecommerce/transaction";
import addresses from "./ecommerce/addresses";
import bts from "./ecommerce/bts";
import editInventory from "./cms/editInventory";
import tags from "./ecommerce/tags";
import sizes from "./ecommerce/sizes";
import users from "./cms/users";

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
    ...bts,
    ...editInventory,
    ...tags,
    ...sizes,
    ...users
  ])
}