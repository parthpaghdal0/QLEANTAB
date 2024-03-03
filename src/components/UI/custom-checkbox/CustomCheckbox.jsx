import React from "react"
import * as Style from "./CustomCheckbox.module.scss"

const CustomCheckbox = ({
  checkboxHandler,
  isForm = false,
  valid,
  submit,
  required,
}) => {
  return (
    <div className={Style.checkboxWrapper}>
      <label className={Style.container}>
        {!isForm && (
          <input onClick={checkboxHandler} type="checkbox" defaultChecked />
        )}
        {isForm && (
          <input onChange={checkboxHandler} checked={valid} type="checkbox" />
        )}
        <span
          className={`${
            submit && !valid && required
              ? Style.invalidCheckmark
              : Style.checkmark
          }`}
        />
      </label>
    </div>
  )
}

export default CustomCheckbox
