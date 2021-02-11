import React, { PureComponent } from 'react';
import  { fetchUser, fetchUserFailure, fetchUserSuccess } from "../redux/actions/account/me";
import {withAuthSync} from "../utils/auth";
import withRedux from "../lib/withRedux";
import { connect } from 'react-redux'
import nextCookie from "next-cookies";
import Head from "../components/head";
import { authenticate } from "../redux/actions/account/auth";
import Footer from "../components/footer";
import st from "./console.module.scss";
import Nav from "@components/Nav";
import { fetchData } from "../redux/actions/fetchData";
import LeftBar from "../components/leftBar"
import Funding from "@components/funding";

class IndexPage extends PureComponent{

  constructor(props){
    super(props)
    if(this.props.token != null) {
      this.props.authenticate({token: this.props.token, info: null})
    }
    this.props.fetchData()
  }

  async componentDidMount() {
    const { webItems, webSections } = this.props
    let userAction = this.props.userAction
    if (typeof userAction === 'undefined') {
      userAction = await this.fetchUser
    }
    if (userAction !== null) {
      if ('data' in userAction) {
        this.props.fetchUserSuccess(userAction.data)
      }
      if ('err' in userAction) {
        this.props.fetchUserFailure(userAction.err)
      }
    }

  }

  render() {
    const data = this.props.fetchDataData
 //   console.log(data)
   return ( <div>
      <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden;
      }
    `}</style>
      <Head/>
      <main className={st.app}>
        <LeftBar/>
        <div className={st.rightPage}>
          <div className={st.nav}>
            <div> Funding </div>
            <div> Data Gathering </div>
            <div> Tools </div>
            <div> Progress </div>
          </div>
          <Funding/>
          <div>
            {
              Object.keys(data).map(k =>
                <div>
                  <div> {data[k].name} </div>
                  <div> {data[k].date} </div>
                  <div> {data[k].content} </div>
                </div>
              )
            }
          </div>
        </div>
      </main>
     </div>
    )
  }


  fetchUser(){
    return this.props.fetchUser()
  }

  static async getInitialProps(ctx){
    const {token, info} = nextCookie(ctx)
    const { store } = ctx

    let avatar_url = null
    let display_name = null

    if (typeof token !== 'undefined'){
      await store.dispatch(authenticate({token, info: typeof info === 'string'? info : null}))
    }
    if (typeof info !== 'undefined' && typeof info !== 'undefined' && info !== null) {

      try {
        const parsedInfo = await JSON.parse(info)
      }
      catch(err){
        const parsedInfo = null
      }
      if(typeof parsedInfo !== 'undefined' && parsedInfo !== null) {
        avatar_url = parsedInfo.avatar_url
        if(typeof avatar_url === 'string') avatar_url = avatar_url.replace('^', '=')
        display_name = parsedInfo.display_name
      }
    }

    let userAction

    try {
      userAction = (typeof token !== 'undefined') ? await store.dispatch(fetchUser()) : null
    }
    catch(err){
      userAction = err
    }

    return { token, avatar_url, display_name, userAction }
  }
}

const mapStateToProps = ({ fetchData }) => {

  return {

    fetchDataReadyStatus: fetchData.readyStatus,
    fetchDataData: fetchData.data
  };
};

const mapDispatchToProps =  dispatch => ({
  fetchUser: () =>  dispatch(fetchUser()),
  authenticate: (payload) => dispatch(authenticate(payload)),
  fetchUserSuccess: data =>  dispatch(fetchUserSuccess(data)),
  fetchUserFailure: err =>  dispatch(fetchUserFailure(err)),
  fetchData: () => dispatch(fetchData())
})

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withAuthSync(withRedux(connector(IndexPage)))

