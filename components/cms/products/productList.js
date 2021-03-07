import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from "../../../redux/actions/productAction/products"
import classnames from 'classnames'
import ResizableBox from "../table/resizableBox";
import TableInput from "../table/tableInput";
import EditProductButton from '../table/editTableButton'
import { ADD_EDIT_PRODUCT_ROW,
EDIT_PRODUCT_ROW} from "../../../redux/reducers/productReducer/editProduct";
import AddProductRowButton from "../table/addTableRowButton";
import SaveProductsButton from '../table/saveTableButton'
import {saveProducts} from "../../../redux/actions/productAction/saveProducts";
import ProductDetail from "./productDetail";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {FETCH_PRODUCTS_INVALID} from "../../../redux/reducers/productReducer/products";
import MoreDetailButton from "../table/moreDetailButton";
import {fetchVisits} from "../../../redux/actions/visitAction/visits";
import {SET_READ_ONLY} from "../../../redux/reducers/ux";
import HOCRemoveRowButton from "../table/removeRowButton";
import HOCUndoRemoveRow from "../table/undoRemoveRow";
import PicturePreviewPopup from '../picturePreviewPopup'

const ProductTableInput = TableInput('PRODUCT')
const RemoveRowButton = HOCRemoveRowButton('PRODUCT')
const UndoRemoveRow = HOCUndoRemoveRow('PRODUCT')

class ProductList extends PureComponent{

  constructor(props){
    super(props)
    this.readOnlyRowStyle = this.readOnlyRowStyle.bind(this)
    this.enableEditFunc = this.enableEditFunc.bind(this)
    this.addProductRow = this.addProductRow.bind(this)
    this.saveProducts = this.saveProducts.bind(this)
    this.openDetail = this.openDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
    this.isOpened = this.isOpened.bind(this)
    this.state = {
      selectedDetailId: -1,
    }
    this.targetElement = null
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#tableListContainer');
    this.props.fetchProducts()
  }

  readOnlyRowStyle() {
    return this.props.readOnly
      ? classnames('readOnly', "tableListRow")
      : classnames("tableListRow")
  }

  enableEditFunc(){
    this.props.setReadOnly(!this.props.readOnly)
  }

  scrollToBottom() {
    this.productList.scrollIntoView({ behavior: "smooth"})
  }

  saveProducts(){
    this.props.saveProducts()
  }

  addProductRow(){
    console.log('called')
    this.scrollToBottom()
    this.props.addEditProductRow()
  }

  openDetail(e, id){
    e.persist()
    console.log(id)
    disableBodyScroll(this.targetElement)

    this.setState({selectedDetailId: id})
    this.props.fetchVisits(id)
  }

  isOpened(){
    return this.state.selectedDetailId >= 0
      ? 'productDetailContainer'
      : 'productDetailContainer hidden'
  }

  closeDetail(){
    enableBodyScroll(this.targetElement)
    this.setState({selectedDetailId: -1})
  }

  render(){
    const { productsData, editProductData } = this.props
    const { readOnly } = this.props
    const data = readOnly ? productsData : editProductData
    const dataOfSelectedProduct = this.state.selectedDetailId in data
      ? data[this.state.selectedDetailId] : null
    console.log(productsData)
    return (
      <div className="rightPage">
        <div className="bodyContent">
          <div className="toolBar">
            <div className="adminToolBarLeft">
              Products
            </div>
            <div className="adminToolBarRight">
              <EditProductButton
                enableEditFunc={this.enableEditFunc}
                readOnly={readOnly}
                label='Edit Products'
              />
              <SaveProductsButton
                saveFunc={this.saveProducts}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div  className="tableListSuperContainer">
            <div id="tableListContainer" className="tableListContainer" >
              <div className="tableListSmallContainer" >
                <table className={readOnly ? "tableList" : "tableList client"}>
                  <thead>
                  <tr className="tableListRow">
                    <th className="tableListCol"/>
                    <ResizableBox header styles={{'width': '40px'}}>名稱</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>圖片</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>簡介</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>價錢</ResizableBox>
                    {this.props.readOnly ? null : <th className="tableListCol"/>}
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(data).map(
                    (k, i) =>
                      <tr className={this.readOnlyRowStyle()}>
                        <ResizableBox>{i+1}</ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ProductTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'name'}/>
                        </ResizableBox>

                        <ResizableBox styles={{'width': '40px'}} maxContent={false}>
                          <PicturePreviewPopup readOnly={this.props.readOnly} c={data[k]} fieldName={'picture_url'}/>
                        </ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ProductTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'description'}/>
                        </ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ProductTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'price'}/>
                        </ResizableBox>
                        {this.props.readOnly ? null :
                          (data[k].removed === true ?
                              <UndoRemoveRow
                                id={data[k].id}
                                removed={data[k].removed}
                              />
                              : <ResizableBox readOnly={this.props.readOnly} styles={{'width': '40px'}}>
                                <RemoveRowButton
                                  id={data[k].id}
                                />
                              </ResizableBox>
                          )
                        }
                      </tr>
                  )}
                  </tbody>
                </table>

                <div ref={(el) => {
                  this.productList = el;
                }}/>
              </div>

            </div>
            <AddProductRowButton
              addRowFunc={this.addProductRow}
              readOnly={this.props.readOnly}
              label='Add New Product'
            />
          </div>
        </div>
        { dataOfSelectedProduct !== null ?
          <ProductDetail
            className={this.isOpened()}
            productData={dataOfSelectedProduct}
            closeDetail={this.closeDetail}
            productId={this.state.selectedDetailId}
          />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ products, editProduct, ux }) => {
  let productsData = {}
  let productsReadyStatus = FETCH_PRODUCTS_INVALID
  if (typeof products === 'object'){
    if('data' in products){
      productsData = products.data
    }
    if('readyStatus' in products ){
      productsReadyStatus = products.readyStatus
    }
  }


  return {
    productsData,
    productsReadyStatus,
    editProductData: editProduct,
    readOnly: ux.readOnly.productList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVisits: (id) => dispatch(fetchVisits(id)),
    fetchProducts: () => dispatch(fetchProducts()),
    saveProducts: () => dispatch(saveProducts()),
    addEditProductRow: () => dispatch({type: ADD_EDIT_PRODUCT_ROW}),
    editRow: (id, field, value) => dispatch({
      type: EDIT_PRODUCT_ROW,
      id,
      field,
      value
    }),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'productList', value: bool})
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ProductList)