const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/my-database";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
