const bcrypt = require("bcryptjs");
const { findOne } = require("../../model/User");
const User = require("../../model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

//register user
const registerCtrl = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exists", 400));
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new Error(error));
  }
};

//login user
const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(appErr("Invalid login credentials", 404));
    }

    //check password for validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) return next(appErr("Invalid login credentials", 404));

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

//profile details
const profileCtrl = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transaction",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//delete
const deleteCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//update
const updateCtrl = async (req, res, next) => {
  try {
    //Check if email exist
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) return next(appErr("email already exists", 404));
    }

    //check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //send the response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    //send the response
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  profileCtrl,
  deleteCtrl,
  updateCtrl,
};
