import mysql from 'mysql2';
import util from 'util';
import config from 'config';

// const connection = mysql.createConnection({
//   host: config.get<string>('mysql.host'),
//   user: config.get<string>('mysql.user'),
//   password: config.get<string>('mysql.password'),
//   database: config.get<string>('mysql.database'),
//   port: config.get<number>('mysql.port'),
// });

const connection = mysql.createConnection(config.get('mysql'));

const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);
(async () => {
  try {
    await connect(); 
    console.log("Connected!");

    await query(`
    CREATE TABLE IF NOT EXISTS users (
        id int auto_increment,
        github_id varchar(255) not null,
        primary key (id)
      )    
    `);
    console.log("created table users!");

    
    await query(`
      CREATE TABLE IF NOT EXISTS users_symbols (
        id int auto_increment,
        user_id int not null,
        symbol varchar(3) not null,
        primary key (id),
        CONSTRAINT unique_user_id_symbol UNIQUE (user_id, symbol)
      )  
    `);
    console.log("created table users_symbol!");
    connection.end()
  } catch (e) {
    console.log(e);
  }
})();
