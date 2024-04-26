const express = require("express");
const router = express.Router();

const transactionControllers = require("../controller/transactionController");

router.post("/withdraw", transactionControllers.withdraw);
router.get("/inquire/:id", transactionControllers.inquire);
router.post("/deposit", transactionControllers.deposit);

module.exports = router;
