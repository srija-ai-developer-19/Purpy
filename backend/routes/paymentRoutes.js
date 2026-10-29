const express = require("express"); const router = express.Router();
router.post("/create", (req,res) => res.json({success:true, txnId:"TXN_"+Date.now()}));
module.exports = router;