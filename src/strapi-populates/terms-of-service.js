const comingsoonpage = {
  singularName: "terms-of-service",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      banner: {
        populate: {
          heading: "*",
          background_image_desktop: "*",
          background_image_mobile: "*",
        },
      },
      text_component: {
        populate: {
          heading: "*",
          description: "*",
        },
      },
    },
  },
}
module.exports = comingsoonpage
