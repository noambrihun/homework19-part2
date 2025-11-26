const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://noam_userdb:Iam_noam22@noam.cyi4okn.mongodb.net/svshop")
  .then(() => console.log(" Connected to svshop DB"))
  .catch(err => console.log("Mongo Error:", err));


const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("users", userSchema);


const productSchema = mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model("products", productSchema);


const orderSchema = mongoose.Schema({
  user: String,
  totalProducts: Number,
  totalPrice: Number
});
const Order = mongoose.model("orders", orderSchema);


Product.insertMany([
  { name: "Bread", price: 15 },
  { name: "Milk", price: 22 },
  { name: "Gum", price: 3 },
  { name: "Eggs", price: 12 }
]).then(() => console.log("Products inserted"))
  .catch(() => console.log(" Products already exist"));


app.post("/api/signup", (req, res) => {
  const newUser = new User(req.body);

  newUser.save()
    .then(() => res.json({ ok: true, msg: "User registered!" }))
    .catch(err => res.json({ ok: false, error: err }));
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then(user => {
      if (user) {
        res.json({ ok: true, msg: "Signed in!" });
      } else {
        res.json({ ok: false, msg: "User not found!" });
      }
    })
    .catch(err => res.json({ ok: false, error: err }));
});

app.get("/api/products", (req, res) => {
  Product.find({})
    .then(products => res.json({ ok: true, products }))
    .catch(err => res.json({ ok: false, error: err }));
});
app.post("/api/order", (req, res) => {
  const newOrder = new Order(req.body);

  newOrder.save()
    .then(() => res.json({ ok: true, msg: "Order created!" }))
    .catch(err => res.json({ ok: false, error: err }));
});

app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then(user => {
      if (!user) return res.json({ ok: false, msg: "Wrong email or password" });
      res.json({ ok: true, msg: "Login OK" });
    })
    .catch(() => res.json({ ok: false, msg: "Server error" }));
});

app.get("/api/all", (req, res) => {
  if (req.query.admin !== "true") {
    return res.status(400).json({ ok: false, msg: "Access denied" });
  }

  Order.find({})
    .then((orders) => res.json({ ok: true, orders }))
    .catch((err) => res.json({ ok: false, error: err }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
