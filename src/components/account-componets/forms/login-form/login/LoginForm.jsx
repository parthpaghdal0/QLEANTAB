import React, { useState } from "react"
import * as Style from "./LoginForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import CustomCheckbox from "../../../../UI/custom-checkbox/CustomCheckbox"
import Markdown from "react-markdown"
import { navigate } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Loader from "../../../../loader/Loader"
import { FormLogo } from "../../../../../assets/components/icons/Icons"

const LoginForm = ({
  data,
  inputHandler,
  submitHandler,
  checkBoxHandler,
  navigateRecoveryHandler,
  recovery,
  inputState,
  submit,
  loading,
  idVariant,
}) => {
  //TWO FORMS VAR
  let content = null

  //LOGIN FORM
  if (!recovery) {
    content = (
      <form onSubmit={submitHandler} className={Style.form}>
        {data.loginForm.formInput.map((input, index) => {
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
              <div className={Style.checkBoxAndBtnWrapper} key={index}>
                <div className={Style.checkboxWrapper}>
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
                      submit && !inputState[input.name].valid && input.required
                        ? Style.invalidCheckboxText
                        : ""
                    }`}
                  >
                    <Markdown children={input.description.data.description} />
                  </div>
                </div>
                <Button
                  buttonHandler={navigateRecoveryHandler}
                  style={Style.forgotPaswwordBtn}
                  type={data.loginForm.formButton[1].type}
                >
                  {data.loginForm.formButton[1].title}
                </Button>
              </div>
            )
          }
        })}

        <div className={Style.btnWrapper}>
          <Button
            type={data.loginForm.formButton[0].type}
            globalStyles={true}
            style={Style.submitBtn}
          >
            {data.loginForm.formButton[0].title}
          </Button>
        </div>
        <div className={Style.navigateAway}>
          <p>{data.loginForm.formLink.description}</p>
          <Button
            style={Style.navigateBtn}
            type={"button"}
            buttonHandler={navigate.bind(this, data.loginForm.formLink.url)}
          >
            {data.loginForm.formLink.title}
          </Button>
        </div>
      </form>
    )
  }
  
  //RECOVERY FORM
  if (recovery) {
    content = (
      <form onSubmit={submitHandler} className={Style.form}>
        <FormInput
          inputHandler={inputHandler}
          labelText={data.loginForm.formInput[0].label}
          type={data.loginForm.formInput[0].type.type}
          placeholder={data.loginForm.formInput[0].placeholder}
          errText={data.loginForm.formInput[0].errText}
          name={data.loginForm.formInput[0].name}
          valid={inputState[data.loginForm.formInput[0].name].valid}
          value={inputState[data.loginForm.formInput[0].name].value}
          submit={submit}
          idVariant={2}
        />

        <div className={Style.recoveryBtnWrapper}>
          <Button
            buttonHandler={navigateRecoveryHandler}
            style={Style.forgotPaswwordBtn}
            type={data.loginForm.formButton[3].type}
          >
            {data.loginForm.formButton[3].title}
          </Button>
        </div>

        <div className={Style.btnWrapper}>
          <Button
            type={data.loginForm.formButton[2].type}
            globalStyles={true}
            style={Style.submitBtn}
          >
            {data.loginForm.formButton[2].title}
          </Button>
        </div>
        <div className={Style.navigateAway}>
          <p>{data.loginForm.formLink.description}</p>
          <Button
            style={Style.navigateBtn}
            type={"button"}
            buttonHandler={navigate.bind(this, data.loginForm.formLink.url)}
          >
            {data.loginForm.formLink.title}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style.image}>
        <GatsbyImage
          className={Style.iconImg}
          image={getImage(
            data.loginForm.sideImage.localFile.childImageSharp.gatsbyImageData
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
        <h3 className={Style.title}>{data.loginForm.formTitle}</h3>
        {content}
      </div>
    </div>
  )
}

export default LoginForm
