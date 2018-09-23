var express = require('express');
var adminRepo = require('../repos/adminRepo');


var router = express.Router();

router.get('/', (req, res) => {
    // var produId = req.params.produId;
    // var p1 = cat_productRepo.single(catId);
    var p1 = adminRepo.loadAllByProduAdmin();

    Promise.all([p1]).then(([rows]) => {
        var vm = {
            loadAllByProduAdmin: rows,
        };
        res.render('admin/byProduAdmin', vm);
    });
router.get('/home',(req,res)=>{
    res.redirect('/');
})
});

router.get('/:produId', (req, res) => {
    var produId = req.params.produId;
    // var p1 = cat_productRepo.single(catId);
    var p1 = adminRepo.loadByProduAdmin(produId);
    
    Promise.all([p1]).then(([rows]) => {
        var vm = {
            loadAllByProduAdmin: rows,
        };
        res.render('admin/byProduAdmin', vm);
    });
router.get('/home',(req,res)=>{
    res.redirect('/');
})
});
module.exports = router;