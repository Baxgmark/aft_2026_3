const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/api/health',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'SERVER OK'
    })
})


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log('Server is starting')
})