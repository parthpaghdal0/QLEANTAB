const sub = {
  singularName: "sub",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      subBtn: {
        populate: {
          title: "*",
        },
      },

      subStatus: {
        populate: {
          statusText: "*",
          statusName: "*",
        },
      },

      subForm: {
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

      heading: "*",
      orderText: "*",
      dateText: "*",
      trackingText: "*",
      addressText: "*",
      statusText: "*",
    },
  },
}

module.exports = sub
