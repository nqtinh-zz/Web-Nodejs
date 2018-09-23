var express = require('express'),
    SHA256 = require('crypto-js/sha256'),
    moment = require('moment');

var productRepo = require('../repos/productRepo'),
    cartRepo = require('../repos/cartRepo'),
    payRepo = require('../repos/payRepo')

var accountRepo = require('../repos/accountRepo');
var restrict = require('../middle-wares/restrict');

var router = express.Router();



router.get('/register', (req, res) => {
    res.render('account/register');
});

router.post('/register', (req, res) => {

    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');

    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };
    accountRepo.add(user);
    res.redirect('/account/login');
    
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,       
        password: SHA256(req.body.rawPWD).toString()
    };

    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];

           

            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);

        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    });
});

router.get('/profile/:userID', (req, res) => {
    var p1 = accountRepo.loadinfo(req.params.userID);

    Promise.all([p1]).then(([rows]) => {

        var vm = {
            info: rows
        };
        
        res.render('account/profile', vm);
    });
});

router.get('/updateinfo/:userID',restrict, (req, res) => {
    res.render('account/updateinfo');
});

router.post('/updateinfo/:userID',(req, res) => {

    var userID = req.params.userID;

    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');

    var user = {    
        userId: userID,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0
    };

    accountRepo.update(user).then(value => {
        var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect('/home');
    });
});

router.post('/logout', restrict, (req, res) => {
    req.session.isLogged = false;
    req.session.curUser = null;
    req.session.cart = [];

    res.redirect(req.headers.referer);
});


router.get('/pay/:userID',restrict, (req, res) => {

    var p1 = cartRepo.inTotal(req.session.cart);

    Promise.all([p1]).then(([rows]) => {

        var vm = {
            items: req.session.cart,
            total: rows
        };
        
        res.render('account/pay', vm);
    });
});
router.get('/home', (req, res) => {
    res.render('home/index');
});

router.post('/pay/:userID',(req, res) => {

    var userID = req.params.userID;


    var user = {    
        userId: userID,     
        phone: req.body.phone,
        address: req.body.address
    };

    payRepo.add(req.session.cart,userID);
    payRepo.updateQuantity(req.session.cart);
    payRepo.updateSale(req.session.cart);
    accountRepo.addinfo(user);
    req.session.cart = [];
    res.redirect('/home');
});



router.get('/historypay/:userID',restrict, (req, res) => {

    var p1= payRepo.loadAllOder(req.params.userID);
    Promise.all([p1]).then(([rows]) => {

        var vm = {
            oders: rows
        };     
        res.render('account/historypay',vm);
    });
   
});

router.get('/cart/:userID', (req, res) => {
    var p1 = cartRepo.inTotal(req.session.cart);

    Promise.all([p1]).then(([rows]) => {

        var vm = {
            items: req.session.cart,
            total: rows
        };
        
        res.render('account/cart', vm);
    });
   
});

router.post('/cart/add', (req, res) => {
    productRepo.sin(req.body.proId).then(rows => {
        var item = {
            product: rows[0],
            quantity: +req.body.quantity,
            amount: rows[0].Price * +req.body.quantity
        };
        
        cartRepo.add(req.session.cart, item);
        res.redirect(req.headers.referer);
    });
});

router.post('/cart/remove', (req, res) => {
    cartRepo.remove(req.session.cart, +req.body.proId);
    res.redirect(req.headers.referer);
});

module.exports = router;