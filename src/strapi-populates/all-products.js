const all_products = {
  singularName: "all-product",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      title: "*",
      shopifyID: "*",
      tab1: {
        populate: {
          heading: "*",
          section: {
            populate: {
              heading: "*",
              description: "*",
              background_color: "*",
              image_desktop: "*",
              image_mobile: "*",
              icon_image1: "*",
              icon_text1: "*",
              icon_image2: "*",
              icon_text2: "*",
              background_image: "*",
              columns_reverse: "*",
            },
          },
        },
      },
      tab2: {
        populate: {
          heading: "*",
          table_row: {
            populate: {
              heading: "*",
              description: "*",
              table_header: "*",
            },
          },
        },
      },
      tab3: {
        populate: {
          heading: "*",
        },
      },
      description: "*",
    },
  },
}

module.exports = all_products
