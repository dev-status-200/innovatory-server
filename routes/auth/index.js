const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const Sib = require('sib-api-v3-sdk');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, ShopUsers } = require('../../models');

const name = (x, otp, sub) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = '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';
  const transEmailApi = new Sib.TransactionalEmailsApi();
  const sender = { email:'syedabdullahteamhail@gmail.com',name:'Syed Abdullah'};
  const recievers = [ { email:x, }, ];


  transEmailApi.sendTransacEmail({
    sender,
    to: recievers,
    subject:sub,
    //textContent:'Wishing you a warm welcome to Hail Technologies',
    htmlContent:`<p>Your Account has been successfully setup</p>
      <p>Enter the following code in the login screen</p>
      <h1>{{params.pass}}</h1>
      <br/>
      <p>Do not share this code with anyone else.</p>
      <br/>
      <p>Regards</p>
      <p>Support Team</p>`,
    params:{
        pass:otp,
    },
  }).then((x)=>console.log(x))
  .catch((e)=>console.log(e));
}

routes.post("/verification", async(req, res)=>{
    const { email, pass, type } = req.body

    if(type=="customer"){

      if(req.body.email && req.body.pass){
        const users = await Users.findOne({where:{email:email, password:pass}})
        if(users){
          if(email==users.email && pass==users.password){
            const payload = { type:type, picture:users.profile_pic, username:`${users.f_name} ${users.l_name}`,loginId:`${users.id}` }
            jwt.sign(
              payload,
              'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
              {expiresIn:"8760h"},
              (err,token) => {
                if(err) return res.json({message: err})
                  return res.json({
                      message:"Success",
                      token: "BearerSplit"+token
                    })
                  }
                )
          } else {  return res.json({message:"Invalid"}) }
        }
        else {  return res.json({message:"Invalid"})  }
      } else {  return res.json({message:"Invalid"})  }

    }else if(type=="shopowner"){

      if(req.body.email && req.body.pass){
        const users = await ShopUsers.findOne({where:{email:email, password:pass}})
        if(users){
          if(email==users.email && pass==users.password){
            const payload = { picture:users.profile_pic, username:`${users.f_name} ${users.l_name}`,loginId:`${users.id}`, type:type }
            jwt.sign(
              payload,
              'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
              {expiresIn:"8760h"},
              (err,token) => {
                if(err) return res.json({message: err})
                  return res.json({
                      message:"Success",
                      token: "BearerSplit"+token
                    })
                  }
                )
          } else {  return res.json({message:"Invalid"}) }
        }
        else {  return res.json({message:"Invalid"})  }
      } else {  return res.json({message:"Invalid"})  }

    }

});

routes.post("/signUp", async(req, res)=>{

  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email, f_name, l_name, type } = req.body;
  try {
    if(type=="customer"){
      const customerVerification = await Users.findOne({where:{email:email}});
        if(customerVerification){
          res.send('Already Exists');
        }else{
          const customer = await Users.create({
            f_name:f_name, l_name:l_name, email:email,role:'customer', password:otp
          });
          name(customer.email, otp, 'Welcome To Innovatory');
          res.json({status:'success'});
        }
    }else if(type=="shopowner"){
      
      const shopOwnerVerification = await ShopUsers.findOne({where:{email:email}});
        if(shopOwnerVerification){
          res.json({status:'error', message:"Already Exists!"});
        } else {
          console.log('Shop Owner Creation')
          const shopOwner = await ShopUsers.create({
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            email:req.body.email,
            contact:req.body.contact,
            password:otp,
            cnic:req.body.cnic,
            profile_pic:req.body.profile_pic
          })
          name(shopOwner.email, otp, 'Welcome To Innovatory');
          res.json({status:'success'});
        }
    }else{
      res.json({status:'error', message:"Something Went Wrong Please Try Again"});
    }
  }
  catch (error) {
    res.json({status:'error', message:"Something Went Wrong Please Try Again"});
  }
});

routes.post("/login", async(req, res)=>{

  const otp = Math.floor(100000 + Math.random()*900000);
  const { email, type } = req.body;
  try {
    if(type=="customer") {
      const customerVerification = await Users.findOne({where:{email:email}});
      if(customerVerification){
        const customer = await Users.update({password:otp},{where:{id:customerVerification.id}});
        console.log(customer);
        name(customerVerification.email, otp, 'Innovatory OTP');
        res.json({status:'success'});
      }else{
        res.json({status:'error'});
      }
    } else if(type=="shopowner") {
      const shopOwnerVerification = await ShopUsers.findOne({where:{email:email}});
        if(shopOwnerVerification){
          await ShopUsers.update({password:otp},{where:{id:shopOwnerVerification.id}});
          name(shopOwnerVerification.email, otp, 'Innovatory OTP');
          res.json({status:'success'});
        } else {
          res.json({status:'error'});
        }
    }
    else {
      res.json({status:'error'});
    }
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = routes;