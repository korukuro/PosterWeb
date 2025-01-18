const express = require("express");
const router = express.Router();
const { addDelivery,getDeliveryAddress } = require("../controllers/Delivery");
const { verifyToken } = require("../middleware/auth");

router.post("/addDelivery", verifyToken, addDelivery);
router.get("/getDeliveryAddress", verifyToken, getDeliveryAddress);

module.exports = router;
