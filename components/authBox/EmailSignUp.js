import React, { PureComponent } from 'react';
import st from './login.module.scss'

class EmailSignUp extends PureComponent {


  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit()
  }

  onSubmit(){

  }

  render() {

    const {
      email, setEmail,
      password, setPassword,
    } = this.props

    return (

      <div className={st.loginFormBox}>
        <div  className={st.loginFieldItem}>
          <h4>
            EMAIL
          </h4>
          <div className={st.loginFieldInputContainer}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div  className={st.loginFieldItem}>
          <h4>
            PASSWORD
          </h4>
          <div className={st.loginFieldInputContainer}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

      </div>

    )
  }
}

EmailSignUp.defaultProps = {
  hasButton: false,
  formType: 'login',
  onFormSubmit: () => {

  }
}

export default EmailSignUp