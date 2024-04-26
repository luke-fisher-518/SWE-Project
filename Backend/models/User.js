const mongoose = require('mongoose')

const UserSch = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const Usermod = mongoose.model("users", UserSch)
module.exports = Usermod