const express = require("express");
const db = require("./database/db-connect");
const routes = require("./routes/transactionRoutes");

const app = express();

db.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
    return;
  }
  console.log("Connected to the database!");
});

app.use(express.json());
app.use("/", routes);
// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
