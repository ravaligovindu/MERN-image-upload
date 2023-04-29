import user from "../../Server/model/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

function generateToken(data, req, res) {
  jsonwebtoken.sign(
    { user: data.username, id: data._id },
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
          userid: data.id,
        });
      }
    }
  );
}
export const login = (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            generateToken(data[0], req, res);
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
};
