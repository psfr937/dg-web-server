import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import st from './filterMenu.module.scss'

class FilterMenu extends PureComponent{

  constructor(props){
    super(props)
    this.onClickPlan = this.onClickPlan.bind(this)
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  render(){

    return (
      <div className={st.filterMenu}>
        <h4>Women</h4>

        <h4>Filter</h4>

      </div>
    )
  }
}

const mapStateToProps = ({cartItems}) => {
  return {
    cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(FilterMenu)