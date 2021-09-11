const express =  require("express");
const server = express();
const cookieParser =  require("cookie-parser");
const path = require("path");
const userRoute = require("./routes/userRoute");
const PORT = process.env.PORT || 3333;
// const aboutRoute =  require("./routes/aboutRoute")
// const adsRoute =  require("./routes/adsRoute")
// const loginRegRoute =  require("./routes/loginRegRoute")
const mongo = require("./modules/mongo");

// const expressFileUpload =  require("express-fileupload")


server.listen(PORT, () =>{
    console.log(`Server Ready at ${PORT}`);
});

server.use(express.json());
server.use(express.urlencoded({
    extended:true,
}));

server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public"))) ;
server.use("/bootstrap/css", express.static(path.join(__dirname,"node_modules","bootstrap","dist", "css")));
server.use("/bootstrap/js", express.static(path.join(__dirname,"node_modules","bootstrap","dist", "js")));



(async function(){
    const db = await mongo();
    await server.use((req,res,next) =>{
        req.db = db; // req.db ni mongo yani databasa bilan boglab shu nom bilan nomlayapti, 2 qator repada chaqirgan edi mongo ni
        next();
    });
    server.use(userRoute.path, userRoute.router);
//    await server.use(aboutRoute.path, aboutRoute.router);
//    await server.use(adsRoute.path, adsRoute.router);
//    await server.use(loginRegRoute.path, loginRegRoute.router);
})();



server.set("view engine", "ejs");

