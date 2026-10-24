const jwt = require('jsonwebtoken');
require('dotenv').config()

function auth(req,res,next){
    const token = req.headers['authorization'];
    const puretoken = token && token.split(' ')[1];
    if(!puretoken){return res.status(401).json({success:false,message:'token not found'})};
    try{
        const decode = jwt.vertify(puretoken,process.env.JWT_SEC);
        req.user = decode
        next();
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Server error'
        })
    }
}


module.exports = auth