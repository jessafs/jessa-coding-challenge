const pool = require("../database/db-connect");

exports.withdraw = async (accountNumber, amount) => {
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM accounts where account_number=${accountNumber}`;
    const result = await client.query(query);

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
    const updateQuery = `UPDATE accounts SET amount =${updatedAmount} WHERE account_number = ${accountNumber}`;
    await client.query(updateQuery);

    client.release();
    return {
      msg: "Transaction complete, thanks for banking",
      withdrawal: amount,
      balance: currentAmount,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};

exports.inquire = async (accountNumber) => {
  try {
    const client = await pool.connect();
    const query = `SELECT * FROM accounts where account_number=${accountNumber}`;
    const result = await client.query(query);

    if (result.rows.length === 0) {
      client.release();
      throw new Error("Account not found");
    }
    const account = result.rows[0];

    client.release();
    return {
      msg: "ok",
      account,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};

exports.deposit = async (accountNumber, amount) => {
  try {
    const client = await pool.connect();
    const query1 = `SELECT * FROM accounts where account_number=${accountNumber}`;
    const result = await client.query(query1);

    if (result.rows.length === 0) {
      client.release();
      throw new Error("Account not found");
    }
    const account = result.rows[0];
    const newbal = account.amount + amount;
    const query = `Update accounts SET amount=${newbal} where account_number=${accountNumber}`;
    await client.query(query);
    client.release();
    return {
      msg: "ok",
      newbal,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
