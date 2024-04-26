const pool = require("../database/db-connect");

exports.withdraw = async (accountNumber, amount) => {
  console.log(
    "%c 🔺: exports.withdraw -> accountNumber ",
    "font-size:16px;background-color:#066c1e;color:white;",
    accountNumber
  );
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM accounts WHERE account_number = $1`;
    const result = await client.query(query, [accountNumber]);
    console.log(
      "%c 3️⃣: exports.withdraw -> query ",
      "font-size:16px;background-color:#dd74bd;color:white;",
      query
    );

    console.log(
      "%c 🗝️: exports.withdraw -> result.rows.length ",
      "font-size:16px;background-color:#fa5445;color:white;",
      result.rows.length
    );
    if (result.rows.length === 0) {
      client.release();
      throw new Error("Account not found");
    }
    const account = result.rows[0];
    const {
      name,
      type,
      amount: currentAmount,
      credit_limit: creditLimit,
    } = account;

    if (type === "credit" && amount > creditLimit) {
      client.release();
      throw new Error("Withdrawal amount exceeds credit limit");
    }

    if (amount > 200) {
      client.release();
      throw new Error(
        "Withdrawal amount exceeds maximum limit per transaction"
      );
    }

    if (currentAmount - amount < 0 && type !== "credit") {
      client.release();
      throw new Error("Insufficient funds");
    }

    const updatedAmount = currentAmount - amount;
    const updateQuery = `UPDATE accounts SET amount = $1 WHERE account_number = $2`;
    await client.query(updateQuery, [updatedAmount, accountNumber]);

    client.release();
    return `Withdrawal of $${amount} successful from account ${name}`;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
