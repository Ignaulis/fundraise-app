import { users } from './users.js';
import { stories } from './stories.js';
import { donations } from './donations.js';
import mysql from 'mysql';
import md5 from 'md5';

let sql;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fond'
});

con.connect(() => console.log('Prisijungta prie duomenų bazės!'));

con.query('DROP TABLE IF EXISTS users;'), (err) => {
    if (err) throw err;
};
con.query('DROP TABLE IF EXISTS stories;'), (err) => {
    if (err) throw err;
};
con.query('DROP TABLE IF EXISTS donations;'), (err) => {
    if (err) throw err;
};

sql = `
    CREATE TABLE users (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    el_pastas VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL   
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Lentele users sukurta!');
});

sql = `
    CREATE TABLE stories (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    img VARCHAR(500),
    tikslas DECIMAL(10, 2) NOT NULL,
    surinkta DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    user_id INT(10) UNSIGNED NOT NULL,
    status ENUM('patvirtinta', 'nepatvirtinta') NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Lentele stories sukurta!');
});

sql = `
    CREATE TABLE donations (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sum DECIMAL(10, 2) NOT NULL,
    storie_id INT(10) UNSIGNED NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Lentele donations sukurta!');
});

sql = `
    INSERT INTO users
    (id, name, el_pastas, password, role)
    VALUES ?
`;

con.query(sql, [users.map(user => [user.id, user.name, user.el_pastas, md5(user.passw), user.role])], (err) => {
    if (err) throw err;
    console.log('Duomenys įterpti į lentelę users!');
});

sql = `
    INSERT INTO stories
    (id, text, img, tikslas, surinkta, user_id, status)
    VALUES ?
`;

con.query(sql, [stories.map(s => [s.id, s.text, s.img, s.tikslas, s.surinkta, s.user_id, s.status])], (err) => {
    if (err) throw err;
    console.log('Duomenys įterpti į lentelę stories!');
});

sql = `
    INSERT INTO donations
    (id, name, sum, storie_id)
    VALUES ?
`;

con.query(sql, [donations.map(d => [d.id, d.name, d.sum, d.storie_id])], (err) => {
    if (err) throw err;
    console.log('Duomenys įterpti į lentelę donations!');
});



sql = `
    ALTER TABLE stories
    ADD CONSTRAINT stories_ibfk_users
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Sukurti raktai tarp lentelių!');
});


sql = `
    ALTER TABLE donations
    ADD CONSTRAINT donations_ibfk_1 FOREIGN KEY (storie_id) REFERENCES stories (id) ON DELETE CASCADE
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Sukurti raktai tarp lentelių!');
});

con.end(err => {
    if (err) throw err;
    console.log('Atsijungta nuo duomenų bazės!');
});