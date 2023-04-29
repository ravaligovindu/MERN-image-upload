
import image from "../../Server/model/image.js";

export const addItem = (req, res) => {
    try {
      if (req.files) {
        let newImage = new image();
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