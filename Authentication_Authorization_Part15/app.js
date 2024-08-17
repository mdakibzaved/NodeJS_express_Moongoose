const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// __________________________________________________




// MAIN PAGE
app.get('/', (req, res) => {
    res.render("index");
});

// CREATION PAGE
app.post('/create', async (req, res) => {
    let { username, email, password, age } = req.body;
    
    // Encryption
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });
            // create a token
            let token = jwt.sign({ email }, "shhhhhh");
            res.cookie("token", token);
            res.send(createdUser);
        });
    });
});

// LOGOUT
app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}); 

// LOGIN
app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email });
    if(!user) return res.send("Something is wrong");

    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result) {
            let token = jwt.sign({email:user.email}, "shhhhhh");
            res.cookie("token", token);
            res.render("profile")
        }
        res.send("You cant Login")
        
    })
     
});

app.listen(3000, () => {
    console.log("server Started.......");
});
