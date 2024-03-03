const detail = {
  singularName: "detail",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      heading: "*",
      subHeading: "*",
      detailForm: {
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
          formButton: {
            populate: {
              title: "*",
              type: "*",
              description: "*",
            },
          },
        },
      },
    },
  },
}

module.exports = detail
