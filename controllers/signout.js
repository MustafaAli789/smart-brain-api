const redisClient = require('./signin').redisClient;

const handleSignout = (req, resp) => {
    const { authorization } = req.headers;
    if (authorization !== undefined) {
        redisClient.del(authorization, (err, res) => {
            if (err) {
                return resp.status(400).send('Error occured in remving JWT')
            }
            resp.status(200).json('Signed out')
        })
    }
}

module.exports = {
    handleSignout
}