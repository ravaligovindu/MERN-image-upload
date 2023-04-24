let express = require("express");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();

mongoose.connect(
//dg configuration need to add here...
);

let fs = require("fs");
let image = require("./model/images.js");
let user = require("./model/user.js");
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/signup" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "HS256", function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauthorized!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.post("/login", (req, res) => {
  try {

    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: "Username or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(400).json({
            errorMessage: "User not found, register",
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Please provide required data",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.post("/signup", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length == 0) {
          let User = new user({
            username: req.body.username,
            password: req.body.password,
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    // "shhhhh11111",
    "HS256",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
          username: data.username,
          userid: data.id
        });
      }
    }
  );
}

app.post(
  "/addItem",
  multer({ dest: "./uploads",  }).array("file", 1),
  (req, res) => {
    try {
      if (req.files) {
        let newImage= new image();
        
        newImage.image = req.files[0].filename;

        newImage.user_id = req.user.id;
        newImage.save((err, data) => {
          if (err) {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          } else {
            res.status(200).json({
              status: true,
              title: "Image Added successfully.",
            });
          }
        });
      } else {
        res.status(400).json({
          errorMessage: "Add required data",
          status: false,
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: "Something went wrong!",
        status: false,
      });
    }
  }
);

app.get("/getItem", (req, res) => {
  try {

    image
      .find({
        user_id: req.user.id,
      })
      .then((data) => {
        if (data && data.length > 0) {
          res.status(200).json({
            status: true,
            title: "Image retrived.",
            images: data,
          });
        } else {
          res.status(400).json({
            errorMessage: "There is no image!",
            status: false,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          errorMessage: err.message || err,
          status: false,
        });
      });
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
