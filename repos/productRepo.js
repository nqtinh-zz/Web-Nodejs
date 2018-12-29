var db = require('../fn/db');
var config = require('../config/config');

exports.loadAll = () => {
    var sql = 'select * from products';
    return db.load(sql);
}

exports.single = proId => {
    var sql = `select pro.*,cat.CatName, produ.ProduName from products pro,categories cat, producers produ where pro.ProID = ${proId} AND pro.CatID = cat.CatID AND pro.ProduID = produ.ProduID`;
    return db.load(sql);
}

exports.loadSameProducer = proId => {
    var sql = `select produ.ProduName, pro2.ProID , pro2.CatID, pro2.ProName, cat.CatName from products pro1, products pro2, categories cat, producers produ where pro1.ProID = ${proId} AND produ.ProduID = pro2.ProduID AND pro2.ProID <> pro1.ProID AND pro2.CatID = pro1.CatID AND cat.CatID = pro2.CatID limit 5`;
    return db.load(sql);
}

exports.loadSameCategory = proId =>{
    var sql = ` select distinct pro2.ProID, pro2.CatID, pro2.ProName, produ.ProduName from products pro1, products pro2 , producers produ  where pro1.ProID =${proId} AND pro1.ProduID = pro2.ProduID AND pro1.ProID<> pro2.ProID AND pro2.ProduID=produ.ProduID limit 5;`;
    return db.load(sql);
}

exports.sin = id => {
	var sql = `select * from products where ProID = ${id}`;
	return db.load(sql);
}

exports.updateView = proId => {
    var sql = `update products 
    set Views=Views+1   
    where ProID = '${proId}' `;
    return db.load(sql);
}
