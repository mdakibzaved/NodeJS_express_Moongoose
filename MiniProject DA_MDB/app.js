const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');

// Parser set
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Render homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Handle user registration
app.post('/register', async (req, res) => {
  const { username, name, email, password, age } = req.body;

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already have account from this email..' });
    }

    // Create the user
    const user = await userModel.create({
      username,
      name,
      age,
      email,
      password: hashedPassword
    });

    // Setting A token
    const token = jwt.sign({ userId: user._id }, "shhhhh", { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    console.log(user);
    res.status(201).send({ user });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'Error registering user' });
  }
});

app.get('/login', (req, res) => {
  res.render("login");
});

// Handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Setting A token
    const token = jwt.sign({ email: email, userId: user._id }, "shhhhh", { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.redirect("/profile");

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ error: 'Error logging in' });
  }
});

// Middleware For Protected Routes
function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    const data = jwt.verify(token, "shhhhh");
    req.user = data;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.redirect("/login");
  }
}

// LOGOUT
app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.redirect('/login'); // Redirect to login or homepage after logout
});

// Profile
app.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts');
    console.log("This user is on Profile page --> " + user.name);
    res.render("profile", { user });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send({ error: 'Error fetching user profile' });
  }
});


// Create a post
app.post('/post', isLoggedIn, async (req, res) => {
  const { content } = req.body;

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const post = await postModel.create({
      user: user._id,
      content
    });

    // Add post to the user's post array
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');

  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send({ error: 'Error creating post' });
  }
});

app.listen(3000, () => console.log('Server started on port 3000...'));
