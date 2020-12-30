const jwt = require('jsonwebtoken')

exports.authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message: 'no user found'})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).json({message: 'User has no access'})
        req.user = user
        next()
    })
}