var express = require('express');
var pro_productRepo = require('../repos/pro_productRepo');
var config = require('../config/config');
var router = express.Router();




router.get('/:produId', (req, res) => {
    var produId = req.params.produId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = pro_productRepo.loadAllByPro(produId, offset);
    var p2 = pro_productRepo.countByPro(produId);
    var p3 = pro_productRepo.single(produId);
    Promise.all([p1, p2, p3]).then(([pRows, countRows,rows]) => {
        // console.log(pRows);
        // console.log(countRows);

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }

        var vm = {
            
            products: pRows,
            noProducts: pRows.length === 0,
            nameProdu:rows[0],
            page_numbers: numbers
        };
        res.render('producer/byProducer', vm);
    });
});




module.exports = router;