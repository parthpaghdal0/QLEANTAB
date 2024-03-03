import React, { useState } from "react"
import * as Style from "./FooterMobileLinks.module.scss"
import { ArrowDownFooter } from "../../../../assets/components/icons/Icons"
import CustomButton from "../../../UI/custom-button/CustomButton"
import CustomLink from "../../../UI/link/CustomLink"

const FooterMobileLinks = ({ footerLinks, title }) => {
  const [showLinks, setShowLinks] = useState(false)

  return (
    <div className={Style.moblieUlWrapper}>
      <CustomButton
        buttonHandler={() => {
          setShowLinks(!showLinks)
        }}
        style={Style.btnHeadingsMobile}
      >
        <div className={Style.btnHeadingsMobileWrapper}>
          <p> {title}</p>
          <div
            className={`${Style.spinArrow} ${
              showLinks ? Style.spinArrowActive : ""
            }`}
          >
            <ArrowDownFooter />
          </div>
        </div>
      </CustomButton>
      <ul
        className={`${Style.csNavListMobile} ${
          showLinks ? Style.csNavListMobileShow : ""
        }`}
      >
        {footerLinks.map(link => {
          return <CustomLink name={link.text} url={link.url} key={link.id} />
        })}
      </ul>
    </div>
  )
}

export default FooterMobileLinks
