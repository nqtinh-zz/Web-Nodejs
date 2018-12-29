var db = require('../fn/db');

exports.add = user => {
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission,f_Phone,f_Address) values('${user.username}', '${user.password}', '${user.name}', '${user.email}', '${user.dob}', '${user.permission}','Cập nhật lúc thanh toán','Cập nhật lúc thanh toán')`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from users where f_Username = '${user.username}' and f_Password = '${user.password}'`;
    return db.load(sql);
}

exports.update = user => {
    var sql = `update users set f_Password ='${user.password}',f_Name= '${user.name}',f_Email='${user.email}',f_DOB='${user.dob}'   where f_ID = '${user.userId}' `;
    return db.load(sql);
}

exports.addinfo = user => {
    var sql = `update users set f_Phone ='${user.phone}', f_Address ='${user.address}'   where f_ID = '${user.userId}' `;
    return db.load(sql);
}

exports.loadinfo = userID => {
    var sql = `select * from users where f_ID = '${userID}'`;
    return db.load(sql);

}
