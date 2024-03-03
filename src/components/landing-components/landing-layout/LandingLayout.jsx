import React from "react"
import LandingHeader from "./LandingHeader/LandingHeader"
import LandingFooter from "./LandingFooter/LandingFooter"

const LandingLayout = ({ data, children }) => {
  return (
    <>
      <LandingHeader data={data.header} />
      {children}
      <LandingFooter data={data.footer} />
    </>
  )
}

export default LandingLayout
