const address = {
  singularName: "address",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      addressForm: {
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
            },
          },
        },
      },
      mainHeading: "*",
      selectedText: "*",
      notSelectedText: "*",
      profileText: "*",
      listBtn: {
        populate: {
          title: "*",
        },
      },
    },
  },
}

module.exports = address
