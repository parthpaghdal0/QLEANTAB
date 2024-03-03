import React, { useEffect, useContext, useState } from "react"
import * as Style from "./SubList.module.scss"
import useSub from "../../../custom-hooks/auth/useSub"
import CheckoutContext from "../../../context/CheckoutContext"
import SubItem from "./sub-item/SubItem"
import Loader from "../../loader/Loader"

const SubList = ({ data }) => {
  // const [subscriptionList, setSubscriptionList] = useState([])
  //needs to be moved in Context to avoid new fetch every time
  const { customerData, subscriptionList, setSubscriptionList } =
    useContext(CheckoutContext)
  const {
    fetchSubscriptions,
    loading,
    inputHandler,
    submitHandler,
    inputState,
    submit,
    showModal,
    setShowModal,
  } = useSub(customerData, setSubscriptionList)

  useEffect(() => {
    if (subscriptionList?.length === 0 && customerData) {
      fetchSubscriptions()
    }
  }, [customerData])

  let content = "No subscriptions"

  if (subscriptionList.length) {
    content = subscriptionList.map((item, index) => {
      return (
        <SubItem
          key={index}
          data={item}
          strapiData={data}
          index={index}
          inputHandler={inputHandler}
          submitHandler={submitHandler}
          inputState={inputState}
          submit={submit}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )
    })
  }

  return (
    <section className={Style.subSection}>
      <h3 className={Style.heading}>{data.heading}</h3>
      <div className={Style.subWrapper}>
        {loading && (
          <div className={Style.loaderWrapper}>
            <Loader />
          </div>
        )}

        {content}
      </div>
    </section>
  )
}

export default SubList
