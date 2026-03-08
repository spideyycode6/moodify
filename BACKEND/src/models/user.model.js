const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "passoword is required"],
        select:false
    }
});

userSchema.pre("save", async function () {
    console.log(this)
    if (!this.isModified('password')) {
        return
    }
    
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("save", function (doc) {
    console.log(`New user created: ${doc.username} `);
})

const userModel = mongoose.model("FaceEpression", userSchema);


module.exports = userModel