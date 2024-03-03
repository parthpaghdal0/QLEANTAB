import React from "react"
import Helmet from "react-helmet"
import white from "../../../static/white.ico"

const CleanLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="icon" href={white} />
        <link rel="apple-touch-icon" href={white} />
      </Helmet>
      {children}
    </>
  )
}

export default CleanLayout
