import React, { useState } from "react"
import * as Style from "./dropdown.module.scss"
import { ChevronUp } from "../../../assets/components/icons/Icons"

const Dropdown = ({ value, handleChange, data, styleClass }) => {
  const [open, setOpen] = useState(false)

  const handleDivBlur = event => {
    setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  return (
    <div className={`${Style.dropdown_container} ${styleClass && styleClass}`}>
      <div
        className={Style.dropdown_header}
        tabIndex={0}
        onClick={() => setOpen(true)}
        onBlur={() => handleDivBlur()}
      >
        {value ? value : "Select item"}
        <div className={`${Style.dropdown_icon} ${open ? Style.active : ""}`}>
          <ChevronUp />
        </div>
      </div>
      {open && (
        <div className={Style.dropdown_list}>
          {data &&
            data.map((item, index) => {
              return (
                <p
                  className={Style.dropdown_item}
                  key={index}
                  onClick={() => handleChange(item)}
                >
                  {item?.value}
                </p>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
