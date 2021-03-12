import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import ImageChanger from './imageChanger'
import { EDIT_SERVICE_ATTACHMENT } from '../../../redux/reducers/booking/serviceReducer/editService'


export default function ServiceImageChanger({ id = 0 }){

  const dispatch = useDispatch();

  const editAttachment = data =>
    dispatch({
      type: EDIT_SERVICE_ATTACHMENT,
      data: data,
      id: id
    });

  const selectedId = id;
  const selectedData = useSelector(state => state.editService[selectedId]);
  const notNull = typeof selectedData !== 'undefined';
  const picture_url = notNull ? selectedData.picture_url: null;
  const files = notNull ? selectedData.files: null;
  const fileErrors = notNull ? selectedData.fileErrors: null;

  return (
    <ImageChanger
      withIcon={true}
      buttonText='Choose images'
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
      maxFileSize={5242880}
      layout='full'
      editAttachment={editAttachment}
      picture_url={picture_url}
      files={files}
      fileErrors={fileErrors}
    />
  )
}
