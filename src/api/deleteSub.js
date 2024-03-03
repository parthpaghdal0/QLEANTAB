const axios = require("axios")
const recharge_sk = process.env.RECHARGE_SK

export default async function handler(req, res) {
  try {
    if (req.method != "POST") return res.status(400)
    const { subId } = req.body
    const config = {
      method: "delete",
      url: `https://api.rechargeapps.com/subscriptions/${subId}`,
      headers: {
        "X-Recharge-Version": "2021-11",
        "X-Recharge-Access-Token": recharge_sk,
      },
    }

    const deleteSubResponse = await axios(config)
    // console.log(subId)
    // res.status(200).json({
    //   data: subId,
    // })
    res.status(200).json({
      data: deleteSubResponse.data,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}
