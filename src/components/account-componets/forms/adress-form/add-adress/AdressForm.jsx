import React from "react"
import FormInput from "../../../../UI/form-Input/FormInput"
import * as Style from "./AdressForm.module.scss"
import Button from "../../../../UI/custom-button/CustomButton"
import Loader from "../../../../loader/Loader"

const AdressForm = ({
  data,
  inputHandler,
  inputState,
  submit,
  submitHandler,
  loading,
  showForm,
  setShowForm,
}) => {
  const title = data.formTitle

  const inputAltStyle = {
    firstname: Style.firstname,
    lastname: Style.lastname,
    company: Style.company,
    address: Style.adress,
    address2: Style.address2,
    city: Style.city,
    province: Style.province,
    country: Style.country,
    postal: Style.postal,
    phone: Style.phone,
  }

  const inputs = data.formInput.map((input, index) => {
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
        valid={input.required ? inputState[input.name].valid : true}
        value={inputState[input.name].value}
        submit={submit}
        altStyle={true}
        altNameInputStyle={inputAltStyle[input.name]}
      />
    )
  })

  return (
    <div
      className={`${Style.adressFormWrapper} ${
        showForm ? Style.adressFormWrapperActive : ""
      }`}
    >
      {loading && (
        <div className={Style.loaderWrapper}>
          <Loader />
        </div>
      )}
      <h3 className={Style.formTitle}>{title}</h3>
      <form onSubmit={submitHandler} className={Style.form}>
        {inputs}

        <div className={Style.btnWrapper}>
          <Button
            buttonHandler={setShowForm.bind(this, !showForm)}
            type={data.formButton[1].type}
            style={Style.cancelBtn}
          >
            {data.formButton[1].title}
          </Button>
          <Button
            type={data.formButton[0].type}
            globalStyles={true}
            style={Style.submitBtn}
          >
            {data.formButton[0].title}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdressForm
