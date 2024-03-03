import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./FormInput.module.scss"
import Input from "../input/Input"
import Button from "../custom-button/CustomButton"

const FormInput = ({
  inputHandler,
  labelText,
  type,
  placeholder,
  errText,
  name,
  icons = null,
  valid,
  value,
  submit,
  idVariant,
  altStyle = false,
  altNameInputStyle = false,
}) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className={`${Style.inputWrapper} ${
        altNameInputStyle ? altNameInputStyle : ""
      } ${type === "text" && !altNameInputStyle && Style.inputWrapperName}`}
    >
      <label htmlFor={`${name}${idVariant}`} className={Style.label}>
        {labelText}
      </label>
      <div className={Style.btnWrapper}>
        <Input
          id={`${name}${idVariant}`}
          inputValue={value}
          onChangeHandler={inputHandler.bind(null, name)}
          type={icons && show ? "text" : type}
          placeholder={placeholder}
          style={`${!altStyle ? Style.formInput : Style.formInputAlt} ${
            submit && !valid ? Style.ivalidInput : ""
          }`}
        />
        {icons && (
          <Button
            buttonHandler={setShow.bind(this, !show)}
            type="button"
            style={Style.showBtn}
          >
            <GatsbyImage
              className={Style.iconImg}
              image={getImage(
                !show
                  ? icons[0].localFile.childImageSharp.gatsbyImageData
                  : icons[1].localFile.childImageSharp.gatsbyImageData
              )}
              alt="icon"
            />
          </Button>
        )}
      </div>
      {submit && !valid && <p className={Style.errMsg}>{errText}</p>}
    </div>
  )
}

export default FormInput
