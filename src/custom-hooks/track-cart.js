const useTrackCart = () => {
  const isBrowser = typeof window !== "undefined"

  const selectItmHandler = (item, location) => {
    if (item && isBrowser) {
      const product = [
        {
          item_name: item.title,
          item_id: item.shopifyId.split("/").pop(),
          price: item.variants[0].price,
          currency: item.variants[0].presentmentPrices[4].price.currencyCode,
          item_category: item.productType,
          item_list_name: location.listName,
          index: location.index,
          quantity: 1,
        },
      ]

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "select_item",
        ecommerce: {
          items: product,
        },
      })
    }
  }

  const CheckoutTrackingHandler = cart => {
    if (cart && isBrowser) {
      const trackCartArray = cart.lines.edges.map(item => {
        return {
          item_name: item.node.merchandise.product.title,
          item_id: item.node.merchandise.product.id.split("/").pop(),
          price: item.node.merchandise.priceV2.amount,
          currency: item.node.merchandise.priceV2.currencyCode,
          item_category: item.node.merchandise.product.productType,
          item_category4: item.node.sellingPlanAllocation
            ? item.node.sellingPlanAllocation.sellingPlan.name
            : "one time purchase",
          item_category5: item.node.merchandise.title,
          item_variant: item.node.merchandise.title,
          quantity: item.node.quantity,
        }
      })
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          items: trackCartArray,
        },
      })
    }
  }

  const CartListTrackingHandler = (cart, data, location) => {
    if (cart && isBrowser) {
      const items = []

      data.forEach(ele => {
        cart.lines.edges.forEach(eleTwo => {
          if (ele.variantId === eleTwo.node.merchandise.id) {
            items.push({ eleTwo, index: ele.index })
          }
        })
      })

      const trackCartArray = items.map(item => {
        return {
          item_name: item.eleTwo.node.merchandise.product.title,
          item_id: item.eleTwo.node.merchandise.product.id.split("/").pop(),
          price: item.eleTwo.node.merchandise.priceV2.amount,
          item_category: item.eleTwo.node.merchandise.product.productType,
          item_category4: item.eleTwo.node.sellingPlanAllocation
            ? item.eleTwo.node.sellingPlanAllocation.sellingPlan.name
            : "one time purchase",
          item_category5: item.eleTwo.node.merchandise.title,
          item_variant: item.eleTwo.node.merchandise.title,
          item_list_name: location.listName,
          index: item.index + 1,
          quantity: 1,
        }
      })

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          items: trackCartArray,
        },
      })
    }
  }

  const CartTrackingHandler = (cart, itemInfo) => {
    if (cart && isBrowser) {
      let product

      if (!itemInfo.item.sub && !itemInfo.item.variant) {
        product = cart.lines.edges.filter(item => {
          return (
            item.node.merchandise.product.id === itemInfo.item.id &&
            !item.node.sellingPlanAllocation
          )
        })
      } else if (itemInfo.item.sub) {
        product = cart.lines.edges.filter(item => {
          return (
            item.node.merchandise.product.id === itemInfo.item.id &&
            item.node.sellingPlanAllocation &&
            itemInfo.item.variant === item.node.merchandise.title
          )
        })
      } else if (!itemInfo.item.sub) {
        product = cart.lines.edges.filter(item => {
          return (
            item.node.merchandise.product.id === itemInfo.item.id &&
            !item.node.sellingPlanAllocation &&
            itemInfo.item.variant === item.node.merchandise.title
          )
        })
      }

      let trackCartArray
      if (itemInfo.location) {
        trackCartArray = product.map((item, index) => {
          return {
            item_name: item.node.merchandise.product.title,
            item_id: item.node.merchandise.product.id.split("/").pop(),
            price: item.node.sellingPlanAllocation
              ? `${
                  Number(item.node.merchandise.priceV2.amount) -
                  (Number(item.node.merchandise.priceV2.amount) / 10) * 2
                }`
              : item.node.merchandise.priceV2.amount,
            currency: item.node.merchandise.priceV2.currencyCode,
            item_category: item.node.merchandise.product.productType,
            item_category4: item.node.sellingPlanAllocation
              ? item.node.sellingPlanAllocation.sellingPlan.name
              : "one time purchase",
            item_category5: item.node.merchandise.title,
            item_variant: item.node.merchandise.title,
            item_list_name:
              itemInfo.item.id === item.node.merchandise.product.id
                ? itemInfo.location.listName
                : "",
            index:
              itemInfo.item.id === item.node.merchandise.product.id
                ? Number(itemInfo.location.index) + 1
                : "",
            quantity: itemInfo.item.quantity,
          }
        })
      } else {
        trackCartArray = product.map((item, index) => {
          return {
            item_name: item.node.merchandise.product.title,
            item_id: item.node.merchandise.product.id.split("/").pop(),
            price: item.node.sellingPlanAllocation
              ? `${
                  Number(item.node.merchandise.priceV2.amount) -
                  (Number(item.node.merchandise.priceV2.amount) / 10) * 2
                }`
              : item.node.merchandise.priceV2.amount,
            currency: item.node.merchandise.priceV2.currencyCode,
            item_category: item.node.merchandise.product.productType,
            item_category4: item.node.sellingPlanAllocation
              ? item.node.sellingPlanAllocation.sellingPlan.name
              : "one time purchase",
            item_category5: item.node.merchandise.title,
            item_variant: item.node.merchandise.title,
            quantity: itemInfo.item.quantity,
          }
        })
      }

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          items: trackCartArray,
        },
      })
    }
  }

  const deleteHandler = (item, mode = "multiple") => {
    if (isBrowser && item) {
      const deleteItem = [
        {
          item_name: item.node.merchandise.product.title,
          item_id: item.node.merchandise.product.id.split("/").pop(),
          price: item.node.merchandise.priceV2.amount,
          currency: item.node.merchandise.priceV2.currencyCode,
          item_category: item.node.merchandise.product.productType,
          item_category4: item.node.sellingPlanAllocation
            ? item.node.sellingPlanAllocation.sellingPlan.name
            : "one time purchase",
          item_category5: item.node.merchandise.title,
          item_variant: item.node.merchandise.title,
          quantity: mode === "multiple" ? item.node.quantity : 1,
        },
      ]

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "remove_from_cart",
        ecommerce: {
          items: deleteItem,
        },
      })
    }
  }

  return {
    CartTrackingHandler,
    CheckoutTrackingHandler,
    deleteHandler,
    CartListTrackingHandler,
    selectItmHandler,
  }
}

export default useTrackCart
