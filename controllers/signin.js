const handleSignin = (db, bcrypt, req, res)=>{
	const {email, password} = req.body;
	if(!email || !password){
		return Promise.reject('incorrect form submission');
	}
	return db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data=>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if(isValid){
				return db.select('*').from('users').where('email', '=', email).then(user=>user[0])
				.catch(err=>Promise.reject('Unable to get user'))
			} else{

				return Promise.reject('Wrong credentials');
			}
		})
		.catch(err=>Promise.reject('Wrong credentials'))
};

const getAuthTokenId = () => {
	console.log('auth okay')
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
	const {authorization} = req.headers;
	return authorization ? getAuthTokenId() :
	handleSignin(db, bcrypt, req, res).then(data => res.json(data)).catch(err => res.status(400).send(err))
}

module.exports = {
	signinAuthentication: signinAuthentication
}