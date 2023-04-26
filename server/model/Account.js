const mongoose = require("mongoose");

//user schema
const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      enum: [
        "Savings",
        "Investment",
        "Checking",
        "Credit Card",
        "Billing",
        "School",
        "Project",
      ],
      required: true,
    },
    initialBalance: {
      type: Number,
      default: 0,
    },
    transaction: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
