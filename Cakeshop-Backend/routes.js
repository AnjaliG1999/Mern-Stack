import express from "express";
import Users from "./dbSchema/Users.js";
import Cakes from "./dbSchema/Cake.js";
import Carts from "./dbSchema/Cart.js";
import Orders from "./dbSchema/Order.js";
import cloudinary from "./utils/cloudinary.js";
import fileupload from "express-fileupload";
import Token from "./serviceFunctions/createToken.js";

const app = express.Router();

app.use(fileupload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.status.send("Welcome to my Cakeshop API");
});

app.get("/api/searchcakes", (req, res) => {
  const query = req.query.q;
  let search = {};
  if (query) {
    search = { name: { $regex: query, $options: "i" } };
  }
  Cakes.find(search, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ data: data });
    }
  });
});

/* All Cakes API */
app.get("/api/allcakes", (req, res) => {
  Cakes.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const cakes = [];

      for (const cake of data) {
        const cakeData = {
          cakeid: cake.cakeid,
          image: cake.image,
          name: cake.name,
          price: cake.price,
        };
        cakes.push(cakeData);
      }

      res.status(200).send(cakes);
    }
  });
});

/* Get Cake API */
app.get("/api/cake/:cakeid", (req, res) => {
  Cakes.find({ cakeid: req.params.cakeid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

/* Register API */
app.post("/api/register", (req, res) => {
  const userData = req.body;

  //   check if user exists, else add in db
  Users.countDocuments({ email: userData.email }, (err, count) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (count !== 0) {
        res.status(200).send({ message: "User already exists" });
      } else {
        userData.token = Token.token();
        Users.create(userData, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send({ message: "User registered successfully" });
          }
        });
      }
    }
  });
});

/* Login API */
app.post("/api/login", (req, res) => {
  const userData = req.body;

  Users.find(
    { email: userData.email, password: userData.password },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (Object.keys(data).length === 0) {
          res.status(200).send({ message: "Invalid Credentials" });
        } else {
          res.status(200).send({
            email: data[0].email,
            name: data[0].name,
            token: data[0].token,
          });
        }
      }
    }
  );
});

/* Image upload (cloudinary) API */
app.post("/api/upload", (req, res) => {
  const file = req.files.file;
  const authtoken = req.headers.authtoken;

  Users.countDocuments({ token: authtoken }, (err, count) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (count) {
        // save image from temp file location to the server
        cloudinary.v2.uploader.upload(file.tempFilePath, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send({ imageUrl: data.url });
          }
        });
      } else {
        res.send("Session expired");
      }
    }
  });
});

/* Add cake API */
app.post("/api/addcake", (req, res) => {
  const cakeDetails = req.body;
  Users.find({ token: req.headers.authtoken }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (Object.keys(data).length === 0) {
        res.status(200).send({ message: "Session expired" });
      } else {
        cakeDetails.owner = {
          name: data[0].name,
          email: data[0].email,
        };
        cakeDetails.createdate = new Date();
        cakeDetails.cakeid = Date.now();

        Cakes.create(cakeDetails, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(data);
          }
        });
      }
    }
  });
});

/* Add to cart API */
app.post("/api/addcaketocart", (req, res) => {
  const cakeDetails = req.body;
  const token = req.headers.authtoken;
  Carts.exists({ cartid: token }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!data) {
        const cartItem = {
          cartid: token,
          cakes: [cakeDetails],
        };
        Carts.create(cartItem, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(data);
          }
        });
      } else {
        Carts.findOneAndUpdate(
          { cartid: token },
          {
            $push: { cakes: cakeDetails },
          }
        ).then((err, data) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).send(data);
          }
        });
      }
    }
  });
});

/* Add to cart API */
app.post("/api/removecakefromcart", (req, res) => {
  const cakeDetails = req.body;
  const token = req.headers.authtoken;
  Carts.updateOne(
    { cartid: token },
    { $pull: { cakes: { cakeid: cakeDetails.cakeid } } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({ data, message: "Removed item from cart" });
      }
    }
  );
});

app.post("/api/cakecart", (req, res) => {
  const cakeDetails = req.body;
  const token = req.headers.authtoken;
  Carts.find({ cartid: token }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/addcakeorder", (req, res) => {
  const token = req.headers.authtoken;
  const order = req.body;
  order.orderdate = new Date();
  order.orderid = `${token}${Date.now()}`;
  Orders.create(order, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      Carts.deleteOne({ cartid: token }, (err, sent) => {
        if (err) {
          res.status(500).send(err);
        } else {
          data.message = "order placed";
          res.status(201).send(data);
        }
      });
    }
  });
});

app.post("/api/cakeorders", (req, res) => {
  Orders.find({ email: req.body.email }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

export default app;
