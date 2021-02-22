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


export default function* rootSaga() {
  yield all([
    ...account,
    ...inventories,
    ...cart,
    ...auth,
    ...profile,
    ...plan,
    ...plts,
    ...pms,
    ...quotation
  ])
}