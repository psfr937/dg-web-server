import React, { PureComponent } from 'react';
import { ADD_SERVICE, REMOVE_SERVICE } from "../../../redux/reducers/visitReducer/editVisit";
import {connect} from "react-redux";
import { fetchServices } from '../../../redux/actions/serviceAction/services'


class ServiceMenu extends PureComponent {
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
    this.props.fetchServices()
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
    if (val === null) val = []
    this.props.addService(val)
    this.setState({dropDownActive: false})

  }

  toggleDropDown(){
    this.setState({dropDownActive: !this.state.dropDownActive})
  }

  render() {
    const {isLoading, serviceData, selectedServices, readOnly } = this.props
    const selectedServicesIds = selectedServices.map(s => s.id)
    const maxOptions = this.maxOptions
    console.log(serviceData)
    const data = Object.keys(serviceData)
      .map(k => serviceData[k])
      .filter(d => selectedServicesIds.indexOf(d.id) < 0 && typeof d.name === 'string' && d !== '' )
    return (
      <div className="dropDown">
        <div onClick={this.toggleDropDown} className="dropDownInput">Add a service</div>
       <div className={this.state.dropDownActive === true ? "dropDownContent": "dropDownContent hidden"}>
         { data.map(d => {
           return <div onClick={() => this.handleSelect(d)}>{d.name}</div>
         })}
       </div>
      </div>
    )
  }
}

const mapStateToProps = ({ services }) => {
  console.log(services)
  return {
    serviceData: 'data' in services ? services.data: {}
  };
};


const mapDispatchToProps = (dispatch, ourProps) => ({
  addService: (value) =>  dispatch({
      type: ADD_SERVICE,
      visitId: ourProps.visitId,
      value
    }),
  fetchServices: () => dispatch(fetchServices())
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

ServiceMenu.defaultProps = {
  readOnly: true
}

export default connector(ServiceMenu)