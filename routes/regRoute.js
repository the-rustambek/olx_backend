const router =  require("express").Router();


router.get("/reg",(req,res) =>{
    res.render("reg")
})









module.exports={
    router,
    path:"/"
}