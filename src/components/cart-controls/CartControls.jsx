import React, { useContext, useEffect, useState } from "react"
import * as Style from "./CartControls.module.scss"
import ProductContext from "../../context/ProductContext"
import CheckoutContext from "../../context/CheckoutContext"
import QuantityControl from "./quantity-control/QuantityControl"
import DeleteControl from "./delete-controls/DeleteControl"

const CartControls = ({ mode }) => {
  const ctx = useContext(CheckoutContext)
  const { currencySymbol } = useContext(ProductContext)
  const { strapiHelperText } = useContext(ProductContext)
  const isBrowser = typeof window !== "undefined"
  const [lineItemsArray, setLineItemsArray] = useState([])

  useEffect(() => {
    if (isBrowser && ctx.checkout) {
      setLineItemsArray(ctx.checkout.lines.edges)
    }
  }, [ctx.checkout])

  let content

  if (mode === "main-cart") {
    if (lineItemsArray.length === 0) {
      content = <div>{strapiHelperText?.EmptyCart}</div>
    } else {
      content = (
        <div className={Style.cartControlsWrapper}>
          {lineItemsArray.map(item => {
            return (
              <div className={Style.singleCartProduct} key={item.node.id}>
                <div
                  className={Style.productImage}
                  style={{
                    background: `url(${item.node.merchandise.image.url}) no-repeat center/cover`,
                  }}
                ></div>

                <p className={`${Style.productTitle} ${Style.hideOnMobile}`}>
                  {item.node.merchandise.product.title}
                </p>

                <div className={`${Style.price} ${Style.singleItemPrice}`}>
                  <div className={Style.priceWrapper}>
                    {item.node.merchandise.compareAtPriceV2 && (
                      <p className={Style.singleProductComparePrice}>
                        {`${currencySymbol && currencySymbol} ${Number(
                          item.node.merchandise.compareAtPriceV2.amount
                        ).toFixed(2)}`}
                      </p>
                    )}
                    <p className={Style.singleProductTotalPrice}>
                      {`${currencySymbol && currencySymbol} ${
                        item.node.sellingPlanAllocation
                          ? Number(
                              item.node.sellingPlanAllocation
                                .priceAdjustments[0].perDeliveryPrice.amount
                            ).toFixed(2)
                          : Number(
                              item.node.merchandise.priceV2.amount
                            ).toFixed(2)
                      }`}
                    </p>
                  </div>
                </div>

                <div
                  className={`${Style.quantityControlMainCart} ${Style.hideOnMobile}`}
                >
                  <QuantityControl
                    id={item.node.merchandise.id}
                    quantity={item.node.quantity}
                    sellingPlanAllocation={item.node.sellingPlanAllocation}
                    item={item}
                  />
                </div>

                <div className={`${Style.price} ${Style.hideOnMobile}`}>
                  <div className={Style.priceWrapper}>
                    {item.node.merchandise.compareAtPriceV2 && (
                      <p className={Style.singleProductComparePrice}>
                        {`${currencySymbol && currencySymbol} ${(
                          item.node.merchandise.compareAtPriceV2.amount *
                          item.node.quantity
                        ).toFixed(2)}`}
                      </p>
                    )}
                    <p className={Style.singleProductTotalPrice}>
                      {`${currencySymbol && currencySymbol} ${
                        item.node.sellingPlanAllocation
                          ? (
                              item.node.sellingPlanAllocation
                                .priceAdjustments[0].perDeliveryPrice.amount *
                              item.node.quantity
                            ).toFixed(2)
                          : (
                              item.node.merchandise.priceV2.amount *
                              item.node.quantity
                            ).toFixed(2)
                      }`}
                    </p>
                  </div>
                </div>

                {/* MOBILE LAYOUT */}
                <div className={Style.mobileLayoutWrapper}>
                  <p className={Style.productTitle}>
                    {item.node.merchandise.product.title}
                  </p>
                  <div className={Style.quantityControlMainCart}>
                    <QuantityControl
                      id={item.node.merchandise.id}
                      quantity={item.node.quantity}
                      sellingPlanAllocation={item.node.sellingPlanAllocation}
                      item={item}
                    />
                  </div>

                  <div className={Style.price}>
                    <div className={Style.priceWrapper}>
                      {item.node.merchandise.compareAtPriceV2 && (
                        <p className={Style.singleProductComparePrice}>
                          {`${currencySymbol && currencySymbol} ${(
                            item.node.merchandise.compareAtPriceV2.amount *
                            item.node.quantity
                          ).toFixed(2)}`}
                        </p>
                      )}
                      <p className={Style.singleProductTotalPrice}>
                        {`${currencySymbol && currencySymbol} ${(
                          item.node.merchandise.priceV2.amount *
                          item.node.quantity
                        ).toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </div>
                {/* MOBILE LAYOUT */}

                <div className={Style.deleteControlMainCart}>
                  <DeleteControl id={item.node.id} item={item} />
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  } else if (mode === "side-cart") {
    if (lineItemsArray.length === 0) {
      content = <div>{strapiHelperText?.EmptyCart}</div>
    } else {
      content = (
        <div className={Style.hideScroll}>
          <div className={Style.sideCartControlsWrapper}>
            {lineItemsArray.map(item => {
              return (
                <div className={Style.singleSideCartProduct} key={item.node.id}>
                  <div className={Style.sideCartImageContorllsFlexWrapper}>
                    <div
                      className={Style.productImage}
                      style={{
                        background: `url(${item.node.merchandise.image.url}) no-repeat center/cover`,
                      }}
                    ></div>
                    <div className={Style.sideCartContorlInnerWrapper}>
                      <p className={Style.sideCartproductTitle}>
                        {item.node.merchandise.product.title}
                      </p>
                      <div className={Style.priceSideCart}>
                        <div className={Style.priceWrapperSideCart}>
                          <p className={Style.singleProductTotalPriceSideCart}>
                            {`${currencySymbol && currencySymbol} ${
                              item.node.sellingPlanAllocation
                                ? (
                                    item.node.sellingPlanAllocation
                                      .priceAdjustments[0].perDeliveryPrice
                                      .amount * item.node.quantity
                                  ).toFixed(2)
                                : (
                                    item.node.merchandise.priceV2.amount *
                                    item.node.quantity
                                  ).toFixed(2)
                            }`}
                          </p>
                          {item.node.merchandise.compareAtPriceV2 && (
                            <p
                              className={
                                Style.singleProductComparePriceSideCart
                              }
                            >
                              {`${currencySymbol && currencySymbol} ${(
                                item.node.merchandise.compareAtPriceV2.amount *
                                item.node.quantity
                              ).toFixed(2)}`}
                            </p>
                          )}
                        </div>
                      </div>

                      <QuantityControl
                        id={item.node.merchandise.id}
                        quantity={item.node.quantity}
                        sellingPlanAllocation={item.node.sellingPlanAllocation}
                        item={item}
                      />
                    </div>
                  </div>

                  <div className={Style.sideCartDelBtnWrapper}>
                    <DeleteControl id={item.node.id} item={item} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  } else if (mode === "page-cart") {
    if (lineItemsArray.length === 0) {
      content = <div>{strapiHelperText?.EmptyCart}</div>
    } else {
      content = (
        <div className={Style.ProductInfoWrapper}>
          <h2>{strapiHelperText?.MyCart}</h2>
          <div className={Style.productInfoBar}>
            <div className={Style.product}>Products</div>
            <div className={`${Style.type} ${Style.hideDesktop768}`}>
              {strapiHelperText?.PurchaseType}
            </div>
            <div className={`${Style.price} ${Style.pageCartSinglePriceHide}`}>
              {strapiHelperText?.Price}
            </div>
            <div className={`${Style.quantity} ${Style.hideDesktop768}`}>
              {strapiHelperText?.Quantity}
            </div>
            <div className={`${Style.total} ${Style.hideDesktop768}`}>
              {strapiHelperText?.Total}
            </div>
            <div className={`${Style.total} ${Style.showMobile768}`}>
              {" "}
              {strapiHelperText?.Price}
            </div>
            <div
              className={`${Style.delBtnSpace} ${Style.hideDesktop768}`}
            ></div>
          </div>

          <div className={Style.pageCartControlsWrapper}>
            {lineItemsArray.map(item => {
              return (
                <div className={Style.singlePageCartProduct} key={item.node.id}>
                  {/* div - pageCartMobileLyaoutOne - it shows image, title, purchase type and total price on mobile, else on desktop
                  it showss only Image and title */}
                  <div className={Style.pageCartMobileLyaoutOne}>
                    {item.node.sellingPlanAllocation && (
                      <div
                        className={`${Style.purchaseTypeWrapperSubscibe} ${Style.showMobile768}`}
                      >
                        <div className={Style.typeText}>
                          <p> {strapiHelperText?.RegularPayment}:</p>
                          <p>
                            <span>{`Kr ${(
                              Number(
                                item.node.sellingPlanAllocation
                                  .priceAdjustments[0].price.amount
                              ) * Number(item.node.quantity)
                            ).toFixed(2)}`}</span>
                          </p>
                        </div>
                        <div className={Style.typeText}>
                          <p>{strapiHelperText?.BillingCycle}:</p>
                          <p>
                            <span>
                              {item.node.sellingPlanAllocation.sellingPlan.name.substring(
                                item.node.sellingPlanAllocation.sellingPlan.name.indexOf(
                                  " "
                                ) + 1,
                                item.node.sellingPlanAllocation.sellingPlan.name
                                  .length
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                    {!item.node.sellingPlanAllocation && (
                      <div
                        className={`${Style.purchaseTypeWrapperNoSubscibe} ${Style.purchaseTypeWrapperNoSubscibeMobile} ${Style.showMobile768}`}
                      >
                        <p>{strapiHelperText?.OneOffPurchase}</p>
                      </div>
                    )}

                    <div className={Style.PageCartImgTtitleWrapper}>
                      <div
                        className={Style.productImage}
                        style={{
                          background: `url(${item.node.merchandise.image.url}) no-repeat center/cover`,
                        }}
                      ></div>

                      <div className={Style.titlePriceMobilePageCart}>
                        <p className={`${Style.productTitle} `}>
                          {item.node.merchandise.product.title}
                        </p>

                        <div
                          className={`${Style.pageCartPrice} ${Style.showMobile768} `}
                        >
                          <div className={Style.pageCartpriceWrapper}>
                            <p
                              className={Style.pageCartsingleProductTotalPrice}
                            >
                              {`${currencySymbol && currencySymbol} ${(
                                item.node.merchandise.priceV2.amount *
                                item.node.quantity
                              ).toFixed(2)}`}
                            </p>
                            {item.node.merchandise.compareAtPriceV2 && (
                              <p
                                className={
                                  Style.pageCartsingleProductComparePrice
                                }
                              >
                                {`${currencySymbol && currencySymbol} ${(
                                  item.node.merchandise.compareAtPriceV2
                                    .amount * item.node.quantity
                                ).toFixed(2)}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* type of purchase, it is hidden on mobile */}

                  {item.node.sellingPlanAllocation && (
                    <div
                      className={`${Style.purchaseTypeWrapperSubscibe} ${Style.hideDesktop768}`}
                    >
                      <div className={Style.typeText}>
                        <p>Regular payment:</p>
                        <p>
                          <span>{`Kr ${(
                            Number(
                              item.node.sellingPlanAllocation
                                .priceAdjustments[0].price.amount
                            ) * Number(item.node.quantity)
                          ).toFixed(2)}`}</span>
                        </p>
                      </div>
                      <div className={Style.typeText}>
                        <p>{strapiHelperText?.BillingCycle}:</p>
                        <p>
                          <span>
                            {item.node.sellingPlanAllocation.sellingPlan.name.substring(
                              item.node.sellingPlanAllocation.sellingPlan.name.indexOf(
                                " "
                              ) + 1,
                              item.node.sellingPlanAllocation.sellingPlan.name
                                .length
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  {!item.node.sellingPlanAllocation && (
                    <div
                      className={`${Style.purchaseTypeWrapperNoSubscibe} ${Style.hideDesktop768}`}
                    >
                      <p>{strapiHelperText?.OneOffPurchase}</p>
                    </div>
                  )}

                  {/* Single price Desktop number, it is hidden on mobile */}

                  <div
                    className={`${Style.pageCartPrice} ${Style.pageCartSinglePriceHide}`}
                  >
                    <div className={Style.pageCartpriceWrapper}>
                      <p className={`${Style.pageCartsingleProductTotalPrice}`}>
                        {`${currencySymbol && currencySymbol} ${
                          item.node.sellingPlanAllocation
                            ? Number(
                                item.node.sellingPlanAllocation
                                  .priceAdjustments[0].perDeliveryPrice.amount
                              ).toFixed(2)
                            : Number(
                                item.node.merchandise.priceV2.amount
                              ).toFixed(2)
                        }`}
                      </p>
                      {item.node.merchandise.compareAtPriceV2 && (
                        <p className={Style.pageCartsingleProductComparePrice}>
                          {`${currencySymbol && currencySymbol} ${Number(
                            item.node.merchandise.compareAtPriceV2.amount
                          ).toFixed(2)}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`${Style.pageCartMobileLyaoutTwo}`}>
                    <div className={Style.showMobile768}>
                      <DeleteControl id={item.node.id} item={item} />
                    </div>
                    <QuantityControl
                      id={item.node.merchandise.id}
                      quantity={item.node.quantity}
                      sellingPlanAllocation={item.node.sellingPlanAllocation}
                      item={item}
                    />
                  </div>

                  {/* Total price desktop number, it is hidden on mobile */}

                  <div
                    className={`${Style.pageCartPrice} ${Style.hideDesktop768} `}
                  >
                    <div className={Style.pageCartpriceWrapper}>
                      <p className={Style.pageCartsingleProductTotalPrice}>
                        {`${currencySymbol && currencySymbol} ${
                          item.node.sellingPlanAllocation
                            ? (
                                item.node.sellingPlanAllocation
                                  .priceAdjustments[0].perDeliveryPrice.amount *
                                item.node.quantity
                              ).toFixed(2)
                            : (
                                item.node.merchandise.priceV2.amount *
                                item.node.quantity
                              ).toFixed(2)
                        }`}
                      </p>
                      {item.node.merchandise.compareAtPriceV2 && (
                        <p className={Style.pageCartsingleProductComparePrice}>
                          {`${currencySymbol && currencySymbol} ${(
                            item.node.merchandise.compareAtPriceV2.amount *
                            item.node.quantity
                          ).toFixed(2)}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`${Style.deleteControlMainCart} ${Style.hideDesktop768}`}
                  >
                    <DeleteControl id={item.node.id} item={item} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  return content
}

export default CartControls
