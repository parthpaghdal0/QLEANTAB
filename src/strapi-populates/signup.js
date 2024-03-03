const signup = {
  singularName: "signup",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      signupForm: {
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

module.exports = signup
