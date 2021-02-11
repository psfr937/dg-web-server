import React, { PureComponent } from 'react';
import classNames from 'classnames';
import st from './socialAuthButtonList.module.scss'
import {apiServerHost, apiServerPublicPort, domainName, hasDomainName} from "../../config";

const textBuilding = (prependText, platform) => {
  return `${prependText} with ${platform}`
}

const getHref = (path, lastLocation) => {
  const query = typeof lastLocation === 'string' ? lastLocation : ''
  return hasDomainName ?
    `https://${domainName}${path}${query}`
    : `http://${apiServerHost}:${apiServerPublicPort}${path}${query}`
}

const SocialAuthButtonList = ({lastLocation, prependText}) => {
    const styleFB = st.btnFacebook
    const styleGoogle = st.btnGoogle

    return (
      <React.Fragment>
        <style jsx>{`
        @font-face {
          font-family: 'Roboto';
          src: url('/fonts/Roboto-Medium.ttf');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
        <div className={st.socialAuthButtonList}>
          <div
            className={st.buttonBoxFB}
            onClick={getHref('/api/auth/facebook', lastLocation)}
          >
            <img src={'facebook.png'}/>
            <text className={styleFB}>
              {textBuilding( prependText, "Facebook")}
            </text>
          </div>
          <a
            className={st.buttonBoxGoogle}
            href={getHref('/api/auth/google', lastLocation)}
          >
            <img src={'google.png'}/>
            <text className={styleGoogle}>
              {textBuilding( prependText, "Google")}
            </text>
          </a>
        </div>
      </React.Fragment>
    )
}

export default SocialAuthButtonList