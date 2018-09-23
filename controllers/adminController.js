var express = require('express');
var adminRepo = require('../repos/adminRepo');
var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false});

var router = express.Router();
router.get('/',(req,res)=>{
    res.render('admin/loginadmin',{layout: false});
})
router.get('/login', (req, res) => {
    res.render('admin/loginadmin',{layout: false});
});
router.get('/dashboard', (req,res)=>{
    var p1 = adminRepo.loadAsus();
    var p2 = adminRepo.loadDell();
    var p3 = adminRepo.loadMac();
    var p4 = adminRepo.loadMSI();
    var p5 = adminRepo.loadVP();
    var p6 = adminRepo.loadDN();
    var p7 = adminRepo.loadUltra();
    var p8 = adminRepo.loadGaming();

    Promise.all([p1,p2,p3,p4,p5,p6,p7,p8]).then(([asus,dell,mac,msi,vp,dn,ul,g]) => {

        var vm = {
            Asus: asus[0],
            Mac: mac[0],
            Dell: dell[0],
            MSI: msi[0],
            VP: vp[0],
            DN: dn[0],
            Gaming: g[0],
            Ultra: ul[0],
            layout:false,
        };
        
        
        res.render('admin/dashboard', vm);
    });
})
router.post('/login',(req,res)=>{
    var user = {
        username: req.body.username,
        password: (req.body.password).toString()
    };

    adminRepo.login(user).then(rows => {
        if (rows.length > 0) {
            res.redirect('/admin/dashboard');

        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed',
                layout:false,
            };
            res.render('admin/loginadmin', vm);
        }
    });
})

router.get('/products', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadAllProducts(offset);
    var p2 = adminRepo.countAllProducts();
    var p3 = adminRepo.loadCatName();
    var p4 = adminRepo.loadProduName();
    var p5 = adminRepo.loadProductID();
    
    Promise.all([p1, p2, p3, p4, p5]).then(([pRows, countRows, qRows, sRows, iRows]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            
            Item: pRows,
            Cate: qRows,
            Produ: sRows,
            ProId: iRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
            res.render('admin/admin', vm);
  
        
    });
})
router.get('/producers', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadProdu(offset);
    var p2 = adminRepo.countProdu();
    
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            
            Item: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
        
            res.render('admin/byProduAdmin', vm);
  
        
    });
})

router.get('/categories', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadCat(offset);
    var p2 = adminRepo.countCat();
    
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            
            Item: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
        
            res.render('admin/byCatAdmin', vm);
  
        
    });
})

router.get('/orders', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadOrder(offset);
    var p2 = adminRepo.countOrder();
    
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            
            Item: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
        
            res.render('admin/byOrderAdmin', vm);
  
        
    });
})

router.post('/orders', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

   

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadOrder(offset);
    var p2 = adminRepo.countOrder();
    var p3 = adminRepo.updateOrder(req.body.status,req.body.id);
    
    Promise.all([p1, p2,p3]).then(([pRows, countRows,orders]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            orders: orders,
            Item: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
        
            res.render('admin/admin', vm); 

    });
})

router.post('/orderss', (req,res)=>{
    var page = req.query.page;
    if (!page) {
        page = 1;
    }

    var offset = (page - 1) * 10;
    var p1 = adminRepo.loadOrder(offset);
    var p2 = adminRepo.countOrder();
    var p3 = adminRepo.updateagainOrder(req.body.status1,req.body.id);
    
    Promise.all([p1, p2,p3]).then(([pRows, countRows,orders]) => {
        var total = countRows[0].total;
        var nPages = total / 10;
        if (total % 10 > 0) {
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
            orders: orders,
            Item: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            layout:false,
        };
        
            res.render('admin/admin', vm); 

    });
})



router.get('/categories/addCat/:CatID/:CatName',(req,res)=>{
    var CatID = req.params.CatID;
    var CatName = req.params.CatName;
    adminRepo.addCat(CatID, CatName);
    res.redirect('/admin/categories');
});
router.post('/categories/add',(req,res)=>{
    var CatID = req.body.CatID;
    var CatName = req.body.CatName;
    res.redirect('/admin/categories/addCat/'+CatID+"/"+CatName);
});
//delete cat
router.get('/categories/deleteCat/:CatID',(req,res)=>{
    var CatID = req.params.CatID;
    adminRepo.deleteCat(CatID);
    res.redirect('/admin/categories');
}); 
router.post('/categories/delete',urlencoded,(req, res)=>{
    var CatID = req.body.id;
    console.log(CatID);
    res.redirect('/admin/categories/deleteCat/'+CatID);
});


// producers

router.get('/producers/addProdu/:ProduID/:ProduName',(req,res)=>{
    var ProduID = req.params.ProduID;
    var ProduName = req.params.ProduName;
    adminRepo.addProdu(ProduID, ProduName);
    res.redirect('/admin/producers');
});
router.post('/producers/add',(req,res)=>{
  
    var ProduID = req.body.ProduID;
    var ProduName = req.body.ProduName;
    res.redirect('/admin/producers/addProdu/'+ProduID+"/"+ProduName);
});
//delete Producers
router.get('/producers/deleteProdu/:ProduID',(req,res)=>{
    var ProduID = req.params.ProduID;
    adminRepo.deleteProdu(ProduID);
    res.redirect('/admin/producers');
}); 
router.post('/producers/delete',urlencoded,(req, res)=>{
    var ProduID = req.body.id;
    res.redirect('/admin/categories/deleteCat/'+ProduID);
});


//MODIFY FORM Category
router.get('/categories/modifyCat/:CatID/:CatName',(req,res)=>{
    var CatID = req.params.CatID;
    var CatName = req.params.CatName;
    adminRepo.modifyCat(CatID,CatName);
    res.redirect('/admin/categories');
}); 
router.post('/categories/modify',urlencoded,(req, res)=>{
    var CatID = req.body.option;
    var CatName = req.body.CatName;
    res.redirect('/admin/categories/modifyCat/'+CatID+"/"+CatName);
});

//MODIFY FORM Producers
router.get('/producers/modifyProdu/:ProduID/:ProduName',(req,res)=>{
    var ProduID = req.params.ProduID;
    var ProduName = req.params.ProduName;
    adminRepo.modifyProdu(ProduID,ProduName);
    res.redirect('/admin/producers');
}); 
router.post('/producers/modify',urlencoded,(req, res)=>{
    var ProduID = req.body.option;
    var ProduName = req.body.ProduName;
    res.redirect('/admin/producers/modifyProdu/'+ProduID+"/"+ProduName);
});


//Add product
router.get('/products/addPro/:ProID/:ProName/:CatID/:ProduID/:Quantity/:Price/:Des/:AddDate',(req,res)=>{
    var ProID = req.params.ProID;
    var ProName = req.params.ProName;
    var CatID = req.params.CatID;
    var ProduID = req.params.ProduID;
    var Quantity = req.params.Quantity;
    var Price = req.params.Price;
    var Des = req.params.Des;
    var AddDate =  req.params.AddDate;
    adminRepo.addProduct(ProID,ProName,CatID,ProduID,Quantity,Price,Des,AddDate);
    res.redirect('/admin/products')
    
})

router.post('/products/addPro',(req,res)=>{
    var ProID = req.body.ProID;
    var ProName = req.body.ProName;
    var CatID = req.body.CatID;
    var ProduID = req.body.ProduID;
    var Quantity = req.body.Quantity;
    var Price = req.body.Price;
    var Des = req.body.Des;
    var AddDate = req.body.AddDate;
    console.log(ProID+" "+ProName+" "+CatID+" "+ProduID+" "+Quantity+" "+Price+" "+Des+" "+AddDate)
    res.redirect('/admin/products/addPro/'+ProID+"/"+ProName+"/"+CatID+"/"+ProduID+"/"+Quantity+"/"+Price+"/"+Des+"/"+AddDate);
}) 

//Modify products
router.get('/products/modifyPro/:ProID/:ProName/:CatID/:ProduID/:Quantity/:Price/:Des/:AddDate',(req,res)=>{
    var ProID = req.params.ProID;
    var ProName = req.params.ProName;
    var CatID = req.params.CatID;
    var ProduID = req.params.ProduID;
    var Quantity = req.params.Quantity;
    var Price = req.params.Price;
    var Des = req.params.Des;
    var AddDate =  req.params.AddDate;
    adminRepo.modifyPro(ProID,ProName,CatID,ProduID,Quantity,Price,Des,AddDate);
    res.redirect('/admin/products')
    
})

router.post('/products/modifyPro',(req,res)=>{
    var ProID = req.body.ProID;
    var ProName = req.body.ProName;
    var CatID = req.body.CatID;
    var ProduID = req.body.ProduID;
    var Quantity = req.body.Quantity;
    var Price = req.body.Price;
    var Des = req.body.Des;
    var AddDate = req.body.AddDate;
    console.log(ProID+" "+ProName+" "+CatID+" "+ProduID+" "+Quantity+" "+Price+" "+Des+" "+AddDate)
    res.redirect('/admin/products/modifyPro/'+ProID+"/"+ProName+"/"+CatID+"/"+ProduID+"/"+Quantity+"/"+Price+"/"+Des+"/"+AddDate);
}) 
//delete products
router.get('/products/deletePro/:ProID',(req,res)=>{
    var ProID = req.params.ProID;
    adminRepo.deletePro(ProID);
    res.redirect('/admin/products');
}); 
router.post('/products/delete',urlencoded,(req, res)=>{
    var ProID = req.body.id;
    res.redirect('/admin/products/deletePro/'+ProID);
    console.log(ProID);
});

module.exports = router;