const transactionServices = require("../services/transactionServices");

exports.withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    console.log(
      "%c 🇨🇬: exports.withdraw -> accountNumber ",
      "font-size:16px;background-color:#74db3a;color:black;",
      accountNumber,
      amount
    );
    const result = await transactionServices.withdraw(accountNumber, amount);
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};
