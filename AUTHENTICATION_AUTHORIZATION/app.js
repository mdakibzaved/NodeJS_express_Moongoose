const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Initialize cookie-parser middleware
app.use(cookieParser());

/* //1️⃣Cookie makings
app.get("/",(req,res)=>{
    res.cookie("name","akib@gmail.com") //set  [name,data]
    res.send("Done")
})

//cookie wiil come from ur browser now
app.get("/read",(req,res)=>{ 
    // console.log(req.cookies)  //for access cookie 
    res.send("Done")
})

*/




//2️⃣ To hash a password, you need to generate a salt and then hash the password with that salt:
/*
// // ENCRYPT
// let password = "akib3456"
// app.get("/",(req,res)=>{
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash(password,salt,(err,hash)=>{
//             // Store hash in your password DB
//             console.log(hash)
//         })
//     })
// })



// // DYCRIPT
// let hasedPwd = "$2b$10$8hv4wX8mi9wZPR6.pWadVOt6Sroq2j3xZXxQkqyC6.OeUSZxtQmtW"
// let password = "akib3456"
// app.get("/",(req,res)=>{
//     bcrypt.compare(password,hasedPwd,(err,result)=>{
//         // result will be bollean
//         console.log(result)
//     })
// })

*/


// 3️⃣ JWT:  JWT (JSON Web Token) is a way to securely transmit information between two parties.It is widely used for authentication and information exchange

// Create Tokens: Use jwt.sign to create tokens.
// Verify Tokens: Use jwt.verify to verify tokens.

let secret = "manjan"
app.get("/",(req,res)=>{
    let token = jwt.sign({email:'akib@gmail.com'},secret)
    // let send it on browser
    res.cookie("token",token)
    res.send("DONE DONE")
})

app.get("/read",(req,res)=>{ 
    let data = jwt.verify(req.cookies.token,secret)    
    console.log(data)
})


app.listen(3000,()=>{
    console.log("Server Started ....")
})

 
