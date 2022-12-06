const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { ChildCategories } = require('../../functions/associations/categoryAssociations');
const { Items, ShopItems } = require('../../functions/associations/shopAssociation');

routes.post("/createItem", async(req, res) => {
    console.log(req.body)
    try {
      const result = await Items.create({
        name:req.body.name, active:1, ChildCategoryId:req.body.childId,
        units:req.body.units, price:parseFloat(req.body.price), cartan:parseInt(req.body.cartan)
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getAllItems", async(req, res) => {
    try {
      const result = await Items.findAll({
        offset:parseInt(req.headers.offset),
        limit:parseInt(req.headers.limit),
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getItems", async(req, res) => {
  console.log(req.headers);
  try {
    const result = await ChildCategories.findOne({
      where:{name:req.headers.name},
      attributes:["id","name"],
      include:[
          {model:Items}
      ]
    });
    res.send(result);
  }
  catch (error) {
    res.send(error);
  }
});

routes.get("/searchItems", async(req, res) => {
  function setIds(values){
    let items = [];
    JSON.parse(values).forEach(x => {
      items.push(x.ParentCategoryId)
    });
    console.log(items);
    return items;
  }
  try {
    const result = await Items.findAll({
      where: {
        name: {
          [Op.like]: `%${req.headers.searchword}%`
        },
        ParentCategoryId:{
          [Op.or]: setIds(req.headers.catids)
        }
      }
    });
    res.send(result);
  }
  catch (error) {
    res.send(error);
  }
});

routes.post("/forkItem", async(req, res) => {

    console.log(req.body)

    var promises = (req.body).map((rqBody)=>{
      return rqBody.id!==""?ShopItems.update({
        name: rqBody.name,
        units: rqBody.units,
        selling_price: rqBody.s_price,
        cost_price: rqBody.c_price,
        weight: rqBody.weight,
        cartan: rqBody.cartan,
        image:rqBody.image,
        stock: rqBody.stock,
        qty: rqBody.qty,
        active:1,
        ShopId: rqBody.ShopId,
        ChildCategoryId: rqBody.ChildCategoryId, 
        ItemId: rqBody.ItemId
      },
      {where:{id:rqBody.id}}):ShopItems.create({
        name:rqBody.name,
        units:rqBody.units,
        selling_price:rqBody.s_price, 
        cost_price:rqBody.c_price,
        weight:rqBody.weight,
        cartan:rqBody.cartan,
        image:rqBody.image,
        stock:rqBody.stock,
        qty:rqBody.qty,
        active:1,
        ShopId:rqBody.ShopId,
        ChildCategoryId:rqBody.ChildCategoryId, 
        ItemId:rqBody.ItemId,
      })
    })
    try {
        const result = await Promise.all(promises)
        res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

// ---------------------  Experimental Api ---------------------
routes.post("/createBulkItems", async(req, res) => {
  console.log(req.body)
  try {
        const value = await Items.bulkCreate(req.body);
        res.send(value);
  }
  catch (error) {
    res.send(error);
  }
});

module.exports = routes;