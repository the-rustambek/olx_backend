const router =  require("express").Router();


router.get("/",(req,res) =>{
    // console.log(req.db)
    res.render("index")
})

router.get("/about",(req,res) =>{
    res.render("about")
})


router.get("/login",(req,res) =>{
    res.render("login")
})

router.post("/login", async(req,res) =>{
    console.log(req.body)
    const {email, password} = req.body;

    if(!(email && password)){
        res.render("login",{
            error: "Email or Password not found",
        });
        
    }
    let user= await req.db.users.findOne({
        email:email.toLowerCase(),
    })
});


router.get("/reg",(req,res) =>{
    res.render("reg")
})






module.exports={
    router,
    path:"/"
}