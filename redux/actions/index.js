// index.js
import inventories from './inventories';
import cart from './cart';
import account from "./account/account";
import auth from "./account/auth";
import me from "./account/me";
import plts from "./plts";
import plan from "./plan";
import pms from './pms'

import { all } from "redux-saga/effects"


export default function* rootSaga() {
  yield all([
    ...account,
    ...inventories,
    ...cart,
    ...auth,
    ...me,
    ...plan,
    ...plts,
    ...pms
  ])
}