const jwt = require('jsonwebtoken')

module.exports=function(req,res,next){
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send("Access denied")
    }
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        req.user= verify
        next()
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = router