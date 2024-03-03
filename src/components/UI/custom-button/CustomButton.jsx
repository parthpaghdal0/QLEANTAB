import React from "react"
import * as Style from "./custom-button.module.scss"

const CustomButton = props => {
  const isBrowser = typeof window !== "undefined"
  return (
    <button
      onClick={
        !props.cta
          ? props.buttonHandler
          : () => {
              if (props.buttonHandler) {
                props.buttonHandler()
              }

              if (isBrowser && typeof props.children === "string") {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({
                  event: "cta_click",
                  button_text: props.children,
                })
              }
            }
      }
      type={props.type}
      className={`${Style.custom_button} ${
        props.globalStyles && Style.global_styles
      } ${props.style}`}
      data-type={props.dataset}
    >
      {props.children}
    </button>
  )
}

export default CustomButton
