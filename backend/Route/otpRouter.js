const router = require("express").Router();
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.accoutnSID, process.env.authToken);


router.post("/mobile", (req, res) => {
  console.log("number", req.body.phoneNumber);
  client.verify
    .services(process.env.serviceSID)
    .verifications.create({
      to: `+91${req.body.phoneNumber}`,
      channel: "sms",
    })
    .then((resp) => {
      console.log("response", resp);
      res.status(200).json(resp);
    });
});

router.post("/otp", (req, res) => {
  console.log(req.body);
  const { otp, userNumber } = req.body;
  console.log("otp ", otp);
  client.verify
    .services(process.env.serviceSID)
    .verificationChecks.create({
      to: userNumber,
      code: otp,
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.valid) {
        res.json({ resp, message: "Welcome" });
      }
      res.json({resp, message: "Expire Otp" });
    });
});

module.exports = router;