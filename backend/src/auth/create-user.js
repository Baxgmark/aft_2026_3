const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/index');
const {validationResult , body} = require('express-validator')

Router.post('/create-user',
      [
        body('username').isEmpty().withMessage('plase fill username'),
        body('password').isEmpty().withMessage('plase fill password'),
        body('firstname').isEmpty().withMessage('plase fill firstname'),
        body('lastname').isEmpty().withMessage('plase fill lastname'),
        body('department').isEmpty().withMessage('plase fill department'),
                body('position').isEmpty().withMessage('plase fill position'),
    ],
    async (req,res) => {
        const { username , password , firstname ,lastname,department,position} = req.body
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                success:false,
                message:error
            })
        }
             try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?',[username]);
        if(rows.length > 1 ){
            return res.status(400).json({
                success:false,
                message:'ชื่อซ้ำ'
            })
        }
        const [rows2] = await db.query('INSERT INTO users (username, password , firstname,lastname,department,position) VALUES(?,?,?,?,?,?)',[username,password,firstname,lastname,department,position])
        return res.status(200).json({
            success:true,
            message:'OK'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'server error'
        })
    }
})

module.exports = Router