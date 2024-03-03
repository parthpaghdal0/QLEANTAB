import React, { useState } from "react"
import * as Style from "./SubItem.module.scss"
import Button from "../../../UI/custom-button/CustomButton"
import SubDetails from "./sub-details/SubDetails"
import SubForm from "./sub-form/SubForm"

const SubItem = ({
  data,
  strapiData,
  index,
  inputHandler,
  submitHandler,
  inputState,
  submit,
  showModal,
  setShowModal,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatedDate = new Date(data.created_at).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })

  return (
    <>
      <div className={Style.subWrapper}>
        <div className={Style.textBtnWrapper}>
          <div>
            <p
              className={Style.subText}
            >{`${strapiData.orderText} ${data.id}`}</p>
            <p
              className={Style.date}
            >{`${strapiData.dateText} ${formatedDate}`}</p>
          </div>

          <Button
            buttonHandler={setShowDetails.bind(this, !showDetails)}
            style={Style.btn}
            globalStyles={true}
          >
            {!showDetails
              ? strapiData?.subBtn[0]?.title
              : strapiData?.subBtn[1]?.title}
          </Button>
        </div>
        <div className={Style.bottomWrapper}>
          <p>{`${strapiData.trackingText} ${index + 1}`}</p>
          <p>{`${strapiData.addressText} ${data.fullAddress.address.address1} ${data.fullAddress.address.city}`}</p>
          <div className={Style.statusWrapper}>
            <p>{strapiData.statusText}</p>
            <div className={`${Style.statusBox} ${Style[`${data.status}`]}`}>
              {data.status}
            </div>
          </div>
        </div>

        <SubDetails
          title={data.product_title}
          variant_title={data.variant_title}
          quantity={data.quantity}
          next_charge_scheduled_at={data.next_charge_scheduled_at}
          order_interval_frequency={data.order_interval_frequency}
          price={data.price}
          showDetails={showDetails}
        />
      </div>
      <SubForm
        data={strapiData.subForm}
        inputHandler={inputHandler}
        submitHandler={submitHandler.bind(this, data.id)}
        inputState={inputState}
        submit={submit}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/* <div className={Style.divider} /> */}
    </>
  )
}

export default SubItem
