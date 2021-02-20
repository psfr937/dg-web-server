// index.js
import inventories from './inventories';
import cart from './cart';
import account from "./account/account";
import auth from "./account/auth";
import me from "./account/me";

import { all } from "redux-saga/effects"

export default function* rootSaga() {
  yield all([
    ...inventories,
    ...cart,
    ...account,
    ...auth,
    ...me
  ])
}