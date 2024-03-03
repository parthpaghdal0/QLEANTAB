import React from "react"
import * as Style from "./ChangePasswordForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import Loader from "../../../../loader/Loader"
import useDetail from "../../../../../custom-hooks/auth/useDetail"

const ChangePasswordForm = ({ data }) => {
  const {
    inputHandler,
    submitHandler,
    inputState,
    submit,
    navgateForgottenPassword,
    loading,
  } = useDetail("change-password")

  return (
    <div className={Style.formWrapper}>
      {loading && (
        <div className={Style.loaderWrapper}>
          <Loader />
        </div>
      )}
      <form className={Style.form}>
        {data.formInput.map((input, index) => {
          return (
            <FormInput
              key={index}
              inputHandler={inputHandler}
              labelText={input.label}
              type={input.type}
              placeholder={input.placeholder}
              errText={input.errText}
              name={input.name}
              valid={inputState[input.name].valid}
              value={inputState[input.name].value}
              submit={submit}
              icons={input.icon}
              altStyle={true}
              altNameInputStyle={Style.name}
            />
          )
        })}
        <div className={Style.btnWrapper}>
          <Button
            style={Style.btn}
            buttonHandler={submitHandler}
            type={data.formButton[0].type}
          >
            {data.formButton[0].title}
          </Button>
        </div>
      </form>
      <Button
        buttonHandler={navgateForgottenPassword}
        style={Style.forgotPassBtn}
        type={data.formButton[1].type}
      >
        {data.formButton[1].title}
      </Button>
    </div>
  )
}

export default ChangePasswordForm
