const legalNotice = {
  singularName: "legal-notice",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      bannerLegal: {
        populate: {
          heading: "*",
          description: "*",
          background_image_desktop: "*",
          background_image_mobile: "*",
        },
      },
      legalText: {
        populate: {
          heading: "*",
          description: "*",
        },
      },
    },
  },
}
module.exports = legalNotice
