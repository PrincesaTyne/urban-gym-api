const jwt = require('jsonwebtoken')

const userRole = (role)=>{
    return (req, res, next)=>{
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            console.log(decoded)
            if (decoded.role !== role){
                return res.status(400).json({
                    message: 'Access Denied'
                })
            }
            next()
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

const viewProfile = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (decoded.userId != req.params.userId){
            return res.status(400).json({
                message: 'Access Denied'
            })
        }
        next()
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


const permissions = {userRole, viewProfile}
module.exports = permissions