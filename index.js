const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
var morgan = require('morgan');
const db = require("./models");

const verify = require('./functions/tokenVerification');

const { ShopCategories } = require("./functions/associations/shopAssociation")

const loginRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shops');
const userRoutes = require('./routes/users');
const productCategories = require('./routes/categories');
const items = require('./routes/items');

app.use(morgan('tiny'));

app.use(cors());
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(express.json());
db.sequelize.sync();

app.get("/", (req, res) => { res.json('Welcome to Innovatory Server') });
app.get("/getUser", verify, (req, res) => { res.json({isLoggedIn:true, username:req.body.username}) });

app.use("/auth", loginRoutes);
app.use("/shops", shopRoutes);
app.use("/user", userRoutes);
app.use("/categories", productCategories);
app.use("/items", items);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});