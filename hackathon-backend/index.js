const express=require("express")
const app=express()
const cors=require('cors')
const port=3000;
const path=require('path')
const utrilities=require('./utilities')
const algo=require('./algorithm')

app.use(cors())
app.use(express.json())

app.get('/api',(req,res)=>{
    res.json("winning hackathon!!")
})

app.post('/auth')

app.listen(port,(err)=>{
    if(err) throw new Error(`server is sleeping ${err}`)
    console.log(`server is up on port ${port}`)
})