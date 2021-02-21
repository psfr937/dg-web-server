import React from 'react';
import st from './login.module.scss'

function EmailSignIn({ email, setEmail,
                       password, setPassword }){

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
export default EmailSignIn