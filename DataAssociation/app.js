const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const user = require('./models/user');


// _________________________________________________________________
// Data Association
// Data association in MongoDB typically involves linking documents across collections to create relationships. MongoDB, being a NoSQL database, doesn't inherently support joins like relational databases, but you can still achieve associations using various methods like embedding documents or referencing.

// Explanation:
// Users Collection: Stores user information & referencing postId from the Collection collection. []of id refer to post
// Post Collection: Stores product(Post) details & referencing userId from the Users collection.
// __________________________________________________________________





app.get("/",(req,res)=>{
    res.send("HEYYYYY____")
})


// User
app.get("/create",async(req,res)=>{
    let user = await userModel.create({
        username:"Akib",
        age:20,
        email:"akib@gami.com"
    })
    res.send(user)
})

// Post
app.get("/post/create",async(req,res)=>{
    let post = await postModel.create({
        postdata:"Kese bhai Backend Dev Chal rha",
        user: "669cbb1666cf5dc79801d2a3"
    })
    let user =  await userModel.findOne({_id:"669cbb1666cf5dc79801d2a3"})
    user.post.push(post._id)    //
    user.save()
    res.send({post,user})
})



app.listen(3000,()=> console.log("Server Started........."))



