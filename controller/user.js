const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUserinfo = (req, res) => {
    console.log(req.user)
    res.status(201).json({
        message: "User Info successfully retrieved",
        username: req.user.name,
        useremail: req.user.email
    })
}

exports.signup = async (req, res) => {
    try{
        const info = req.body
        const hashedpassowrd = await bcrypt.hash(req.body.password, 10)
        // console.log('hashed pw: ', hashedpassowrd)
        const user = new User({
            name: info.name,
            email: info.email,
            password: hashedpassowrd 
          })
        user.save(function (err, post) {
            if (err) { return next(err) }
            res.status(201).json({
                user:user,
                message: "User successfully created"
            })
          })
    }catch {
        res.status(500).json({
            message: 'User failed to create. Check again'
        })
    }
}

exports.login = async (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err || user == null) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        // console.log(user.toJSON())
        try{
            if (bcrypt.compare(req.body.password, user.password)){
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {expiresIn: 604800})
                console.log('token',accessToken)
                res.status(201).json({
                    token: accessToken,
                    message: "Successfully logged in"
                })
            }else {
                res.status(400).json({
                    message: "Wrong password"
                })
            }
        } catch {
            res.status(400).json({
                message: "Error, try again"
            })
        }
    })
}

