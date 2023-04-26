const express = require("express");
const {
  createCtrl,
  singleDetailsCtrl,
  allAccountDetailsCtrl,
  deleteCtrl,
  updateCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");
const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post("/", isLogin, createCtrl);
//GET/api/v1/accounts/:id
accountsRoute.get("/:id", singleDetailsCtrl);
//GET/api/v1/accounts
accountsRoute.get("/", allAccountDetailsCtrl);
//DELETE/api/v1/accounts/:id
accountsRoute.delete("/:id", deleteCtrl);
//PUT/api/v1/accounts/:id
accountsRoute.put("/:id", updateCtrl);

module.exports = accountsRoute;
