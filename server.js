const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
var knex = require('knex');
var morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


console.log(process.env.POSTGRES_URI)

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

console.log('yeet')
const app = express();
app.use(morgan('combined'))
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send("it is working");
});

app.post('/signin', signin.signinAuthentication(db, bcrypt));

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)});
app.post('/profile/:id', (req, res)=>{profile.handleProfileUpdate(req, res, db)})

app.get('/profile/:id', (req, res)=>{profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res)=>{image.handleImage(req, res, db)});

app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)});

app.listen(3000, ()=>{
	console.log(`app is running on port ${3000} `)
});

