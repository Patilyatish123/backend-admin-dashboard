const express = require('express')
const app = express()
const port = 3329;
const userRouter = require('./routes/router')
const userModel = require('./models/users_Schema')
const db = require('./config/DB')
const path = require('path')
const User = require('./models/users')
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController')
const authRoutes = require('./routes/authRoutes')



// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (optional if default)
app.set('views', path.join(__dirname, 'view'));

// Serve static files
app.use(express.static('public'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/add',(req,res)=>{
    res.render('add-data')
})

// Use the router for authentication routes
app.use(authRoutes);

// Other routes or middleware
app.get('/user', (req, res) => {
  res.render('login');
});

app.use('/',userRouter)


app.listen(port,()=>{
    console.log(`http://localhost:3329/user`)
})