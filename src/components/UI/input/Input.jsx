import React from "react"
import * as Style from "./Input.module.scss"

const Input = props => {
  return (
    <input
      id={props.id}
      className={`${Style.input} ${props.style}`}
      type={props.type}
      onInput={props.inputHandler}
      onChange={props.onChangeHandler}
      onFocus={props.focusHandler}
      placeholder={props.placeholder}
      value={props.inputValue}
    >
      {props.children}
    </input>
  )
}

export default Input
