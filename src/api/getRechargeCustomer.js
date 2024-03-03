const axios = require("axios")
const recharge_sk = process.env.RECHARGE_SK

export default async function handler(req, res) {
  try {
    if (req.method != "POST") return res.status(400)
    const { email } = req.body
    const config = {
      method: "get",
      url: `https://api.rechargeapps.com/customers?email=${email}`,
      headers: {
        "X-Recharge-Version": "2021-11",
        "X-Recharge-Access-Token": recharge_sk,
      },
    }

    const rechargeCustomer = await axios(config)
    // console.log(JSON.stringify(rechargeCustomer.data))
    res.status(200).json({
      data: rechargeCustomer.data,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}
