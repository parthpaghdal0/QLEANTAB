import React from "react"
import * as Style from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={Style.lds_ellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
