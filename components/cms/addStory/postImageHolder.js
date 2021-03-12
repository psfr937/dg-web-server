import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import st from './addInventory.module.scss'
import {REMOVE_ATTACHMENT} from "../../../redux/reducers/cms/editInventory";

export default function PostImageHolder({
    setSelectedPicture
}){
  const dispatch = useDispatch();
  const images = useSelector(state => state.editInventory.images);

  const removeImage = (idx) => {
    dispatch({type: REMOVE_ATTACHMENT, idx: idx});
  };

  return (
    <React.Fragment>
      {
        images.map((image, idx) => {
          return (
            <div key={idx} className={st.uploadPictureContainer}>

              <img  onClick={() => setSelectedPicture(image.url)} src={image.url} className={st.uploadPicture} alt="preview"/>
              <div className={st.deleteImage} onClick={() => removeImage(idx)}> <h6>Remove</h6></div>
            </div>
          );
        })
      }
    </React.Fragment>
  )
}
