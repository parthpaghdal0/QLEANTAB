const order = {
  singularName: "order",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      orderViewBtn: {
        populate: {
          title: "*",
        },
      },

      orderStatus: {
        populate: {
          statusText: "*",
          statusColor: "*",
          statusName: "*",
          textColor: "*",
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

module.exports = order
