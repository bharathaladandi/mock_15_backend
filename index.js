const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const {connection} = require("./config/db")
const {UserModel} = require("./models/User.model")
const { authenticate } = require("./middlewares/authentication");
const { CalcRouter } = require("./routes/calculator.route");
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome")
})

app.post("/signup", async (req, res) => {
    const {email, password,name,age} = req.body;
    const userPresent = await UserModel.findOne({email})
    if(userPresent){
        res.send("Try loggin in, already exist")
    }
    try{
        bcrypt.hash(password, 4, async function(err, hash) {
            const user = new UserModel({email,password:hash,name,age})
            await user.save()
            res.send("Sign up successfull")
        });
       
    }
   catch(err){
        console.log(err)
        res.send("Something went wrong, pls try again later")
   }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashed_password = user[0].password;
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, 'hush');
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong, please try again later")
    }
})


app.get("/about", (req, res) => {
    res.send("About us data..")
})


app.use(authenticate)
app.use("/bmical", CalcRouter)

app.listen(8080, async () => {
    try{
        await connection;
        console.log("Connected to DB Successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log("Listening on PORT 8080")
})

