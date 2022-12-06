const routes = require('express').Router();
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { ParentCategories } = require('../../models');
const { ChildCategories } = require('../../functions/associations/categoryAssociations');

routes.post("/createParent", async(req, res) => {
    try {
      const result = await ParentCategories.create({
        name:req.body.name, active:1
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.post("/createChild", async(req, res) => {
    try {
      const result = await ChildCategories.create({
        name:req.body.name, active:1, ParentCategoryId:req.body.parent_id
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getCategories", async(req, res) => {
    try {
      const result = await ParentCategories.findAll({
        include:[
          {model:ChildCategories}
        ]
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

routes.get("/getShopCategories", async(req, res) => {
  //console.log(JSON.parse(req.headers.catids))
  console.log(req.headers)
  function setIds(values){
    let items = [];
    JSON.parse(values).forEach(x => {
      items.push(x.id)
    });
    console.log(items);
    return items;
  }
    try {
      const result = await ParentCategories.findAll({
        include:[
          {model:ChildCategories}
        ],
        where:{id:setIds(req.headers.catids)}
      });
      res.send(result);
    }
    catch (error) {
      res.send(error);
    }
});

module.exports = routes;