var express = require('express');
var router = express.Router();

/* GET title */
router.get('/', function(req, res, next) {
  res.json({header: 'Task Tracker App'});
});

module.exports = router;
