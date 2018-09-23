var db = require('../fn/db');
var config = require('../config/config');

exports.login = user => {
    var sql = `select * from admin where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}
exports.loadAllProducts = (offset) =>{
    var sql =`select products.*, categories.CatName,producers.ProduName from products, categories,producers where products.ProduID = producers.ProduID and products.CatID = categories.CatID order by ProID asc limit 10 offset ${offset}`;
    return db.load(sql);
}
exports.countAllProducts = ()=>{
    var sql = `select count(*) as total from products `;
    return db.load(sql);
}


exports.loadCat = (offset)=>{
    var sql = `select * from categories  limit 10 offset ${offset}`;
    return db.load(sql);
}
exports.countCat = ()=>{
    var sql = `select count(*) as total from categories`;
    return db.load(sql);
}
exports.loadProdu = (offset)=>{
    var sql = `select * from producers  limit 10 offset ${offset}`;
    return db.load(sql);
}

exports.countProdu = ()=>{
    var sql = `select count(*) as total from producers`;
    return db.load(sql);
}

exports.loadCatName = () =>{
    var sql = `select categories.* from categories`;
    return db.load(sql);
}

exports.loadProduName = () =>{
    var sql = `select  producers.* from producers`;
    return db.load(sql);
}

exports.loadProductID = () =>{
    var sql = `select products.ProID from products`;
    return db.load(sql);
}
exports.loadOrder = (offset)=>{
    var sql = `select products.*,orderdetails.*,users.* 
    from orderdetails,products,users 
    where products.ProID=orderdetails.ProID and  orderdetails.f_ID=users.f_ID
    order by orderdetails.OrderDay Desc
    limit 10 offset ${offset}`;
    return db.load(sql);
}

exports.countOrder = ()=>{
    var sql = `select count(*) as total from orderdetails`;
    return db.load(sql);
}


exports.updateOrder = (status,id)=>{
    var sql = `update orderdetails set Status='Đã giao hàng' where ID='${id}'`;
    return db.load(sql);
}

exports.updateagainOrder = (status,id)=>{
    var sql = `update orderdetails set Status='Chưa giao hàng' where ID='${id}'`;
    return db.load(sql);
}

exports.loadByProducts = proId => {
    var sql = `select products.ProID, products.ProName, products.Quantity, products.Price, products.Des, categories.CatName, producers.ProduName 
                from products, categories, producers where products.ProID = ${proId} and products.CatID = categories.CatID and products.ProduID = producers.ProduID`;
    return db.load(sql);
}


exports.addCat = (CatID, CatName)=>{
    var sql = `insert into categories values('${CatID}','${CatName}')`
    return db.load(sql);
}

exports.deleteCat = (CatID) =>{
    var sql = `delete from categories where CatID = ${CatID}`
    return db.load(sql);
}


exports.addProdu = (ProduID, ProduName)=>{
    var sql = `insert into producers values('${ProduID}','${ProduName}')`
    return db.load(sql);
}

exports.deleteProdu = (ProduID) =>{
    var sql = `delete from producers where ProduID = ${ProduID}`
    return db.load(sql);
}

///modify form cat

exports.modifyCat = (CatID, CatName) =>{
    var sql=`update categories set CatName = '${CatName}' where CatID = '${CatID}'`;
    return db.load(sql);
}

exports.modifyProdu = (ProduID, ProduName) =>{
    var sql=`update producers set ProduName = '${ProduName}' where ProduID = '${ProduID}'`;
    return db.load(sql);
}

exports.addProduct = (ProID, ProName, CatID, ProduID, Quantity, Price, Des,AddDate) =>{
    var sql= `insert into products values('${ProID}', '${ProName}', '${Price}', '0','0', '${Des}', '${CatID}', '${ProduID}', '${Quantity}', STR_TO_DATE('${AddDate}', '%d-%m-%Y'))`;
    return db.load(sql);
}

exports.modifyPro = (ProID, ProName, CatID, ProduID, Quantity, Price, Des,AddDate) =>{
    var sql=`update products set ProName = '${ProName}',CatID = '${CatID}',ProduID = '${ProduID}',Quantity = '${Quantity}',Price = '${Price}',Des = '${Des}',AddDate = STR_TO_DATE('${AddDate}', '%d-%m-%Y') where ProID = '${ProID}'`;
    return db.load(sql);
}

exports.deletePro = (ProID) =>{
    var sql = `delete from products where ProID = ${ProID}`
    return db.load(sql);
}

exports.loadAsus = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where ProduID=1`;

    return db.load(sql);
}

exports.loadDell = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where ProduID=2`;

    return db.load(sql);
}

exports.loadMac = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where ProduID=3`;

    return db.load(sql);
}

exports.loadMSI = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where ProduID=4`;
 
    return db.load(sql);
}

exports.loadVP = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where CatID=2`;
 
    return db.load(sql);
}

exports.loadDN = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where CatID=3`;
    
    return db.load(sql);
}

exports.loadGaming = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where CatID=1`;
  
    return db.load(sql);
}

exports.loadUltra = ()=>{
    var sql = `select SUM(Sales) Sold FROM products where CatID=4`;
   
    return db.load(sql);
}