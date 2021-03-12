import React, { PureComponent } from 'react';
import { EDIT_VISIT_ROW } from "../../../redux/reducers/booking/visitReducer/editVisit";
import {connect} from "react-redux";
import { fetchStaffs } from '../../../redux/actions/booking/staffAction/staffs'


class StaffMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.customFilter = this.customFilter.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.maxOptions = 5
    this.state = {
      dropDownActive: false
    }
  }


  componentDidMount() {
    this.props.fetchStaffs()
  }

  customFilter(option, searchText) {
    const name = option.data.name
    if (
      typeof name === 'string' && name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSelect(val){
    console.log(val)
    this.props.changeStaff(val)
    this.setState({dropDownActive: false})

  }

  toggleDropDown(){
    this.setState({dropDownActive: !this.state.dropDownActive})
  }

  render() {
    const {isLoading, staffData, staffName, readOnly } = this.props
    const data = Object.keys(staffData)
      .map(k => staffData[k])
    return (
      <div className="dropDown">
        <div onClick={this.toggleDropDown} className="dropDownInput">{staffName}</div>
        <div className={this.state.dropDownActive === true ? "dropDownContent": "dropDownContent hidden"}>
          { data.map(d => {
            return <div onClick={() => this.handleSelect(d.id)}>{d.name}</div>
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ staffs }) => {
  return {
    staffData: 'data' in staffs ? staffs.data: {}
  };
};


const mapDispatchToProps = (dispatch, ourProps) => ({
  changeStaff: (value) =>  dispatch({
    type: EDIT_VISIT_ROW,
    id: ourProps.visitId,
    field: 'staff_id',
    value
  }),
  fetchStaffs: () => dispatch(fetchStaffs())
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

StaffMenu.defaultProps = {
  readOnly: true
}

export default connector(StaffMenu)