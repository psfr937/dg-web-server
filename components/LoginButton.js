import React, { useState, useEffect } from 'react'
import netlifyAuth from '../helpers/netlifyAuth.js'
import st from "../pages/home.module.scss";



function LoginButton() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(true)
      setUser(user)
      netlifyAuth.closeModal()
    })
  }

  let logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false)
      setUser(null)
    })
  }

  useEffect(() => {
    netlifyAuth.initialize((user) => {
      setLoggedIn(!!user)
      setUser(user)
    })
  }, [loggedIn, user])

  return (
    loggedIn ? <span onClick={logout} className={st.appNavButton}>Hello</span> : <span onClick={login} className={st.appNavButton}>
            登入
        </span>
  )
}

export default LoginButton