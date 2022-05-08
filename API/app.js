require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  fileUpload = require("express-fileupload"),
  cors = require("cors");

const path = require("path");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/upload", express.static(path.join(__dirname, "/upload")));

const contactRouter = require("./routers/contact");
const userRouter = require("./routers/user");

app.use("/api/v0/contact", contactRouter);
app.use("/api/v0/user", userRouter);

app.get("*", (req, res, next) => {
  res.status(200).json({
    msg: "this route no avaliable",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status || 200;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running from http://127.0.0.1:${process.env.PORT}`);
});
