const signToken = require('./signin').signToken;
const setToken = require('./signin').setToken;

const handleRegister = (req, res, db, bcrypt)=>{
	const {email, name, password} = req.body;
	if(!email||!name||!password){
		return Promise.reject('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
		return db.transaction(trx=>{
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail=>{
				return trx('users')
				.returning('*') //this means that this will return all the columns of users for the row that will be inserted
				.insert({
					email: loginEmail[0],
					name: name,
					joined: new Date()
				})
				.then(user=>{
					return user[0];
				})
				.catch(err=>Promise.reject('Could not add user'))
			})
			.then(trx.commit)
			.catch(trx.rollback)

		})
		
		.catch(err=>Promise.reject('Unable to register'))
	
};

const createSession = (user) => {
	const token = signToken(user.email);
	return setToken(token, user.id)
		.then(()=>{ 
			return {user: user, token:token, success: 'true'} 
		})
		.catch(console.log)
}


const register = (req, res, db, bcrypt) => {
	handleRegister(req, res, db, bcrypt)
		.then(data => {
			return data.id !== undefined ? createSession(data) : Promise.reject(data)
		})
		.then(registeredUserInfo => {
			res.status(200).json(registeredUserInfo)
		})
		.catch(err=>res.status(400).send(err))
}


module.exports = {
	register: register
};