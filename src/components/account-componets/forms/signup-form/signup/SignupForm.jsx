import React from "react"
import * as Style from "./SignupForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import CustomCheckbox from "../../../../UI/custom-checkbox/CustomCheckbox"
import Markdown from "react-markdown"
import { navigate } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Loader from "../../../../loader/Loader"
import { FormLogo } from "../../../../../assets/components/icons/Icons"

const SignupForm = ({
  data,
  inputHandler,
  submitHandler,
  checkBoxHandler,
  inputState,
  submit,
  loading,
  idVariant,
}) => {
  return (
    <div className={Style.wrapper}>
      <div className={Style.image}>
        <GatsbyImage
          className={Style.iconImg}
          image={getImage(
            data.signupForm.sideImage.localFile.childImageSharp.gatsbyImageData
          )}
          alt="side-image"
        />
      </div>

      <div className={Style.formWrapper}>
        {loading && (
          <div className={Style.loaderWrapper}>
            <Loader />
          </div>
        )}
        <div className={Style.logoWrapper}>
          <div className={Style.logo}>
            <FormLogo />
          </div>
        </div>
        <h3 className={Style.title}>{data.signupForm.formTitle}</h3>
        <form onSubmit={submitHandler} className={Style.form}>
          {data.signupForm.formInput.map((input, index) => {
            if (input.type !== "checkbox") {
              return (
                <FormInput
                  key={index}
                  inputHandler={inputHandler}
                  labelText={input.label}
                  type={input.type}
                  placeholder={input.placeholder}
                  errText={input.errText}
                  icons={input.icon}
                  name={input.name}
                  valid={inputState[input.name].valid}
                  value={inputState[input.name].value}
                  submit={submit}
                  idVariant={idVariant}
                />
              )
            } else {
              return (
                <div key={index} className={Style.checkboxWrapper}>
                  <div className={Style.checkBoxPosition}>
                    <CustomCheckbox
                      required={input.required}
                      isForm={true}
                      checkboxHandler={checkBoxHandler}
                      submit={submit}
                      valid={inputState[input.name].valid}
                    />
                  </div>
                  <div
                    className={`${Style.checkboxText} ${
                      submit && !inputState[input.name].valid
                        ? Style.invalidCheckboxText
                        : ""
                    }`}
                  >
                    <Markdown children={input.description.data.description} />
                  </div>
                </div>
              )
            }
          })}

          <div className={Style.btnWrapper}>
            <Button
              type={data.signupForm.formButton[0].type}
              globalStyles={true}
              style={Style.submitBtn}
            >
              {data.signupForm.formButton[0].title}
            </Button>
          </div>
          <div className={Style.navigateAway}>
            <p>{data.signupForm.formLink.description}</p>
            <Button
              style={Style.navigateBtn}
              type={"button"}
              buttonHandler={navigate.bind(this, data.signupForm.formLink.url)}
            >
              {data.signupForm.formLink.title}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
