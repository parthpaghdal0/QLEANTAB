const comingsoonpage = {
  singularName: "privacy-policy",
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
          description: "*",
          background_image_desktop: "*",
          background_image_mobile: "*",
        },
      },
      text_component: {
        populate: {
          heading: "*",
          description: "*",
          columns_in_description: "*",
          description_column1: "*",
          description_column2: "*",
          lists_description:"*"
        },
      },
    },
  },
}
module.exports = comingsoonpage
