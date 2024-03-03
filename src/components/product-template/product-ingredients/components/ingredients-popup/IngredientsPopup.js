import React from "react"
import * as Style from "./ingredients-popup.module.scss"
import Tab1 from "./components/tab1/Tab1"
import Tab2 from "./components/tab2/Tab2"
import { CloseIcon } from "../../../../../assets/components/icons/Icons"

const IngredientsPopup = ({ togglePopup, data, index, tabIndex, closeText }) => {
  const overlayClickHandler = e => {
    let el = Array.from(e.target.classList)
    if (el.includes("popup_overlay_class")) togglePopup()
  }
  return (
    <div
      className={`${Style.popup_overlay} popup_overlay_class`}
      onClick={overlayClickHandler}
    >
      <div className={Style.popup_wrapper}>
        <div className={Style.close_btn} onClick={() => togglePopup()}>
          <CloseIcon />
          <span>{closeText}</span>
        </div>
        {index === 1 && <Tab1 data={data} closeText={closeText} togglePopup={() => togglePopup()} />}
        {index === 2 && <Tab2 data={data} closeText={closeText} togglePopup={() => togglePopup()} />}
      </div>
    </div>
  )
}

export default IngredientsPopup
