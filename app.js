const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const { requireAuth, checkUser } = require("./middleware/authMiddleware")
const PORT = process.env.LOCAL_SERVER_PORT || 3200
const DB_CONNECT = process.env.DB_CONNECTION

const app = express()

//ejs middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


//database connection
mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res => app.listen(PORT, () => console.log(`connected to port ${PORT}`)))
.catch(err => console.log(err))


//routes
app.use("*", checkUser)
app.get("/", (req, res) => res.render("home"))
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies", { title: "Smoothies"}))
app.use(authRoutes)

