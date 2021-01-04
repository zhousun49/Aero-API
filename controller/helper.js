const jwt = require('jsonwebtoken')
const User = require('../model/user')

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

exports.add_to_user = (req,res) => {
    console.log('Add project info to user model')
    console.log('User id: ', req.user._id)
    console.log('Option: ', req.option)
    User.findById(req.user._id, (err, user) => {
        if(err) return res.status(500).json({ error: err})
        if (req.option == "post"){
            user.owned_projects.push(req.project._id)
            user.save()
        }else if (req.option == "apply"){
            user.applied_projects.push(req.project._id)
            user.save()
        }else if (req.option == "deapply"){
            user.applied_projects.pull(req.project._id)
            user.save()
        }else if (req.option == "approve"){
            user.project_member.push(req.project._id)
            user.save()
        }else if (req.option == "delete"){
            user.project_member.pull(req.project._id)
            user.save()
        }else if (req.option == "remove"){
            user.owned_projects.pull(req.project._id)
            user.save()
        }
    })
}