import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import * as Style from "./breadcrumb.module.scss"
import { ShareIcon } from "../../assets/components/icons/Icons"
import CustomButton from "../UI/custom-button/CustomButton"

const Breadcrumb = ({ data, isShare = false }) => {
  const isBrowser = typeof window !== "undefined"
  const [productLocation, setProductLocation] = useState("")

  useEffect(() => {
    if (isBrowser) {
      const location = window.location.href
      setProductLocation(location)
    }
  }, [])

  const shareHandler = () => {
    if (isBrowser) {
      const shareData = {
        url: productLocation,
      }

      navigator.share(shareData)
    }
  }

  return (
    <div className={Style.breadcrumb_wrapper}>
      <div className={Style.breadcrumb}>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <Link to={`${item.link}`}>{item.title}</Link>
              {index + 1 < data.length && (
                <span className={Style.breadcrumb_divider}> / </span>
              )}
            </div>
          ))}
      </div>
      {isShare && (
        <CustomButton buttonHandler={shareHandler}>
          <div className={Style.share_icon}>
            <ShareIcon />
          </div>
        </CustomButton>
      )}
    </div>
  )
}

export default Breadcrumb
