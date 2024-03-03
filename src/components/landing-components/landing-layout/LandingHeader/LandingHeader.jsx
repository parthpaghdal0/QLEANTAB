import React from "react"
import * as Style from "./LandingHeader.module.scss"

const LandingHeader = ({ data }) => {
  return (
    <section className={`landing-main-container ${Style.headerWrapper}`}>
      <h2 className={Style.heading}>{data.heading}</h2>
    </section>
  )
}

export default LandingHeader
