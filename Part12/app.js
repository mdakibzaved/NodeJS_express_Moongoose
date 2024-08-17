const express = require('express')
const app =express();
const path = require('path')
const userModel = require('./models/user');
const user = require('./models/user');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
// app.set("view-engine",ejs)

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

//READ
app.get('/read',async(req,res)=>{
    let allusers = await userModel.find();
    res.render('read.ejs',{users:allusers} )   //user - users
}) 

//delete
app.get('/delete/:id',async(req,res)=>{
    let users = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read')    
}) 

// CREATE
app.post('/create',async(req,res)=>{
    let {name,email,image} = req.body

    let createdUser = await userModel.create({
        name,               //name:name
        email,
        image
    })
    res.redirect('/read')
    // res.send(createdUser)
})


// EDIT
app.get('/edit/:userid',async(req,res)=>{
    let findeUser = await userModel.findOne({_id:req.params.userid})
    res.render('update.ejs' ,{users:findeUser})   //user - users
})

// UPDATE
app.post('/update/:userid',async(req,res)=>{
    let {name,email,image} = req.body
    let findeUser = await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true})
    res.redirect('/read')   //user - users
})


app.listen(3000)

