const express = require("express");
const router = express.Router();

const transactionControllers = require("../controller/transactionController");

router.post("/withdraw", transactionControllers.withdraw);

module.exports = router;
