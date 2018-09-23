var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from categories ';
    return db.load(sql);
}


// exports.loadAllByCat = (catId) => {
//     var sql = `select * from products where CatID = ${catId}`;
//     return db.load(sql);
// }

exports.loadAllByCat = (catId, offset) => {
    var sql = `select products.ProName, products.ProID, products.Price, producers.ProduName
                from products,producers 
                where producers.ProduId=products.ProduId and products.CatID = ${catId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total 
                from products 
                where CatID = ${catId}`;
    return db.load(sql);
}

exports.single = catId => {
    var sql = `select * from categories where CatID = ${catId}`;
    return db.load(sql);
}


