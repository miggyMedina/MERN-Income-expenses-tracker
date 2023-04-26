const Account = require("../../model/Account");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");

//create account
const createCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    //1. find the logged in user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    //create the account
    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });
    //push the aacount into users account field
    userFound.accounts.push(account._id);
    //resave the user.
    await userFound.save();
    res.json({ status: " Success", data: account });
  } catch (error) {
    next(error);
  }
};

//single details
const singleDetailsCtrl = async (req, res, next) => {
  try {
    //find the id from params
    const { id } = req.params;
    const account = await Account.findById(id).populate("transaction");
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(appErr(error.mesage, 500));
  }
};

//all details
const allAccountDetailsCtrl = async (req, res, next) => {
  try {
    const accounts = await Account.find().populate("transaction");
    res.json(accounts);
  } catch (error) {
    next(appErr(error.mesage, 500));
  }
};

//delete
const deleteCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.mesage, 500));
  }
};

//update
const updateCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    next(appErr(error.mesage, 500));
  }
};
module.exports = {
  createCtrl,
  singleDetailsCtrl,
  allAccountDetailsCtrl,
  deleteCtrl,
  updateCtrl,
};
