var db = require('../fn/db');
var config = require('../config/config');



exports.loadbySale = () => {
    var sql = `select products.ProName, products.ProID, products.Price, producers.ProduName  
                from products,producers 
                where producers.ProduId=products.ProduId 
                order by Sales desc limit 10`;
    return db.load(sql);
}
exports.loadbyNew = () => {
    var sql = `select products.ProName, products.ProID, products.Price, producers.ProduName  
                from products,producers 
                where producers.ProduId=products.ProduId 
                order by products.AddDate Desc limit 10`;
    return db.load(sql);
}
exports.loadbyView = () => {
    var sql = `select products.ProName, products.ProID, products.Price, producers.ProduName  
                from products,producers 
                where producers.ProduId=products.ProduId 
                order by Views desc limit 10`;
    return db.load(sql);
}

