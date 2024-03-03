const acclayout = {
  singularName: "acc-layout",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      heading: "*",
      navigateHome: "*",
      accLink: {
        populate: {
          titleDesktop: "*",
          titleMobile: "*",
          url: "*",
          icon: "*",
        },
      },
      accButton: {
        populate: {
          title: "*",
          icon: "*",
        },
      },
    },
  },
}

module.exports = acclayout
