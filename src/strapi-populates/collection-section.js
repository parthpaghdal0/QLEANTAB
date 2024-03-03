const collection_section = {
  singularName: "collection-section",
  queryParams: {
    populate: {
      background: "*",
      heading: "*",
      handle: "*",
      image: "*",
      button: {
        populate: {
          title: "*",
          url: "*",
        },
      },
      pargraph_one: "*",
      pargraph_two: "*",
      collection_pars: "*",
      position: "*",
      background_color: "*",
      mobile_image: "*",
    },
  },
}

module.exports = collection_section
