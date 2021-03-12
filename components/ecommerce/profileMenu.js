import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import st from './filterMenu.module.scss'

class ProfileMenu extends PureComponent{
  constructor(props){
    super(props);
    this.onClickPlan = this.onClickPlan.bind(this)
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  render(){

    return (
      <div className={st.filterMenu}>
        <div className={st.filterByText}>
          <h4> Filter By</h4>
        </div>
        <div className={st.searchBarContainer}>
          <svg viewBox="0 0 24 24">
            <path d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14M12,10H10V12H9V10H7V9H9V7H10V9H12V10Z" />
          </svg>
          <input placeholder={"styles / names / brands..."}/>
        </div>
        <div className={st.filterSection}>
          <h4>Style</h4>
        </div>
        <div className={st.filterSection}>
          <h4>Brand</h4>
        </div>
        <div className={st.filterSection}>
          <h4>Color</h4>
        </div>
        <div className={st.filterSection}>
          <h4>Size</h4>
        </div>
        <div className={st.filterSection}>
          <h4>Price</h4>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cartItems}) => {
  return {
    cartItems
  }
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ProfileMenu)