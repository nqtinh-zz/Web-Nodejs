var express = require('express');
var adminRepo = require('../repos/adminRepo');


var router = express.Router();

router.get('/:catId', (req, res) => {
    var catId = req.params.catId;
    // var p1 = cat_productRepo.single(catId);
    var p2 = adminRepo.loadByCatAdmin(catId);
   	
    Promise.all([p2]).then(([rows]) => {
        var vm = {
            loadAllByCatAdmin: rows,
        };
        res.render('admin/byCatAdmin', vm);
    });
router.get('/home',(req,res)=>{
    res.redirect('/');
})
});

router.get('/', (req, res) => {
    //var catId = req.params.catId;
    // var p1 = cat_productRepo.single(catId);
    var p2 = adminRepo.loadAllByCatAdmin();
   	
    Promise.all([p2]).then(([rows]) => {
        var vm = {
            loadAllByCatAdmin: rows,
        };
        res.render('admin/byCatAdmin', vm);
    });
router.get('/home',(req,res)=>{
    res.redirect('/');
})
});

module.exports = router;