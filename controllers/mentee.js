const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const axios =require('axios').default;

const messageSchema = require("../models/message");
const { response } = require("express");

const userGraph = async (req, res) => {
    const { stress_history } = req.user

    return res.json({ success: true, mesage: "Fetched stress history.", data: stress_history }).send()
}

// const fillSurvey = async (req, res) => {
//     const data = req.body

// }



const newMessage = async (req, res) => {
    const { user, assigned_mentor } = req.user
    const { message } = req.body

    const newMessage = new messageSchema({ from_id: user, to_id: "Mentor", message })
    newMessage.save().then(response => {
        console.log(response)
        res.send("ok")
    })
}

const chatHistory = async (req, res) => {
    const { user } = req.user

    messageSchema.find({ $or: [{ from_id: user }, { to_id: user }] })
        .select({ _id: 0, updated_at: 0, __v: 0 })
        .then(response => {
            return res.json({ success: true, mesage: "Fetched Chat History.", data: response }).send()
        })
}

const predictStress = async (req,res)=>{
    const {user} = req.user
    const data = req.body;
    const data1 = JSON.stringify(req.body)
    console.log(JSON.stringify(req.body));


    axios.post(`https://localhost:5000/predict`,data1,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response=>res.status(200).json(response))
    
    
    // fetch(`http://localhost:5000/predict`,{
    //     headers : {
    //         'Accept' : 'application/json',
    //         'Content-Type' : 'application/json'
    //     },
    //     method: "GET",
    //     body : JSON.stringify(data)
    // })

    // res.json(100)
    // axios({
    //     method: "get",
    //     url: "http://localhost:5000/predict",
    //     data: JSON.stringify(data)
    // })
    // .then(response=>res.json(100))
        
    // axios.post('http://localhost:5000/predict',{params:data}) 
    // .then(response=>res.json(100))
    
    // .then(response=>{
    //     userSchema.findOne({email:user}).then(
    //         user=>{
    //             user.stress_history.push(response);
    //             user.save();
    //         }
    //         )
            
    //         return res.json({success:true,message:"Predicted stress level",data:response})
    //     })
    //     .catch(err=>res.status(400).json('Error : '+err));

}

module.exports = { userGraph, chatHistory, newMessage,  predictStress}