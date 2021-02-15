import Head from '@components/Head'
import StripeContainer from '@components/stripe/StripeAddPmContainer'
import st from './home.module.scss'
import React from "react";
import LoginNav from "@components/LoginNav"
import loginSt from '@components/cart.module.scss'
import {connect} from "react-redux";



class AddPayment extends React.PureComponent {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden;
      }
    `}</style>
        <Head/>
        <main className={st.app}>
          <LoginNav/>
          <section className={loginSt.loginFormContainer}>
            <h4>{this.props.planId}</h4>
            <StripeContainer/>
          </section>
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ checkout, fetchData }) => {
  return {
    planId: checkout.planId
  };
};


const connector = connect(
  mapStateToProps,
  null
);


export default connector(AddPayment)
