const bcrypt = require("bcrypt")

module.exports.createCrypt = async function createCrypt(word){
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    return await bcrypt.hash(word,salt);
}


module.exports.compareCrypt =  async function compareCrypt(crypt,word){ // bu yerda eski tepadagi tuzlagan kodimiz bilan bir xil yoki bir xil emasligini solishtirib beradi, agar bir xil bo'lsa logi da shundoq kirgizib yuboradi , aks xolda error chiqadi
    return await bcrypt.compare(word,crypt)
}