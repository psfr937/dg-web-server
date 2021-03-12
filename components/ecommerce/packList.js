import React, { useEffect } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import st from './kitForm.module.scss'
import { FETCH_PLTS } from "../../redux/reducers/ecommerce/plts";

export default function PackList(){

  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch({type: FETCH_PLTS})
  });

  const plts = useSelector(state => state.plts.readyStatus === 'FETCH_PLTS_SUCCESS' ?
    (Object.keys(state.plts.data).map(k => state.plts.data[k])) : [])

  return (
    <div className={st.kitFormQuestion}>
      <h3> How Many Clothes do you have? </h3>
      <h4> This helps us know the delivery cost </h4>
      {
        this.props.plts.map(plt => (<div className={st.clothingTypeOption}>
            plt
            <button> + </button>
            <button> {this.props.packList[plt]} </button>
          </div>)
        )
      }
    </div>
  )
}