import React, { useEffect } from 'react'
import st from './kitForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {FETCH_BTS} from "../redux/actions/bts";
import {FETCH_BTS_SUCCESS} from "../redux/reducers/bts";
import {SELECT_BAG, SELECT_RECYCLE_POLICY} from "../redux/reducers/kitOptions";

export default function KitForm(){

  const dispatch= useDispatch();

  useEffect(() => {
    dispatch({type: FETCH_BTS })
  }, []);

  const selectBag = (id) => {
    dispatch({ type: SELECT_BAG, data: id })
  }

  const selectRecyclePolicy = (bool) => {
    dispatch({ type: SELECT_RECYCLE_POLICY, data: bool })
  }

  const bts = useSelector(state => state.bts.readyStatus !== FETCH_BTS_SUCCESS
   ? [] : Object.keys(state.bts.data).map(k => state.bts.data[k]));
  const kitOptions = useSelector(state => state.kitOptions);

  return (
    <div className={st.kitForm}>
      <div className={st.kitFormQuestion}>
        <h3> A few? Or a lot? Choose your bag!  </h3>
        <h4> We will borrow you a bag to let you store all your clothes you want to sell. </h4>
        <div className={st.kitFormOptionRow}>
          {
            bts.map(b =>
              <div className={kitOptions.bagTypeId === b.id ? st.selected: null}
                   onClick={() => selectBag(b.id)}>
                <h5> { b.name }</h5>
                <h6> {`${b.length}cm(l) x ${b.width}cm(w) x ${b.height}cm(h)`} </h6>
              </div>
            )
          }
        </div>
      </div>
      <div className={st.kitFormQuestion}>
        <h3> What to do if your items are not accepted? </h3>
        <h4> In order to protect our users, on average only 40% of items we received from sellers meet our quality test. </h4>
        <div className={st.kitFormOptionColumn}>
          <div className={kitOptions.recycleUnused === true ? st.selected: null}
               onClick={() => selectRecyclePolicy(true)}>
            <h5> Recycle My Items</h5>
            <h6> Giving is Happiness </h6>
          </div>
          <div className={kitOptions.recycleUnused === false ? st.selected: null}
               onClick={() => selectRecyclePolicy(false)}>
            <h5> Return my Items</h5>
            <h6> You will need to pay the delivery fee required for delivering the items
              back to your home.</h6>
          </div>
        </div>
      </div>
    </div>
  )
}