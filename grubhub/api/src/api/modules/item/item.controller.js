import express from 'express';
import passport from "passport";
import * as itemService from "./item.service";
import {multerUploads, dataUri} from './../../../multer';
import {cloudinaryConfig } from './../../../../config/cloudinaryConfig'
const itemRouter = express.Router();


itemRouter.post('/add', (req, res) => {
    const item_details = req.body;
    itemService.addItem(item_details).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

itemRouter.get('/:item_id', (req, res) => {
    const item_id = req.params.item_id;
    itemService.getItemDetails(item_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

itemRouter.put('/update', (req,res) => {
    const item_details = req.body;
    itemService.updateItem(item_details).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

itemRouter.delete('/delete/:item_id', (req,res) => {
    const item_id = req.params.item_id;
    itemService.deleteItem(item_id).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

itemRouter.get('/customer/search', (req, res) => {
    const search_key = req.query.key;
    itemService.searchItems(search_key).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
});

itemRouter.post("/upload/image/:item_id", multerUploads, cloudinaryConfig, (req, res) => {
    let file;
    if(req.file) {
      file = dataUri(req).content;
    } else {
      res.status(400).json({
        message: 'No file Uploaded'
      });
    }
    itemService.uploadImage({
      file,
      item_id: req.params.item_id
    }).then(result => {
      res.status(200).json(result);
    }).catch(err => {
      res.status(500).json({
            message: err.message
        });
    });
});

export default itemRouter;