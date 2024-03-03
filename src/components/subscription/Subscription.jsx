import React, { useState, useEffect, useContext } from "react"
import * as Style from "./subscribtion.module.scss"
import Dropdown from "../UI/custom-dropdown/Dropdown"
import { InfoIcon } from "../../assets/components/icons/Icons"
import CheckoutContext from "../../context/CheckoutContext"
import Loader from "../loader/Loader"

const Subscription = ({
  setSubscriptionId,
  product,
  handleShowSubscription,
}) => {
  const [subscription, setSubscription] = useState(1)
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  const [subscriptionValue, setSubscriptionValue] = useState(null)
  const [dropdownData, setDropdownData] = useState(null)
  const [percent, setPercent] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [loadingSubscription, setLoadingSubscription] = useState(false)
  const { getSubscription } = useContext(CheckoutContext)

  const handleSubscription = id => {
    setSubscription(id)
    if (id === 2) {
      const sellingPlanId =
        subscriptionDetails[0]?.node?.sellingPlans?.edges[0]?.node?.id
      if (sellingPlanId) setSubscriptionId(sellingPlanId)
    } else {
      setSubscriptionId(null)
    }
  }

  useEffect(() => {
    if (product) {
      getSubscriptionHandle(product.shopifyID)

      // setSubscriptionDetails(
      //   JSON.parse(product.sellingPlanGroups.internal.content)
      // )
    }
  }, [product])

  const getSubscriptionHandle = async id => {
    const subscription = await getSubscription(
      `gid://shopify/Product/${product.shopifyID}`
    )

    if (
      subscription &&
      subscription?.sellingPlanGroups?.nodes[0]?.sellingPlans?.nodes.length
    ) {
      setSubscriptionDetails(subscription)
      handleShowSubscription(true)
    } else {
      handleShowSubscription(false)
    }

    setLoadingSubscription(true)
  }

  useEffect(() => {
    if (subscriptionDetails) {
      const options =
        subscriptionDetails?.sellingPlanGroups?.nodes[0]?.sellingPlans?.nodes.map(
          item => {
            return {
              id: item.id,
              value: item.name,
            }
          }
        )

      const percent =
        subscriptionDetails?.sellingPlanGroups?.nodes[0]?.sellingPlans
          ?.nodes?.[0]?.priceAdjustments?.[0]?.adjustmentValue
          ?.adjustmentPercentage
      setDropdownData(options)
      if (percent) setPercent(percent)
    }
  }, [subscriptionDetails])

  const handleDropdownChange = data => {
    setSubscriptionValue(data?.value)
    setSubscriptionId(data?.id)
  }

  return (
    <>
      {!loadingSubscription && <Loader />}
      <div>
        {loadingSubscription && subscriptionDetails ? (
          <div>
            <div className={Style.subscription}>
              <div
                className={Style.input_group}
                onClick={() => handleSubscription(1)}
              >
                <div className={Style.input_radio}>
                  {subscription === 1 && (
                    <div className={Style.input_radio_bullet}></div>
                  )}
                </div>
                <label htmlFor="oneTime">One-time purchase</label>
              </div>
              <div
                className={Style.input_group}
                onClick={() => handleSubscription(2)}
              >
                <div className={Style.input_radio}>
                  {subscription === 2 && (
                    <div className={Style.input_radio_bullet}></div>
                  )}
                </div>
                <label htmlFor="subscribe">Subscribe and save</label>
                {percent && (
                  <div className={Style.subscribe_amount}>{percent}%</div>
                )}
              </div>
            </div>
            {subscription === 2 && (
              <div className={Style.info_subscribtion}>
                <p className={Style.info_subscribtion_heading}>
                  Choose your delivery schedule
                </p>
                <div className={Style.subscription_dropdown}>
                  <Dropdown
                    data={dropdownData}
                    handleChange={handleDropdownChange}
                    value={subscriptionValue}
                    styleClass={Style.subscribe_dropdown}
                  />
                  <div
                    className={Style.info_icon}
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                  >
                    <InfoIcon />
                    <div
                      className={`${Style.info_description} ${
                        showInfo ? Style.active : ""
                      }`}
                    >
                      If you're not sure how often you will need QLEANTAB
                      refills, email us at <br />
                      <a href={`mailto:hello@qleantab`}>
                        hello@qleantab.com
                      </a>{" "}
                      and we will help you set the right delivery schedule.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}

export default Subscription
