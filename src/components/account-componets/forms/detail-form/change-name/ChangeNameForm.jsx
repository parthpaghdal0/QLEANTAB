import React from "react"
import * as Style from "./ChangeNameForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import Loader from "../../../../loader/Loader"
import useDetail from "../../../../../custom-hooks/auth/useDetail"

const ChangeNameForm = ({ data }) => {
  const { inputHandler, submitHandler, inputState, submit, loading } =
    useDetail("change-name")

  return (
    <form className={Style.form}>
      {loading && (
        <div className={Style.loaderWrapper}>
          <Loader />
        </div>
      )}
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
  )
}

export default ChangeNameForm
