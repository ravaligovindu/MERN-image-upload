import jsonwebtoken from 'jsonwebtoken';


export const authentication =
  (req, res, next) => {
    try {
      if (req.path == "/login" || req.path == "/signup" || req.path == "/") {
        next();
      } else {
        jsonwebtoken.verify(
          req.headers.token,
          "HS256",
          function (err, decoded) {
            if (decoded && decoded.user) {
              req.user = decoded;
              next();
            } else {
              return res.status(401).json({
                errorMessage: "User unauthorized!",
                status: false,
              });
            }
          }
        );
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: "Something went wrong!",
        status: false,
      });
    }
  };
