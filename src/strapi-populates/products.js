const products = {
  singularName: "product",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      title: "*",
      title_short: "*",
      shopifyID: "*",
      sellingPlanGroups: {
        populate: {
          id: "*",
          internal: {
            content: "*"
          },
          strapi_json_value: {
            node: {
              sellingPlans: {
                edges: {
                  node: {
                    options: "*"
                  }
                }
              }
            }
          }
        }
      },
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
              variant_id: "*",
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
      bundle_content: {
        populate: {
          product: "*",
        },
      },
      reviews: {
        populate: {
          heading: "*",
          description: "*",
          single_review: {
            populate: {
              name: "*",
              text: "*",
              image: "*",
              color_code: "*",
            },
          },
        },
      },
    },
  },
}

module.exports = products
