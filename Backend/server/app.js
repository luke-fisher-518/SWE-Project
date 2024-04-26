const express = require("express");
const cors = require("cors");
const {connectDB} = require("./connect");
const records = require("./routes/record");


const PORT = process.env.PORT || 5050;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/", records);
app.listen(PORT);