var express = require('express');
var router = express.Router();
var debug = require('debug')('city:index');
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.htlm', {root: 'public'})
});

router.get('/city', (req, res) => {
    debug('Reading City Data')
    const prefix = req.query.q
    debug(`Checking for prefix ${prefix}`)
    fs.readFile(`${__dirname}/citydata.txt`, (err, data) => {
        if(err) {
            debug(err)
            return res.status(500).send(err)
        }
        let matches = []
        let cities = data.toString().split('\n')
        for(city of cities){
            // debug(city)
            if(city.toString().match(`^${prefix}`)){
                matches.push({city: city})
            }
        }
        res.status(200).send(JSON.stringify(matches))
    })
})

module.exports = router;
