const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { appErr } = require("../../utils/appErr");

//create
const createTransactionsCtrl = async (req, res, next) => {
  const { name, amount, category, transactionType, notes, account } = req.body;
  try {
    //1.find user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    //2.find the account
    const accountFound = await Account.findById(account);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    //3. Create the transaction
    const transaction = await Transaction.create({
      name,
      amount,
      category,
      transactionType,
      notes,
      account,
      createdBy: req.user,
    });
    //4.Push the transaction to the account
    accountFound.transaction.push(transaction._id);
    //5.resave the account
    await accountFound.save();
    res.json({ status: "success", data: transaction });
  } catch (error) {
    res.json(error);
  }
};

//fetch all details
const getTransactionsCtrl = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.json(transaction);
  } catch (error) {
    res.json(error);
  }
};

//single details
const singleTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    res.json({
      state: "success",
      data: transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//deleteCtrl
const deleteCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    return res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.json(error);
  }
};

//update
const updateCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};
module.exports = {
  createTransactionsCtrl,
  getTransactionsCtrl,
  singleTransactionCtrl,
  deleteCtrl,
  updateCtrl,
};
