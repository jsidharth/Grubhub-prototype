var express = require('express');
var router = express.Router();
var {calculate} = require('../controller/calculator')
/* GET home page. */
router.post('/calculate', (req, res, next) => {
  const {operands, operator} = req.body;
  return calculate(operands, operator).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(500).send('Error')
  })
});

module.exports = router;
