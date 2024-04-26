import React, { useEffect, useState } from "react";
import { Card, Button, Container, TextField } from "@mui/material";
import TransactionModal from './transactionModal';
import axios from 'axios'
const Dashboard = () => {
    const [modalShow, setModalShow] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [accountBalance, setAccountBalance] = useState(0)
    const initialState = {
        accountNumber: "1",
        amount: "",
        name: ''
    }
    const [data, setData] = useState(initialState);
    const handleTransactionInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleOpen = (type) => {
        setModalShow(true);
        setTransactionType(type);
    }
    const handleClose = () => {
        setModalShow(false);
    }
    useEffect(() => {

    })
    const handleWithdrawal = async () => {
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
            const totalWithdrawalsPerDay = 0;
            if (withdrawalAmount + totalWithdrawalsPerDay > 400) {
                alert("You can only withdraw up to $400 in a single day.");
                return;
            }
            if (withdrawalAmount % 5 !== 0) {
                alert("You can only withdraw amounts that can be dispensed in $5 bills.");
                return;
            }

            const accountBalance = 1000;
            const creditLimit = 0;
            const isCreditAccount = false;

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

            const { data: { msg } } = await axios.post('http://localhost:3001/withdraw', {
                accountNumber,
                amount: withdrawalAmount
            })
            alert(msg);
            setAccountBalance(prevBalance => prevBalance - withdrawalAmount);
            setData(initialState);
            handleClose();
        } catch (error) {
            alert(error.message);
        }


    };

    const handleDeposit = async () => {
        try {
            const accountNumber = data.accountNumber;
            const depositAmount = parseInt(data.amount);
            if (!depositAmount || !accountNumber) {
                alert("Please enter both the valid amount and account number.");
                return;
            }
            const res = await axios.post(`http://localhost:3001/deposit`, {
                accountNumber,
                depositAmount
            })

            setAccountBalance(res.data.newbal)
            handleClose();
        } catch (error) {
            alert(error.message);
        }
    };
    const handleCheckBalance = async () => {
        setShowBalance(true)
        if (data.accountNumber) {
            alert("Kindly input account number")
        }
        const res = await axios.get(`http://localhost:3001/inquire/${data.accountNumber}`)
        const { data: { account: { amount, name } } } = res
        setAccountBalance(amount)
        setData({ ...data, name })
    };


    return (
        <>
            <Card className="card" style={{ backgroundColor: "antiquewhite" }}>
                <TextField
                    onInput={handleTransactionInput}
                    name="accountNumber"
                    required
                    label="Enter Account Number"
                    id="outlined-required"
                    sx={{ width: '100%' }}

                />
                <br /><br />
                {showBalance ?
                    (<h4>{data.name} your balance is {accountBalance}</h4>) : (null)
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