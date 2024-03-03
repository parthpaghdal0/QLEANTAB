import React from "react"
import * as Style from "./FullPageLoader.module.scss"
import Loader from "../../loader/Loader"

const FullPageLoader = () => {
  return (
    <div className={Style.loaderBackground}>
      <div className={Style.loaderWrapper}>
        <Loader />
      </div>
    </div>
  )
}

export default FullPageLoader
