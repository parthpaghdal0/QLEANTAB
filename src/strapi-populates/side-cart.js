const side_cart = {
  singularName: "side-cart",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      button: {
        populate: {
          title: "*",
          url: "*",
          icon: "*",
        },
      },
    },

    incart_text: "*",
    items_text: "*",
    shipping_text: "*",
    total_text: "*",
    cur_symbol: "*",
    shipping_heading: "*",
  },
}
module.exports = side_cart
