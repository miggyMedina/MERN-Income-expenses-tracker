const express = require("express");
const {
  createTransactionsCtrl,
  getTransactionsCtrl,
  singleTransactionCtrl,
  deleteCtrl,
  updateCtrl,
} = require("../../controllers/transactions/transactionsCtrl");
const isLogin = require("../../middlewares/isLogin");

const transactionsRoute = express.Router();

//POST/api/v1/transactions
transactionsRoute.post("/", isLogin, createTransactionsCtrl);
//GET/api/v1/transactions
transactionsRoute.get("/", getTransactionsCtrl);
//GET/api/v1/transactions/:id
transactionsRoute.get("/:id", singleTransactionCtrl);
//DELETE/api/v1/transactions/:id
transactionsRoute.delete("/:id", deleteCtrl);
transactionsRoute.put("/:id", updateCtrl);
//PUT/api/v1/transactions/:id

module.exports = transactionsRoute;
