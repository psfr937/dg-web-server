import React, { useState } from 'react'
import st from './circularImage.module.scss'

function CircleImage({src: imageUrl= ''}){

  const [src, setSrc] = useState(imageUrl)
  const [hasError, setHasError] = useState(false)

  const changeSrc = (newSrc) => {
    if(!hasError) {
      setSrc(newSrc);
      setHasError(true)
    }
  };

  return (
    <div className={st.profileIconWrapper}>
      <img
        className={st.profileIcon}
        alt="me"
        onError={changeSrc('https://i.imgur.com/aBcof3d.png')}
        src={hasError ? src : imageUrl }
      />
    </div>
  )
}

export default CircleImage
