const express = require("express")
const app = express()
const mongoose = require('mongoose')
const Usermod = require('./models/User')

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://cadewcocoabeach:root@cluster0.lyblfks.mongodb.net/Final?retryWrites=true&w=majority")

app.get("/getUsers", (req, res) => {
    Usermod.find().then(users => res.json(users)).catch(err => res.json(err));
});

app.post("/addUser", async (req, res) => {
    const user = req.body
    const newuser = new Usermod(user)
    await newuser.save()

    //res.json(user)
})

app.listen(3001, () => {
    console.log("Server Runs")
})