const yotpo = {
  singularName: "yotpo",

  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      yotpoReviewsText: {
        populate: {
          text: "*",
        },
      },
      yotpoCreateText: {
        populate: {
          text: "*",
        },
      },
      yotpoSingleText: {
        populate: {
          text: "*",
        },
      },
    },
  },
}
module.exports = yotpo
