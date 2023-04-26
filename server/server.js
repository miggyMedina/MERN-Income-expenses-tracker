const express = require("express");
const cors = require("cors");
const globalErrHandler = require("./middlewares/globalErrHandler");
require("./config/dbConnect");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const usersRoute = require("./routes/users/usersRoute");

const app = express();

//middlewares
app.use(express.json());

//cors middleware
app.use(cors());

//routes

//users route---------------------------------------------

app.use("/api/v1/users", usersRoute);

//account route--------------------------------------------
app.use("/api/v1/accounts", accountsRoute);

//trasactions route------------------------------------------
app.use("/api/v1/transactions", transactionsRoute);

//error handlers---------------------------------------------
app.use(globalErrHandler);

//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running ${PORT}`));
