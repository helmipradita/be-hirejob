-- Active: 1669270835800@@topsy.db.elephantsql.com@5432@ryfxunak@public
create table test(id INT, name VARCHAR(35));

CREATE TABLE users(id VARCHAR NOT NULL PRIMARY KEY, name VARCHAR NOT NULL, email TEXT NOT NULL,  phone_number TEXT, password TEXT NOT NULL, role VARCHAR,);

ALTER TABLE users ADD otp VARCHAR(32);

ALTER TABLE users ADD company VARCHAR(32);

ALTER TABLE users ADD position VARCHAR(32);

ALTER TABLE users ADD verif INT;

ALTER TABLE 





