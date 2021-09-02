const {sign,verify} = require("jsonwebtoken")
const SECRET_WORD = "birnima";

module.exports.createToken = (data) =>{ 
    return sign(data,SECRET_WORD);
};

module.exports.checkToken = (token) =>{
    try{
        return verify(token, SECRET_WORD) // eski token bilan tekshiradi 
    }
    catch(error){
        return false // error chiqsa otvoradi
    }
}

