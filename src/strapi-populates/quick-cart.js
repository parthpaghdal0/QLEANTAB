const quick_cart = {
  singularName: "quick-cart",
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

    heading_one: "*",
    heading_two: "*",
    heading_three: "*",
    terms: "*",
    total: "*",
    items_in: "*",
    input: {
      populate: {
        placeholder: "*",
        type: "*",
      },
    },
  },
}
module.exports = quick_cart
