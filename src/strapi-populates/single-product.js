const side_cart = {
  singularName: "single-product",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      textImage: {
        populate: {
          heading: "*",
          image: "*",
          imageOnLeft: "*",
          background: "*",
          paragraph: {
            populate: {
              pargraph: "*",
            },
          },
        },
      },

      howItWorks: {
        populate: {
          heading: "*",
          description: "*",
          how_it_works_step: {
            populate: {
              step_image: "*",
              step_description: "*",
            },
          },
          how_it_works_time: {
            populate: {
              time_icon: "*",
              icon_text: "*",
              heading: "*",
              description: "*",
            },
          },
        },
      },
    },
  },
}
module.exports = side_cart
