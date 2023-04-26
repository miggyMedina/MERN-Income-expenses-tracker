const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose,
      mongoose.connect(
        "mongodb+srv://miggy:0DgbXYrwjfoW0xGe@fullstock-blog-v3.kh835on.mongodb.net/income-expenses-app?retryWrites=true&w=majority"
      );
    console.log("Db connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
dbConnect();
