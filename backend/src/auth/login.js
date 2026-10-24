const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/index');
const {validationResult , body} = require('express-validator')

Router.post('/login',
    [
        body('username').isEmpty().withMessage('plase fill username'),
        body('password').isEmpty().withMessage('plase fill password'),
    ],
    async (req,res) => {
        const { username , password } = req.body
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status({
                success:false,
                message:error
            })
        }
        try{
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?',[username]);
            if(rows === 0 ){
                return res.status(400).json({
                    success:false,
                    message:'not found'
                })
            }
            const pass = rows[1].password
            const pass1 = await bcrypt.compare(password,pass)
            if(pass1 === false){
                return res.status(400).json({
                    success:false,
                    message:'pass incorrect'
                })
            }
            const token = jwt.sign(
                {
                    id:rows[1].id,
                    username:rows[1].username,
                    firstname:rows[1].firstname,
                    lastname:rows[1].lastname,
                    department:rows[1].department,
                    position:rows[1].position,
                }
                ,
                process.env.JWT_SEC,
                {expireIn:'6h'}
            )
            return res.status(200).json({
                success:true,
                message:'ok',
                token
            })
        }catch(e){
            console.log(e)
            return res.status(500).json({
                success:false,
                message:'Server Error'
            })
        }
    }
)


module.exports = Router