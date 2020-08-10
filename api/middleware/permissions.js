const user = require('../controllers/validationHelpers')

const {getUser} = user

module.exports = (role)=>{
    return async(req, res, next)=>{
        try {
            const isRole = await getUser(res, 'role', role)
            if (isRole.data.length == 0){
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