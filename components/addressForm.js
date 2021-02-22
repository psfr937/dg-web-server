import React, { useState } from 'react'
import st from './addressForm.module.scss'
import GoogleMapReact from 'google-map-react';
import config from '../config/index'
import {useDispatch, useSelector} from "react-redux";
import { GET_QUOTATION } from "../redux/reducers/address/getQuotation";

function MapMarker() {
    return <svg viewBox="0 0 24 24">
      <path
        d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
    </svg>
}

export default function AddressForm({ zoom= 19 }){

    const center = useSelector(state => state.address);

    const [ lineOne, setLineOne ] = useState('');
  const [ lineTwo, setLineTwo ] = useState('');
  const [ city, setCity ] = useState('');
  const [ zip, setZip ] = useState('');
  const [ province, setProvince ] = useState('');
  const [ country, setCountry ] = useState('');

  const dispatch = useDispatch();
  const submitAddress = dispatch({
    type: GET_QUOTATION, data: {
      lineOne, lineTwo, city, zip, province, country
    }
  });
    return (
      <div className={st.addressForm}>
        <form onSubmit={submitAddress}>
            <label>
              <h4> Delivery Address </h4>
              <div className={st.addressFormField}>
                <label>Address Line 1</label>
                <input onChange={setLineOne} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Address Line 2</label>
                <input onChange={setLineTwo} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>City</label>
                <input onChange={setCity} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>State/Province</label>
                <input onChange={setProvince} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Zip/Postal Code</label>
                <input onChange={setZip} type="address" className="FormBase"/>
              </div>
              <div className={st.addressFormField}>
                <label>Country</label>
                <input onChange={setCountry} type="address" className="FormBase"/>
              </div>
            </label>
            <button type="submit"> Use Address </button>
        </form>
        <div style={{ height: '200px', width: '300px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: config.googleApiKey /* YOUR KEY HERE */ }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <MapMarker
              lat={this.props.lat}
              lng={this.props.lng}
              text="Your Location"
            />
          </GoogleMapReact>
        </div>
      </div>


    )
}

