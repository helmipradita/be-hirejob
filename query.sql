-- Active: 1669270835800@@topsy.db.elephantsql.com@5432@ryfxunak@public
create table test(id INT, name VARCHAR(35));

CREATE TABLE users(id VARCHAR NOT NULL PRIMARY KEY, name VARCHAR NOT NULL, email TEXT NOT NULL,  phone_number INT, company VARCHAR(50), position VARCHAR(50), password TEXT NOT NULL, role VARCHAR, otp INT, verif VARCHAR(1));







