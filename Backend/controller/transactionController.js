const transactionServices = require("../services/transactionServices");

exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    const result = await transactionServices.withdraw(accountNumber, amount);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.inquire = async (req, res) => {
  try {
    const { id: accountNumber } = req.params;

    const result = await transactionServices.inquire(accountNumber);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

exports.deposit = async (req, res) => {
  try {
    const { accountNumber, depositAmount: amount } = req.body;
    const result = await transactionServices.deposit(accountNumber, amount);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
