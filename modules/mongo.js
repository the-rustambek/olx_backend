const { MongoClient } = require("mongodb")
const mongoUrl = "mongodb://localhost:27017"

// console.log(mongoUrl)

const client = new MongoClient(mongoUrl);


async function mongo(){
    // console.log(client)
    try{
        await client.connect();
        const db = await client.db("ads")

        const users = await db.collection("users")

        return {
            users,
        };
    }
    catch(error){
        console.log(error)
    }
}

mongo()

module.exports = mongo;