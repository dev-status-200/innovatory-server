const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { ParentCategories } = require('../../models');
const { Shops, ShopCategories } = require('../../functions/associations/shopAssociation')
const { ChildCategories } = require('../../functions/associations/categoryAssociations')

routes.get("/getNearByShops", async(req, res) => {

  const {lat, long} = req.headers;

  try {
      const value = await Shops.findAll({
        where:{
          long:{
            [Op.between]: [Number(long)-0.02, Number(long)+0.02],
          },
          lat:{
            [Op.between]: [Number(lat)-0.002, Number(lat)+0.002],
          },
        }
      });
      res.send(value);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/shopCreation", async(req, res) => {

  console.log(req.body)
  function makeCat (cat, id) {
    let result = [];
    cat.forEach(x => {
      result.push({ParentCategoryId:x.id, ShopId:id})
    });
    return result;
  }
  function makePrCat (cat) {
    let result = [];
    cat.forEach(x => {
      result.push(x.ParentCategoryId)
    });
    return result;
  }

  try {
    const value = await Shops.create({
      ShopUserId:req.body.ShopUserId,
      name:req.body.name, type:req.body.type, country:req.body.country, city:req.body.city,
      opening:req.body.opening, closing:req.body.closing, address:req.body.address, long:req.body.long, lat:req.body.lat
    })
    const result = await ShopCategories.bulkCreate(makeCat(req.body.categories, value.id));
    const resultTwo = await ParentCategories.findAll({where:{id:makePrCat(result)}, attributes:['id', 'name'], include:[{model:ChildCategories, attributes:['id', 'name'] }] });
    res.json({status:'success', result:resultTwo});
  }
  catch (error) {
    res.json({status:'error'});
  }
});

routes.get("/loadVendorShop", async(req, res) => {

  console.log('======================== ',req.headers)
  function makePrCat (cat) {
    let result = [];
    cat.forEach(x => {
      result.push(x.ParentCategoryId)
    });
    return result;
  }

  try {
      const value = await Shops.findOne({ 
        where:{ShopUserId:req.headers.id},
        include:[
          {
            model:ShopCategories,
            attributes:['ParentCategoryId']
          }
        ] 
      });
      const result = await ShopCategories.findAll({where:{ShopId:value.id}});
      const resultTwo = await ParentCategories.findAll({where:{id:makePrCat(result)}, attributes:['id', 'name'], include:[{model:ChildCategories, attributes:['id', 'name'] }] });
      res.json({status:'success', resultOne:value, resultTwo:resultTwo});
  }
  catch (error) {
    res.json({status:'error'});
  }
});

// ---------------------  Experimental Api ---------------------
// routes.post("/createBulkShops", async(req, res) => {
//   console.log(req.body)
//   try {
//         const value = await Shops.bulkCreate(req.body);
//         res.send(value);
//   }
//   catch (error) {
//     res.send(error);
//   }
// });

module.exports = routes;