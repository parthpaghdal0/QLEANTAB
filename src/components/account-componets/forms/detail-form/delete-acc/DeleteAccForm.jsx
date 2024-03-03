import React from "react"
import * as Style from "./DeleteAccForm.module.scss"
import FormInput from "../../../../UI/form-Input/FormInput"
import Button from "../../../../UI/custom-button/CustomButton"
import Loader from "../../../../loader/Loader"
import useDetail from "../../../../../custom-hooks/auth/useDetail"
import Markdown from "react-markdown"

const DeleteAccForm = ({ data }) => {
  const {
    inputHandler,
    submitHandler,
    inputState,
    submit,
    showModal,
    setShowModal,
  } = useDetail("delete-account")

  return (
    <div className={Style.formWrapper}>
      <div className={Style.textWrapper}>
        <div className={Style.text}>
          <Markdown
            children={data.formButton[0].description.data.description}
          />
        </div>
        <Button
          buttonHandler={setShowModal.bind(this, true)}
          style={Style.delBtn}
          type={data.formButton[0].type}
        >
          {data.formButton[0].title}
        </Button>
      </div>
      <div
        onClick={event => {
          if (event.target.dataset.type === "modal") {
            setShowModal(false)
          }
        }}
        data-type="modal"
        className={`${Style.popUp} ${showModal ? Style.popUpActive : ""}`}
      >
        <form className={Style.form}>
          <h3 className={Style.title}>{data.formTitle}</h3>
          <div className={Style.info}>
            <Markdown
              children={data.formInput[0].description.data.description}
            />
          </div>
          <FormInput
            inputHandler={inputHandler}
            type={data.formInput[0].type}
            placeholder={data.formInput[0].placeholder}
            errText={data.formInput[0].errText}
            name={data.formInput[0].name}
            valid={inputState[data.formInput[0].name].valid}
            value={inputState[data.formInput[0].name].value}
            submit={submit}
            altStyle={true}
            altNameInputStyle={Style.confirm}
          />
          <div className={Style.buttonsWrapper}>
            <Button
              buttonHandler={submitHandler}
              style={Style.deleteBtn}
              type={data.formButton[1].type}
            >
              {data.formButton[1].title}
            </Button>
            <Button
              buttonHandler={setShowModal.bind(this, false)}
              style={Style.cancelBtn}
              type={data.formButton[2].type}
            >
              {data.formButton[2].title}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeleteAccForm
