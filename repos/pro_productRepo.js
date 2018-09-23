var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from producers';
    return db.load(sql);
}

// exports.loadAllByCat = (catId) => {
//     var sql = `select * from products where CatID = ${catId}`;
//     return db.load(sql);
// }

exports.loadAllByPro = (produId, offset) => {
    var sql = `select products.ProName, products.ProID, products.Price, producers.ProduName 
			    from products,producers 
			    where producers.ProduId=products.ProduId and products.ProduID = ${produId} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}

exports.countByPro = produId => {
	var sql = `select count(*) as total from products where ProduID = ${produId}`;
    return db.load(sql);
}

exports.single = produId => {
    var sql = `select * from producers where ProduID = ${produId}`;
    return db.load(sql);
}