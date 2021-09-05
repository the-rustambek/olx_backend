const router = require("express").Router();
const {
    createCrypt
} = require("../modules/bcrypt")
const {
    compareCrypt
} = require("../modules/bcrypt")
const {
    checkToken
} = require("../modules/jwt")
const {
    createToken
} = require("../modules/jwt")
const {
    ObjectId
} = require("mongodb");


router.get("/about", (req, res) => {
    res.render("about")
})


router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/reg", (req, res) => {
    res.render("reg")
})

router.post("/reg", async (req, res) => {
    // console.log(req.body)
    const {
        email,
        password,
        fullname
    } = req.body;

    if (!(email && password)) {
        res.render("login", {
            error: "Email or Password not found",
        });
        return; // keyingi qatorga kod o'tib ketib qolmasligi uchun return qo'yildi
    }
    let user = await req.db.users.findOne({ // shu email ga boshqa odam ro'yhatdan o'tganmi yo'qmi shuni qidirib tekshirib ko'ramiz
        email: email.toLowerCase(),
    });
    if (user) {
        res.render("index", {
            error: "Email already exists"
        });
        return; // keyingi qatorga kod o'tib ketib qolmasligi uchun return qo'yildi
    }
    // console.log(user)



    user = await req.db.users.insertOne({ // bu yerda else ni o'rniga shunday yozsa bo'ladi, yani else siz ham shunday yozsa boladi, oldinlari ko'rgan edik boshida . yani bu yerda user bo'lmasa shunday user yaratib ol deyapti insertOne() qilib
        fullname: fullname.toLowerCase(),
        email: email.toLowerCase(),
        password: await createCrypt(password),
        data: [],
    });
    // console.log(user)
    res.redirect("/login")

});


router.post("/login", async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!(email && password)) {
        res.render("login", {
            error: "Email or Password not found",
        })
        return;
    }
    let user = await req.db.users.findOne({
        email: email.toLowerCase(),
    });
    if (!user) {
        res.render("login", {
            error: "User not found",
        });
        return;
    };
    // console.log(user)

    if (!(await compareCrypt(user.password, password))) {
        res.render("index", {
            error: "Password is incorrect",
        });
        return;
    }

    const token = createToken({
        user_id: user._id,
    });

    res.cookie("token", token).redirect("/")


});


//  faqatgina ro'yhatdan o'tgan odamlar kira oladigan route yozib qo'yamiz

async function AuthUserMiddleware(req, res, next) { //global middleware
    if (!req.cookies.token) {
        res.redirect("/login");
    }

    const isTrust = checkToken(req.cookies.token);

    console.log(isTrust)

    if (isTrust) {
        req.user = isTrust;
        console.log(isTrust);
        next()
    } else {
        res.redirect("/login")
    }
};



router.post("/ads", AuthUserMiddleware, async (req, res) => {
    const {user_id} = req.user;
    const { adsName,number,address,img,price,adsAbout} = req.body

    await req.db.users.updateOne({
            _id: ObjectId(user_id)
        },{
            $push: {
                data: {
                    $each: [{ // each qiymatning har bir elementini  alohida qo'shish uchun 
                        adsName: req.body.adsName,
                        number: req.body.number,
                        address: req.body.address,
                        img: req.body.img, // mana shu joyida qandaydir error chiqishi mumkin
                        price: req.body.price,
                        adsAbout: req.body.adsAbout,
                        time: new Date().toLocaleString(),
                    }],
                }
            }

        })
    // res.redirect("/") // mana shu joyga balkim index    qo'yilishi kerak edimi
    // console.log(data)
});


router.get("/", AuthUserMiddleware, async (req, res) => {
    const {user_id} = req.user
    let info = await req.db.users.findOne({
        _id: new ObjectId(user_id),
    })
    let data = await info.data; 
    console.log("info") 
  res.render("index", {
        data,
    })
});


router.get("/ads",async (req, res) => {
    
    res.render("ads")
});







module.exports = {
    router,
    path: "/",

}