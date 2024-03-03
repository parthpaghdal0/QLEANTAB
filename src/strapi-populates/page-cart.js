const page_cart = {
  singularName: "page-cart",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      summary_heading: "*",
      subtotal_text: "*",
      cuponcode_text: "*",

      pagecart_btn: {
        populate: {
          title: "*",
          type: "*",
        },
      },

      pagecart_input: {
        populate: {
          placeholder: "*",
        },
      },

      cupon_info: "*",
      total_text: "*",
    },
  },
}
module.exports = page_cart
