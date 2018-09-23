var db = require('../fn/db');
var config = require('../config/config');
exports.loadAll = (offset) => {
    var sql =`select products.*, producers.ProduName from products, producers where products.ProduID = producers.ProduID limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
    return db.load(sql);
}
exports.countAll = ()=>{
    var sql = `select count(*) as total from products `;
    return db.load(sql);
}
exports.loadbyName = (proName,offset)=>{
    var sql = `select * from products where ProName like "%${proName}%" limit ${config.PRODUCTS_PER_PAGE} offset ${offset} `;
    return db.load(sql);
}

exports.countByPro = proName => {
	var sql = `select count(*) as total from products where ProName like "%${proName}%"`;
    return db.load(sql);
}

//load by catname
exports.loadbyCatName = (catName,offset)=>{
    var sql = `select products.*, categories.CatName ,producers.ProduName from products , categories,producers where producers.ProduID = products.ProduID AND products.CatID = categories.CatID AND categories.CatName like "%${catName}%" limit ${config.PRODUCTS_PER_PAGE} offset ${offset} `;
    return db.load(sql);
}

exports.countByCatName = catName => {
	var sql = `select count(products.ProID) as total from products, categories where products.CatID = categories.CatID AND CatName like "%${catName}%"`;
    return db.load(sql);
}
//Produname
exports.loadbyProduName = (ProduName,offset)=>{
    var sql = `select products.*, producers.ProduName from products , producers where products.ProduID = producers.ProduID AND producers.ProduName like "%${ProduName}%"  limit ${config.PRODUCTS_PER_PAGE} offset ${offset} `;
    return db.load(sql);
}

exports.countByProduName= ProduName => {
	var sql = `select count(products.ProID) as total from products, producers where products.ProduID = producers.ProduID AND ProduName like "%${ProduName}%"`;
    return db.load(sql);
}

//# # #
exports.loadbyAdvance = (producer,category,priceup,pricedown,offset)=>{
   var sql =  `select pro.* from products pro, producers produ, categories cat where pro.ProduID = produ.ProduID and 
cat.CatID = pro.CatID and cat.CatName like "%${category}%"
and produ.ProduName like "%${producer}%" and price between ${pricedown} and ${priceup} limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`
return db.load(sql);
}

exports.countByAdvance = (producer,category,priceup, pricedown) =>{
  var sql =  `select count(pro.ProID) as total from products pro, producers produ, categories cat where pro.ProduID = produ.ProduID and 
    cat.CatID = pro.CatID and cat.CatName like "%${category}%"
    and produ.ProduName like "%${producer}%" and price between ${pricedown} and ${priceup} `
    return db.load(sql);
}

//all all all
exports.loadbyAdvance1 = (priceup,pricedown,offset)=>{
    var sql =  `select * from products where price between ${pricedown} and ${priceup}  limit ${config.PRODUCTS_PER_PAGE}  offset ${offset}`
 return db.load(sql);
 }
 
 exports.countByAdvance1 = (priceup, pricedown) =>{
   var sql =  `select count(ProID) as total from products where price between ${pricedown} and ${priceup} `
   return db.load(sql);
 }

 // all # all 
 exports.loadbyAdvance2 = (category,priceup,pricedown,offset)=>{
    var sql =  `select products.* from products, categories where categories.CatName like "%${category}%" and products.CatID = categories.CatID and  price between ${pricedown} and ${priceup}  limit ${config.PRODUCTS_PER_PAGE}  offset ${offset}`
 return db.load(sql);
 }
 
 exports.countByAdvance2 = (category,priceup, pricedown) =>{
   var sql =  `select count(ProID) as total from products, categories where categories.CatName like "%${category}%" and products.CatID = categories.CatID and  price between ${pricedown} and ${priceup} `
   return db.load(sql);
 }
 // # all all|#
 exports.loadbyAdvance3 = (producer,priceup,pricedown,offset)=>{
    var sql =  `select products.* from products, producers where producers.ProduName like "%${producer}%" and products.ProduID = producers.ProduID and  price between ${pricedown} and ${priceup}  limit ${config.PRODUCTS_PER_PAGE}  offset ${offset}`
 return db.load(sql);
 }
 
 exports.countByAdvance3 = (producer,priceup, pricedown) =>{
   var sql =  `select count(ProID) as total from products, producers where producers.ProduName like "%${producer}%" and products.ProduID = producers.ProduID and  price between ${pricedown} and ${priceup} `
   return db.load(sql);
 }