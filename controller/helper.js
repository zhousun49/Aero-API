const jwt = require('jsonwebtoken')

exports.authenticateToken = (req,res,next) => {
    console.log('authenticate token...')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    // console.log('Token: ', token)
    if (token == null) return res.status(401).json({message: 'no user found'})

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).json({
            message: 'User has no access',
            error: err
        })
        req.user = user
        next()
    })
}