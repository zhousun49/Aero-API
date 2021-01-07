const User = require('../model/user')
const Token = require('../model/refreshtoken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUserinfo = (req, res) => {
    console.log("Retrieving User Info Route")
    console.log(req.user)
    res.status(201).json({
        message: "User Info successfully retrieved",
        username: req.user.name,
        useremail: req.user.email,
        owned_projects: req.user.owned_projects,
        applied_projects: req.user.applied_projects,
        project_member: req.user.project_member
    })
}

exports.logout = (req, res) => {
    console.log('Log out Route')
    const token =  req.body.token
    Token.findOneAndRemove({token: token}, (err, token) => {
        if (err) return res.status(401).json({
            message: 'Error occured. Log out failed',
            error: err
        })
        console.log('second item')
        console.log(token)
        res.status(204).json({
            message:"User successfully logged out"
        })
    })
}

exports.signup = async (req, res) => {
    console.log('Sign up Route')
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
            if (err) { return res.status(500).json({error: err}) }
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

exports.login = (req, res) => {
    console.log('Log in Route')
    User.findOne({email: req.body.email}, (err, user) => {
        if (err || user == null) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        try{
            // const user = user.toJSON()
            // console.log(user.toJSON())
            const comparison =bcrypt.compareSync(req.body.password, user.password)
            // console.log(comparison)
            if (comparison){
                const accessToken = generateAccessToken(user.toJSON())
                // console.log(accessToken)
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET)
                const token = new Token({ token: refreshToken})
                // console.log('token', token)
                token.save()
                // console.log(token)
                // Save refresh Tokens
                res.status(201).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}