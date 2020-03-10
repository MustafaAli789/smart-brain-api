const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
var knex = require('knex');
var morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization')
const signout = require('./controllers/signout');


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
app.delete('/signout', auth.requireAuth, (req, res) => {signout.handleSignout(req, res)})
app.post('/register', (req, res)=>{register.register(req, res, db, bcrypt)});
app.post('/profile/:id', auth.requireAuth, (req, res)=>{profile.handleProfileUpdate(req, res, db)})

app.get('/profile/:id', auth.requireAuth, (req, res)=>{profile.handleProfileGet(req, res, db)});

app.put('/image', auth.requireAuth, (req, res)=>{image.handleImage(req, res, db)});

app.post('/imageurl', auth.requireAuth, (req, res)=>{image.handleApiCall(req, res)});

app.listen(3000, ()=>{
	console.log(`app is running on port ${3000} `)
});

