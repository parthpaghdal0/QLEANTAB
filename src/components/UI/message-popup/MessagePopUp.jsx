import React, { useContext } from "react"
import * as Style from "./MessagePopUp.module.scss"
import Button from "../custom-button/CustomButton"
import GeneralContext from "../../../context/GeneralContext"

const MessagePopUp = () => {
  const { modalState, dispatchModal } = useContext(GeneralContext)
  const { error, message, show, click } = modalState.modal

  const modalHandler = event => {
    if (event.target.dataset.type === "modal") {
      dispatchModal({
        type: "HIDE",
      })
      click && click()
    }
  }

  return (
    <>
      {show && (
        <div className={Style.modal} onClick={modalHandler} data-type="modal">
          <div className={`${Style.message} ${error && Style.error}`}>
            <p>{message}</p>
            <div>
              <Button
                style={Style.btn}
                globalStyles={true}
                dataset="modal"
                buttonHandler={modalHandler}
              >
                Ok
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessagePopUp
