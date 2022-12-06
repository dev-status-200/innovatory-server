const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users } = require('../../models');
const { UserSavedAddresses } = require('../../functions/associations/userAssociations')

routes.get("/getSavedAddresses", async(req, res)=>{
  console.log(req.headers);
  try {
    const addresses = await UserSavedAddresses.findAll({where:{UserId:req.headers.userloginid}})
    res.send(addresses);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/createNewAddress", async(req, res)=>{
  console.log(req.body);
  try {
    const newAddress = await UserSavedAddresses.create({
      address:req.body.userAddress, street:req.body.userStreet, unit:req.body.userFloor,
      optionalNote:req.body.userOptionalDetail, lat:req.body.latitude,
      long:req.body.longitude, label:req.body.userLabel, UserId:req.body.userLoginId
    })
    res.send(newAddress);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/editAddress", async(req, res)=>{
  console.log(req.body);
  try {
    const newAddress = await UserSavedAddresses.update({
      address:req.body.userAddress, street:req.body.userStreet, unit:req.body.userFloor,
      optionalNote:req.body.userOptionalDetail, lat:req.body.latitude, label:req.body.userLabel,
      long:req.body.longitude
    },{where:{id:req.body.id}})
    res.send(newAddress);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/deleteAddress", async(req, res)=>{
  console.log(req.body);
  try {
    await UserSavedAddresses.destroy({where:{id:req.body.id}})
    res.send("newAddress");
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = routes;