const recover = {
  singularName: "recover",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      recoverForm: {
        populate: {
          formTitle: "*",
          formType: "*",
          formInput: {
            populate: {
              type: "*",
              placeholder: "*",
              label: "*",
              name: "*",
              icon: "*",
              required: "*",
              errText: "*",
              description: "*",
            },
          },
          logo: "*",
          formButton: {
            populate: {
              title: "*",
              type: "*",
            },
          },
          formLink: {
            populate: {
              description: "*",
              title: "*",
              url: "*",
            },
          },
          sideImage: "*",
          bgDesktop: "*",
          bgMobile: "*",
        },
      },
    },
  },
}

module.exports = recover
