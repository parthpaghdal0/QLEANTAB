import React from "react"
import * as Style from "./LandingCompare.module.scss"
import CompareSection from "./compare-section/CompareSection"

const LandingCompare = ({ data }) => {
  const bgDesktop = data[0].bgDesktop.url
  const bgMobile = data[0].bgMobile.url

  const content = data.map((item, index) => {
    return <CompareSection key={index} data={item} />
  })

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${bgDesktop})`,
        }}
        className={`main-container ${Style.wrapper} ${Style.desktop}`}
      >
        {content}
      </section>
      <section
        style={{
          backgroundImage: `url(${bgMobile})`,
        }}
        className={`main-container ${Style.wrapper} ${Style.mobile}`}
      >
        {content}
      </section>
    </>
  )
}

export default LandingCompare
