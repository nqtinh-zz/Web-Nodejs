var express = require('express');
var adminRepo = require('../repos/adminRepo');


var router = express.Router();
router.get('/:proId', (req, res) => {
    var proId = req.params.proId;
    var p1 = adminRepo.loadByProducts(proId);
   	
    Promise.all([p1]).then(([rows]) => {
        var vm = {
            loadByProducts: rows,
        };
        res.render('admin/adminManagements', vm);
    });
router.get('/home',(req,res)=>{
    res.redirect('/');
})
});
module.exports = router;