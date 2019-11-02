import express from 'express';
import kafka from "../../../../kafka/client";
const orderRouter = express.Router();

orderRouter.get('/restaurant/:restaurant_id', (req, res) => {
  const {restaurant_id} = req.params;
  kafka.make_request("order.restaurant", restaurant_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

orderRouter.put('/update/:order_id', (req, res) => {
  const order_details = {
    id: req.params.order_id,
    status: req.body.status,
  };
  kafka.make_request("order.update", order_details, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

orderRouter.get('/:order_id', (req, res) => {
  const order_id = req.params.order_id;
  kafka.make_request("order.details", order_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

orderRouter.get('/customer/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  kafka.make_request("order.customer", user_id, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

orderRouter.post('/confirm', (req, res) => {
  const order_details = req.body;
  kafka.make_request("order.create", order_details, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

orderRouter.put('/messages/save', (req, res) => {
  const message_details = req.body;
  kafka.make_request("message.create", message_details, (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    }
    res.status(200).json(results);
  });
});

export default orderRouter;
