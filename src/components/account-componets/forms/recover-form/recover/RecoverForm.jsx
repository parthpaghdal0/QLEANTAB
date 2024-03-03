import React from "react"
import * as Style from "./RecoverForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import { navigate } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Loader from "../../../../loader/Loader"
import { FormLogo } from "../../../../../assets/components/icons/Icons"

const RecoverForm = ({
  data,
  inputHandler,
  submitHandler,
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
            data.recoverForm.sideImage.localFile.childImageSharp.gatsbyImageData
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
        <h3 className={Style.title}>{data.recoverForm.formTitle}</h3>
        <form onSubmit={submitHandler} className={Style.form}>
          {data.recoverForm.formInput.map((input, index) => {
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
          })}

          <div className={Style.btnWrapper}>
            <Button
              type={data.recoverForm.formButton[0].type}
              globalStyles={true}
              style={Style.submitBtn}
            >
              {data.recoverForm.formButton[0].title}
            </Button>
          </div>
          <div className={Style.navigateAway}>
            <p>{data.recoverForm.formLink.description}</p>
            <Button
              style={Style.navigateBtn}
              type={"button"}
              buttonHandler={navigate.bind(this, data.recoverForm.formLink.url)}
            >
              {data.recoverForm.formLink.title}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecoverForm
