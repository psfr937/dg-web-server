import React, { PureComponent } from 'react';
import { ADD_PRODUCT, REMOVE_PRODUCT } from "../../../redux/reducers/booking/visitReducer/editVisit";
import {connect} from "react-redux";
import { fetchProducts } from '../../../redux/actions/booking/productAction/products'


class ProductMenu extends PureComponent {
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
    this.props.fetchProducts()
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
    this.props.addProduct(val)
    this.setState({dropDownActive: false})

  }

  toggleDropDown(){
    this.setState({dropDownActive: !this.state.dropDownActive})
  }

  render() {
    const {isLoading, productData, selectedProducts, readOnly } = this.props
    const selectedProductsIds = selectedProducts.map(s => s.id)
    const maxOptions = this.maxOptions
    console.log(productData)
    const data = Object.keys(productData)
      .map(k => productData[k])
      .filter(d => selectedProductsIds.indexOf(d.id) < 0 && typeof d.name === 'string' && d !== '' )
    return (
      <div className="dropDown">
        <div onClick={this.toggleDropDown} className="dropDownInput">Add a product</div>
        <div className={this.state.dropDownActive === true ? "dropDownContent": "dropDownContent hidden"}>
          { data.map(d => {
            return <div onClick={() => this.handleSelect(d)}>{d.name}</div>
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products }) => {
  console.log(products)
  return {
    productData: 'data' in products ? products.data: {}
  };
};


const mapDispatchToProps = (dispatch, ourProps) => ({
  addProduct: (value) =>  dispatch({
    type: ADD_PRODUCT,
    visitId: ourProps.visitId,
    value
  }),
  fetchProducts: () => dispatch(fetchProducts())
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

ProductMenu.defaultProps = {
  readOnly: true
}

export default connector(ProductMenu)