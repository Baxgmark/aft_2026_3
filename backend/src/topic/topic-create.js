const express = require('express');
const Router = express.Router();
const db = require('../db/index');
const {validationResult , Body } = require('express-validator');

Router.post('/topic-create',async (req,res) => {
    try {
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success:false,
            message:'server error'
        })
    }
})