const axios = require("axios")
const recharge_sk = process.env.RECHARGE_SK

const addAddress = async addressId => {
  const configAddress = {
    method: "get",
    url: `https://api.rechargeapps.com/addresses/${addressId}`,
    headers: {
      "X-Recharge-Version": "2021-11",
      "X-Recharge-Access-Token": recharge_sk,
    },
  }

  try {
    const rechargeAddress = await axios(configAddress)
    return rechargeAddress.data
  } catch (error) {
    return error
  }
}

export default async function handler(req, res) {
  try {
    if (req.method != "POST") return res.status(400)
    const { customerId } = req.body

    const configSub = {
      method: "get",
      url: `https://api.rechargeapps.com/subscriptions?customer_id=${customerId}`,
      headers: {
        "X-Recharge-Version": "2021-11",
        "X-Recharge-Access-Token": recharge_sk,
      },
    }

    const rechargeSubs = await axios(configSub)

    const hasSubs = rechargeSubs.data.subscriptions.length !== 0

    if (hasSubs) {
      for (const address of rechargeSubs.data.subscriptions) {
        const fullAddress = await addAddress(address.address_id)
        address.fullAddress = fullAddress
      }
    }

    res.status(200).json({
      data: {
        subs: rechargeSubs.data,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}

//WITH ORDERS ASWELL
// const axios = require("axios")
// const recharge_sk = process.env.RECHARGE_SK

// export default async function handler(req, res) {
//   try {
//     if (req.method != "POST") return res.status(400)
//     const { customerId } = req.body

//     const configOrder = {
//       method: "get",
//       url: `https://api.rechargeapps.com/orders?customer_id=${customerId}`,
//       headers: {
//         "X-Recharge-Version": "2021-11",
//         "X-Recharge-Access-Token": recharge_sk,
//       },
//     }

//     const configSub = {
//       method: "get",
//       url: `https://api.rechargeapps.com/subscriptions?customer_id=${customerId}`,
//       headers: {
//         "X-Recharge-Version": "2021-11",
//         "X-Recharge-Access-Token": recharge_sk,
//       },
//     }

//     const rechargeOrders = await axios(configOrder)
//     const rechargeSubs = await axios(configSub)

//     res.status(200).json({
//       data: {
//         orders: rechargeOrders.data,
//         subs: rechargeSubs.data,
//       },
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Internal server error" })
//   }
// }
