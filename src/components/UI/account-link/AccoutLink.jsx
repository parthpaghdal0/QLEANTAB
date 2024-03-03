import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import * as Style from "./AccountLink.module.scss"

const AccountLink = ({ customStyles, title, url, Icon }) => {
  const isBrowser = typeof window !== "undefined"
  const [path, setPath] = useState("")
  const active = path.includes(url)

  useEffect(() => {
    if (isBrowser) {
      setPath(window.location.pathname)
    }
  })

  return (
    <li className={`${Style.linkWrapper} ${active ? Style.active : ""}`}>
      <Link to={url}>
        <div className={Style.link}>
          <div className={Style.iconWrapper}>
            <Icon color={active ? "rgba(84, 131, 112, 1)" : null} />
          </div>

          <p className={Style.linkText}>{title}</p>
        </div>
      </Link>
    </li>
  )
}

export default AccountLink
