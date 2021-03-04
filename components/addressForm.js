import React, { useState } from 'react'
import st from './addressForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {GET_BUY_QUOTATION, GET_SELL_QUOTATION} from "../redux/actions/quotation";
import {TOGGLE_ADDRESS_BOX} from "../redux/reducers/ux";

export default function AddressForm({
  formPurpose = 'BUY'
}){
  const [ lineOne, setLineOne ] = useState('');
  const [ lineTwo, setLineTwo ] = useState('');
  const [ city, setCity ] = useState('');
  const [ zip, setZip ] = useState('');
  const [ province, setProvince ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');

  const dispatch = useDispatch();
  const closeForm = () => dispatch({type: TOGGLE_ADDRESS_BOX, data: false});


  const submitAddress = e => {
    e.preventDefault();
    dispatch({
      type: formPurpose === 'BUY' ? GET_BUY_QUOTATION : GET_SELL_QUOTATION,
      newAddress: {
        lineOne, lineTwo, city, zip, province, country, recipientName: name,
        recipientPhone: phone
      }
    });
  };

    return (
      <div className={st.addressForm}>
        <form onSubmit={submitAddress}>
            <label>
              <div className={st.addressFormField}>
                <label>Address Line 1</label>
                <input onChange={e => setLineOne(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Address Line 2</label>
                <input onChange={e => setLineTwo(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>City</label>
                <input onChange={e => setCity(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>State/Province</label>
                <input onChange={e => setProvince(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Zip/Postal Code</label>
                <input onChange={e => setZip(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Country</label>
                <input onChange={e => setCountry(e.target.value)} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Recipient Name</label>
                <input onChange={e => setName(e.target.value)} type="text" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Recipient Phone</label>
                <input onChange={e => setPhone(e.target.value)} type="text" className="FormBase"/>
              </div>
            </label>
            <div>
              <button type="button" onClick={closeForm}> Cancel </button>
              <button type="submit"> Confirm </button>
            </div>
        </form>
      </div>
    )
}

