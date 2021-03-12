import {useDispatch, useSelector} from "react-redux";
import st from "./addressList.module.scss";
import React, { useEffect } from "react";
import { FETCH_ADDRESSES_SUCCESS, SELECT_ADDRESS_ID } from "../../redux/reducers/ecommerce/address/addresses";
import { TOGGLE_ADDRESS_BOX } from "../../redux/reducers/ecommerce/ux";
import classnames from 'classnames'
import { FETCH_ADDRESSES_AND_GET_QUOTATION, FETCH_ADDRESSES } from "../../redux/actions/ecommerce/addresses";

export default function AddressList(){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_ADDRESSES_AND_GET_QUOTATION });
  }, []);


  const selectAddress = (id) => dispatch({ type: SELECT_ADDRESS_ID, id: id });

  const openAddAddressBox = () => dispatch({ type: TOGGLE_ADDRESS_BOX, data: true});

  const addresses = useSelector(state => state.addresses);
  const selectedAddressId = addresses.selectedAddressId;

  const data = (addresses.readyStatus !== FETCH_ADDRESSES_SUCCESS) ? []
    : Object.keys(addresses.data).map(k => addresses.data[k]);
  console.log(data)

  const addressCardClass = id => selectedAddressId === id ?
    classnames(st.addressCard, st.selected) : st.addressCard;

  return (
    <div className={st.addressList}>
        { data.map(d =>
          <div onClick={() => selectAddress(d.id)} className={addressCardClass(d.id)}>
                <h5>{ d.formatted } </h5>

          </div>
        )}
      <button onClick={openAddAddressBox}> Add Address </button>

    </div>
  )

}