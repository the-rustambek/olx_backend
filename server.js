const express =  require("express")
const server = express()
const cookieParser =  require("cookie-parser")
const path = require("path")
const userRoute = require("./routes/userRoute")
const loginRoute = require("./routes/loginRoute")
const regRoute = require("./routes/regRoute")
// mongo


server.listen(3030)
server.use(express.json())
server.use(express.urlencoded({
    extended:true,
}));

server.use(cookieParser())
server.use("/uploads",express.static(path.join(__dirname, "public"))) 
server.use("/bootstrap", express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
server.use("/bootstrap", express.static(path.join(__dirname,"node_modules","bootstrap","js")));

server.use(userRoute.path, userRoute.router)
server.use(loginRoute.path, loginRoute.router)
server.use(regRoute.path, regRoute.router)


server.set("view engine", "ejs")


