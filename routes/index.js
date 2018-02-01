var express = require('express');
var fs = require('fs');
var path = require('path');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/dataLoad', function(req, res, next) {
	try {  
    	var data = fs.readFileSync(path.join(__dirname, '../data/ryan_vis.txt'), 'utf8');
    	res.send(data);
	} 	
	catch(e) {
    	console.log('Error:', e.stack);
	}
});
module.exports = router;
