const express = require('express')
const app =express();
const userModel = require('./usermodel')


app.get('/', function(req, res) {
    res.send("Hey Are you Fine!");
});


// When you will work with MongoDB code will act as asynchronous

// CREATE
app.get('/create', async function(req, res) {
  try {
    let createdUser = await userModel.create({
      name: "AkibZaved",
      username: "akib",
      email: "akib@gmail.com"
    });
    res.send(createdUser);
  } catch (error) {  
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');     //response
  }
});

// UPDATE ROUTE
app.get('/update', async function(req, res) { 
  try {
    let updatedUser = await userModel.findOneAndUpdate(
      { name: "AkibZaved" },
      { username: "akib@user67" },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');    //response
  }
});

// RAED
app.get('/read',async(req,res)=>{
    try {
        let users = await userModel.find({username:"akib"})  //gives an array [] even we don't have that   || findOne() finding one document
        if(!users) return res.status(404).send('Data not found')
        res.send(users)
    } catch (error) {
        console.log("Error Occurs in reading Data")
    }
})


// DELETE 
app.get('/delete',async(req,res)=>{
    let users = await userModel.findOneAndDelete({ name: "AkibZaved"})
    res.send(`Hey ${users.name} youtr acc is deleted`)
})
 
app.listen(3000, () => {
  console.log('Server is running on port 3000....:');
});


