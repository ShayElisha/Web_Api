var mysql= require('mysql2');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Shay2312',
database: 'test'
});
connection.connect();
connection.query('SELECT * from t_Product', function (error, results, fields) {
     if (error) throw error;
     console.log('The solution is: ', results);
     });





module.exports= connection;