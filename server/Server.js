require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// app.use(express.json());

app.use(cors());
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const { API_PORT,MONGO_USERNAME,MONGO_PASSWORD } = process.env;
const port = process.env.PORT || API_PORT;
const { MONGO_URI } = process.env;
mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.vheon.mongodb.net/users_db?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/user", require("./Routes/UsersRoute"));
app.use("/pet", require("./Routes/PetsRoute"));
app.use("/", require("./Routes/LoginSignupRoute"));

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
