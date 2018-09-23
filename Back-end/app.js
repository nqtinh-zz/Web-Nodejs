var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');
var restrict = require('./middle-wares/restrict');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var homeController = require('./controllers/homeController'),
    pro_productController=require('./controllers/pro_productController'),
    cat_productController = require('./controllers/cat_productController'),
    productController = require('./controllers/productController'),
    adminController = require('./controllers/adminController'),
    byCatAdminController = require('./controllers/byCatAdminController'),
    byProduAdminController = require('./controllers/byProduAdminController'),
    searchController = require('./controllers/searchController'),
    adminManageController = require('./controllers/adminManageController');

var handleLayoutMDW = require('./middle-wares/handleLayout'),
    accountController = require('./controllers/accountController');

var app = express();



app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    helpers: {
        section: express_handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: '.'
            });
            return nf.to(n);
        }
    }
}));


app.set('view engine', 'hbs');
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'qllaptop',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(handleLayoutMDW);
app.get('/', (req, res) => {
    res.redirect('/home');
});
app.use('/home', homeController);
app.use('/category', cat_productController);
app.use('/producer', pro_productController);
app.use('/account', accountController);
app.use('/product', productController);
app.use('/admin', adminController);
app.use('/admin/byCatAdmin', byCatAdminController);
app.use('/admin/byProduAdmin', byProduAdminController);
app.use('/search',searchController);
app.use('/admin/adminManagements', adminManageController);

app.listen(1200, () => {
    console.log('Site running on port 1200');
});