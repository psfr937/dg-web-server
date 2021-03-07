import React from 'react';
import {connect} from "react-redux";
import ImageChanger from './imageChanger'
import { EDIT_SERVICE_ATTACHMENT } from '../../../redux/reducers/serviceReducer/editService'


class ServiceImageChanger extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageChanger
        withIcon={true}
        buttonText='Choose images'
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        layout='full'
        {...this.props}
      />
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  editAttachment: (data) => dispatch({
    type: EDIT_SERVICE_ATTACHMENT,
    data: data,
    id: ownProps.id
  })
});

const mapStateToProps = ({ editService }, ownProps) => {
  console.log(editService)

  const selectedId = ownProps.id
  console.log(selectedId)
  const selectedData = editService[selectedId]

  const notNull = typeof selectedData !== 'undefined'

  return {
    picture_url: notNull ? selectedData.picture_url: null,
    files: notNull ? selectedData.files: null,
    fileErrors: notNull ? selectedData.fileErrors: null

  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

ServiceImageChanger.defaultProps = {
  id: 0
};


export default connector(ImageChanger)