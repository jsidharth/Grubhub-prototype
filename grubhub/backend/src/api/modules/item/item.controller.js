import express from "express";
import { multerUploads, dataUri } from "./../../../multer";
import { cloudinaryConfig, uploader } from "./../../../../config/cloudinaryConfig";
import kafka from "../../../../kafka/client";

const itemRouter = express.Router();

itemRouter.post("/add", (req, res) => {
  const item_details = req.body;
  kafka.make_request("item.add", item_details, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

itemRouter.get("/:item_id", (req, res) => {
  const item_id = req.params.item_id;
  kafka.make_request("item.details", item_id, (err, results) => {
    //console.log('Response', err, results)
    if (err) {
      console.log('Here')
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

itemRouter.put("/update", (req, res) => {
  const item_details = req.body;
  kafka.make_request("item.update", item_details, (err, results) => {
    if (err) {
      console.log(err, "here")
      res.status(500).json({
        message: err.message
      });
    } else {
      res.status(200).json(results);
    }
  });
});

itemRouter.delete("/delete/:item_id", (req, res) => {
  const item_id = req.params.item_id;
  kafka.make_request("item.delete", item_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

itemRouter.get("/customer/search", (req, res) => {
  const search_key = req.query.key;
  kafka.make_request("item.search", search_key, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

itemRouter.post(
  "/upload/image/:item_id",
  multerUploads,
  cloudinaryConfig,
  (req, res) => {
    let file;
    if (req.file) {
      file = dataUri(req).content;
    } else {
      res.status(400).json({
        message: "No file Uploaded"
      });
    }
    return uploader
    .upload(file, {
      transformation: [{ width: 150, height: 100, crop: "scale" }]
    }).then(result => {
      const image = result.url;
      const imageDetails = {
        url: image,
        item_id: req.params.item_id,
        type: 'Item'
      };
      kafka.make_request("image.upload", imageDetails, (err, results) => {
        if (err) {
          res.status(500).json({
            message: err.message
          });
        }
        res.status(200).json(results);
      });
    });
  }
);

export default itemRouter;
