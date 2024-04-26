import React, { useState } from "react";
import { Card, Button, Container } from "@mui/material";
import TransactionModal from './transactionModal';

const Dashboard = () => {
    const [modalShow, setModalShow] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [accountBalance, setAccountBalance] = useState(1000)
    const initialState = {
        accountNumber: "",
        amount: ""
    }
    const [data, setData] = useState(initialState);
    const handleTransactionInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleOpen = (type) => {
        setModalShow(true);
        // setBtnChange(true)
        setTransactionType(type);
    }
    const handleClose = () => {
        setModalShow(false);
    }
    const handleWithdrawal = () => {
        const withdrawalAmount = parseInt(data.amount);
        const accountNumber = data.accountNumber;
        try {
            if (!withdrawalAmount || !accountNumber) {
                alert("Please enter both the amount and account number.");
                return;
            }
            if (withdrawalAmount <= 0) {
                alert("Please enter a valid withdrawal amount.");
                return;
            }
            if (withdrawalAmount > 200) {
                alert("You can only withdraw up to $200 in a single transaction.");
                return;
            }
            // You can keep track of the total withdrawals made in a day using a variable or by calling an API
            const totalWithdrawalsPerDay = 0; // Replace this with the actual total withdrawals made in a day
            if (withdrawalAmount + totalWithdrawalsPerDay > 400) {
                alert("You can only withdraw up to $400 in a single day.");
                return;
            }
            // Check if the withdrawal amount can be dispensed in $5 bills
            if (withdrawalAmount % 5 !== 0) {
                alert("You can only withdraw amounts that can be dispensed in $5 bills.");
                return;
            }

            // Check if the customer has sufficient funds in their account or credit limit
            const accountBalance = 1000; // Replace this with the actual account balance
            const creditLimit = 0; // Replace this with the actual credit limit
            const isCreditAccount = false; // Replace this with the actual logic to determine if it's a credit account

            if (isCreditAccount) {
                if (withdrawalAmount > creditLimit) {
                    alert("You cannot withdraw more than your credit limit.");
                    return;
                }
            } else {
                if (withdrawalAmount > accountBalance) {
                    alert("You do not have sufficient funds in your account.");
                    return;
                }
            }

            // Perform the withdrawal operation
            // You can call an API or update the account balance/credit limit here
            setAccountBalance(prevBalance => prevBalance - withdrawalAmount);
            // Reset the form data
            setData(initialState);

            // Close the modal
            handleClose();
        } catch (error) {
            alert(error.message);
        }


    };

    const handleDeposit = () => {
        try {
            const accountNumber = data.accountNumber;
            const depositAmount = parseInt(data.amount);
            if (!depositAmount || !accountNumber) {
                alert("Please enter both the valid amount and account number.");
                return;
            }

            // Check if the deposit amount exceeds the maximum limit per transaction
            if (depositAmount > 1000) {
                throw new Error("You can only deposit up to $1000 in a single transaction.");
            }
            setAccountBalance(prevBalance => prevBalance + depositAmount);
            // Perform the deposit operation
            // You can call an API or update the account balance here
            // setAccountBalance(depositAmount += accountBalance)

            // Reset the form data
            setData(initialState);

            // Close the modal
            handleClose();
        } catch (error) {
            alert(error.message);
        }
    };
    const handleCheckBalance = () => {
        // Retrieve the account balance
        const accountBalance = 0; // Replace this with the actual account balance
        setShowBalance(true)
        // Display the account balance to the user

    };


    return (
        <>
            <Card className="card" style={{ backgroundColor: "antiquewhite" }}>
                {showBalance ?
                    (<h4>Your Account Balance: {accountBalance}</h4>) : (null)
                }
                <Container className="card-container">
                    <Button onClick={() => handleOpen("withdraw")} className="transactionBtn" size="large" variant="outlined">
                        Withdraw
                    </Button>
                    <Button onClick={() => handleOpen("deposit")} className="transactionBtn" size="large" variant="outlined">
                        Deposit
                    </Button>
                    <Button onClick={handleCheckBalance} className="transactionBtn" size="large" variant="outlined">
                        Balance Inquire
                    </Button>
                </Container>
            </Card>
            <TransactionModal
                show={modalShow}
                transactionType={transactionType}
                handleClose={handleClose}
                handleTransactionInput={handleTransactionInput}
                handleWithdrawal={handleWithdrawal}
                handleDeposit={handleDeposit}
            />

        </>
    )
}
export default Dashboard