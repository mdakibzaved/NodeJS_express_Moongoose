// Express.js is an npm (Node Package Manager) =package= and web application framework that runs on Node.js, which is a JavaScript runtime. manages everything from receving request and giving response

// Simplifies Web Development: It provides a simpler way to build web applications and APIs by handling the common tasks like routing  and middleware (functions that execute during the request-response cycle).  

// it lightweight. It's also flexible because you can add any functionality you need through middleware or third-party libraries.




// CODE
const express = require('express')
const app = express()

/* 
//▶️▶️ Creating Routing
app.get("/",(req,res)=>{
    res.send("This Res is sended by the server at Home :)")
}) 
app.get("/profile",(req,res)=>{
    res.send("This Res is sended by the server at profile page of Akib-> Supreme unstopable!!")
}) 
app.get("/about",(req,res)=>{
    res.send("akib Zaved is Supreme Men and @Software_Devloper..")   
}) 

// Staring the Server
app.listen(3000)

//❗ Always We need to restart our server in changes so you can use nodemon packages   
// to start nodemon ->     npx nodemon "script.js"

*/









//▶️▶️ Middleware
// it is present inb/w   {user}---[MiddleWare]---{server} 
// we can perform any opertaion before reaching the [route] through middleware 
// ex- paid e learning platform show email on video

// if i want to access to "/" & request to server it will go on 1st middleWare & req will forword to 2nd middleware    After that your req will get in response  "/" route


app.use((req,res,next)=>{
    // res.send("1 Middleware is Running..")  response agar server se yhi se send kroge to route kaise perform kroge !😁🫵🏽
    console.log("Middle ware 1 ")
    next();   //forword the req coming from user
})
app.use((req,res,next)=>{
    console.log("Middle ware 2 ")
    next();   //forword the req coming from user
})
 

app.get("/about",(req,res)=>{
    res.send("Champion of MERN stack")
})
app.get("/contact",(req,res)=>{
    res.send("Contact info   ")
})


// profile route get errors
app.get("/profile",(req,res,next)=>{  //next hona compalsory at that route so that we can use Error handlers
    return next(new Error("Someting went wrong"))   //it means return when error and print err
})



// Error Handlers :- Error-handling middleware functions specifically handle errors that occur during the execution of other middleware functions and route handlers.
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send("Something broke! check it out ")   //response from server for error
})
app.listen(3000)




