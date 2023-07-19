const user = require('../model/User')
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
      // api_key:"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"
       // api_key:"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"
       api_key:"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"
    }
    
    }))

exports.registerUser = async function registerUser(req, res) {
    try {
       await user.create({
        fullname: req.body.name,
            email: req.body.email,
            phone: req.body.mobile,
            password: req.body.password,
             
        }).then((user)=>{
            console.log("before email send")
            console.log(user.email);
            transporter.sendMail({
                to:user.email,
                from:"erpcloudanalogy@gmail.com",
                subject:"Register Successfully",
                html:`<h1>Click on link to activate your account <a href="http://localhost:3000/activateAccount/?user=yusufsaif0gmail.com"> </h1>
                ` +
                   "Your email id is "+ user.email +" password is " +user.password 
            })
            res.json({ status: "success" ,holdayResponse })
            console.log("mail send");
        })

       
    }
    catch (error) {
    res.json({ status: 'error', error: error })
    }
}

exports.login = async function login(req, res) {
try {

    var otpValue = Math.floor(1000 + Math.random() * 9000);

    const email= req.body.email
    transporter.sendMail({
        to:email,
        from:"erpcloudanalogy@gmail.com",
        subject:"Otp",
        html:`<h1>Your Otp is </h1>
        ` +
           otpValue
    })  
if(otpValue === req.body.otp)
{
    await user.findOne({
        email: req.body.email,
        password: req.body.password,
    }).then((result)=>{
        if (result) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')
            
            return res.json({ status: 'ok', token: token, result })
        }
        else {
           
            return res.json({ status: 'error', user: false })
        }
    })
}
else{
    console.log("Please Recheck your password")
}

} catch (error) {
    console.log(error)
}
}

exports.activateAccount = async function activateAccount(req, res) {
    try {
        const email= req.params.user
        await user.findOneAndUpdate({
            email:email,
        },{$set:{isVerified:true}}).then((result)=>{
            if (result) {
              
              console.log("Email Verified")  
                return res.json({ status: 'ok', token: token, result })
            }
            else {
               
                return res.json({ status: 'error', user: false })
            }
        })
       
    } catch (error) {
        console.log(error)
    }
    }

    