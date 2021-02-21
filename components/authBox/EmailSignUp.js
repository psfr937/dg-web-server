import React from 'react';
import st from './login.module.scss'

function EmailSignUp(email, setEmail,
                     password, setPassword,
                     username, setUsername){

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
            USERNAME
          </h4>
          <div className={st.loginFieldInputContainer}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
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

export default EmailSignUp