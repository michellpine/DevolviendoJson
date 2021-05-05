const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.urlencoded({ extended: true }));

//mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function (e) { console.error(e); });

const schema = mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model("Product", schema);

app.get('/products', async (req, res) => {
    res.contentType('application/json');
    res.json(await Product.find());
});

app.get('/products/:name/:price', async (req, res) => {
    await Product.create({
        name: req.params.name,
        price: req.params.price
    }).catch((error) => console.error(error));
    console.log("created");
});

app.listen(3000, () => console.log('Listen on port 3000!'));
