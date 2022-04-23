const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

//defining user schema
const userSchema = new Schema({
    email: {
        type: String, 
        required: [true, "Please email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password cannot be less than 4 characters"]
    }
}, { timestamps: true })

//mongoose hoo, function runs after save
userSchema.post("save", function(doc, next) {
    console.log("new user created", doc)
    next()
})

//mongoose hoo, function runs before save
userSchema.pre("save", async function(next) {
    const salt =  await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}

const User = mongoose.model("user", userSchema)
module.exports = User