const express =  require("express")
const server = express()
const cookieParser =  require("cookie-parser")
const path = require("path")
const userRoute = require("./routes/userRoute")
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

server.set("view engine", "ejs")

