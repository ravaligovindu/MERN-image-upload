import image from "../../Server/model/image.js";

export const getData = (req, res) => {
  try {
    image
      .find({
        user_id: req.user.id,
      })
      .then((data) => {
        if (data && data.length ) {
          res.status(200).json({
            status: true,
            title: "Images list",
            images: data,
          });
        } else {
          res.status(400).json({
            errorMessage: "No Images available",
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
};
