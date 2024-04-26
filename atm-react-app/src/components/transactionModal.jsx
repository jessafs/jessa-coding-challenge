import React from "react";
import { Modal, Card, CardContent, TextField, Button, InputAdornment } from '@mui/material'
const TransactionModal = (props) => {
  const { show, handleClose, handleTransactionInput, handleWithdrawal, transactionType, handleDeposit } = props ?? {}

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className="modal-card">
        <CardContent>
          <h2 style={{ color: "red" }}>Kindly fill in the fields</h2>
          <TextField
            onInput={handleTransactionInput}
            name="accountNumber"
            required
            label="Enter Account Number"
            id="outlined-required"
            sx={{ width: '100%' }}

          /><br /><br />
          <TextField
            onInput={handleTransactionInput}
            required
            name="amount"
            label="Amount"
            id="outlined-required"
            sx={{ width: '100%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          /><br /><br />
          {transactionType === "withdraw" ? (
            <Button onClick={handleWithdrawal} className="transactionBtn" color="success" size="large" variant="outlined">
              Withdraw
            </Button>
          ) : (
            <Button onClick={handleDeposit} className="transactionBtn" color="success" size="large" variant="outlined">
              Deposit
            </Button>
          )}
        </CardContent>
      </Card>
    </Modal>
  )
};
export default TransactionModal;
