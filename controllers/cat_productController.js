var express = require('express');
var cat_productRepo = require('../repos/cat_productRepo');
var config = require('../config/config');
var router = express.Router();




router.get('/:catId', (req, res) => {
    var catId = req.params.catId;

    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = cat_productRepo.loadAllByCat(catId, offset);
    var p2 = cat_productRepo.countByCat(catId);
    var p3 = cat_productRepo.single(catId);
    Promise.all([p1, p2,p3]).then(([pRows, countRows,rows]) => {
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
            nameCate:rows[0],
            page_numbers: numbers
        };
        res.render('category/byCat', vm);
    });
});




module.exports = router;