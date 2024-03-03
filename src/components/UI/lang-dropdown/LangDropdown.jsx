import React, { useState, useContext } from "react"
import * as Style from "./langDropdown.module.scss"
import { ChevronUp } from "../../../assets/components/icons/Icons"
import { GB, SE } from "country-flag-icons/react/3x2"
import GeneralContext from "../../../context/GeneralContext"
import { navigate } from "gatsby"

const data = [
  { flag: SE, lang: "sv", domain: "se" },
  { flag: GB, lang: "en", domain: "com" },
]

const LangDropdown = () => {
  const isBrowser = typeof window !== "undefined"
  const { setLocalLang, GLOBAL_LANG } = useContext(GeneralContext)
  const currLang = data.find(lang => lang.lang === GLOBAL_LANG)
  const CurrFlag = currLang.flag

  const [open, setOpen] = useState(false)

  const handleDivBlur = () => {
    setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  const checkLocation = lang => {
    if (isBrowser) {
      if (lang === "en" && GLOBAL_LANG !== "en") {
        const rootUrl = window.location.origin
        const newUrl = window.location.href.replace(rootUrl, `${rootUrl}/en`)
        window.location.href = newUrl
      } else if (lang === "sv" && GLOBAL_LANG !== "sv") {
        const rootUrl = window.location.origin
        const newUrl = window.location.href.replace(`${rootUrl}/en`, rootUrl)
        window.location.href = newUrl
      }
    }
  }

  return (
    <div className={`${Style.dropdown_container}`}>
      <div
        className={Style.dropdown_header}
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onBlur={() => handleDivBlur()}
      >
        <CurrFlag className={Style.flag} />
        <div className={`${Style.dropdown_icon} ${open ? Style.active : ""}`}>
          <ChevronUp />
        </div>
      </div>
      {open && (
        <div className={Style.dropdown_list}>
          {data &&
            data.map((item, index) => {
              if (item.lang !== GLOBAL_LANG) {
                const Flag = item.flag
                return (
                  <div
                    className={Style.dropdown_item}
                    key={index}
                    onClick={checkLocation.bind(this, item.lang)}
                  >
                    <Flag className={Style.flag} />
                  </div>
                )
              }
            })}
        </div>
      )}
    </div>
  )
}

export default LangDropdown
