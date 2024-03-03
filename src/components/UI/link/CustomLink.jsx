import React from "react"
import { Link } from "gatsby"
import * as Style from "./CustomLink.module.scss"

const CustomLink = ({
  name,
  url,
  showMobileMenuhandler,
  showMobileMenu,
  width,
  customStyles,
  event,
}) => {
  const isBrowser = typeof window !== "undefined"
  const menuHandler = () => {
    if (showMobileMenuhandler && width < 541) {
      showMobileMenuhandler(!showMobileMenu)
    } else {
      return
    }
  }

  return (
    <li
      onClick={() => {
        if (isBrowser && event) {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: "menu_click",
            button_text: name,
          })
        }
      }}
      className={`${Style.linkText} ${customStyles}`}
    >
      {
        <Link onClick={menuHandler} to={url}>
          {name}
        </Link>
      }
    </li>
  )
}

export default CustomLink

//activeStyle={{ color: "red" }} works
