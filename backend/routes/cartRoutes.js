const express = require("express"); const router = express.Router();
router.post("/validate", (req,res) => {
  const total = req.body.items.reduce((s,i)=> s + i.price*i.quantity,0);
  res.json({total});
}); module.exports = router;