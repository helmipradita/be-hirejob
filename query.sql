-- Active: 1669270835800@@topsy.db.elephantsql.com@5432@ryfxunak@public
create table test(id INT, name VARCHAR(35));

CREATE TABLE users(id VARCHAR NOT NULL PRIMARY KEY, name VARCHAR NOT NULL, email TEXT NOT NULL,  phone_number VARCHAR, company VARCHAR(50), position VARCHAR(50), password TEXT NOT NULL, role VARCHAR, verif VARCHAR(1), otp VARCHAR);


-- Active: 1669203562756@@topsy.db.elephantsql.com@5432@ryfxunak
-- Active: 1666321324503@@127.0.0.1@5432@helmi@public

CREATE TABLE tbl_skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
	user_id VARCHAR
);

CREATE TABLE tbl_employee (
    id VARCHAR PRIMARY KEY,
    fullname VARCHAR,
	email VARCHAR,
	telepon VARCHAR,
	password VARCHAR,
	jobdesk VARCHAR,
	domisili VARCHAR,
	tempat_kerja VARCHAR,
	deskripsi VARCHAR,
	role VARCHAR(10) DEFAULT 'employee',
	verif INT,
	otp VARCHAR
);

CREATE TABLE tbl_experience (
    id SERIAL PRIMARY KEY,
    posisi VARCHAR,
	nama_perusahaan VARCHAR,
	bulan_tahun VARCHAR,
	deskripsi VARCHAR,
	employee_id VARCHAR
);

CREATE TABLE tbl_portofolio (
    id SERIAL PRIMARY KEY,
    nama_app VARCHAR,
	link_repo VARCHAR,
	tipe_repo VARCHAR,
	photo VARCHAR,
	employee_id VARCHAR
);

CREATE TABLE tbl_company (
    id VARCHAR PRIMARY KEY,
    fullname VARCHAR,
	email VARCHAR,
	nama_perusahaan VARCHAR,
	jabatan VARCHAR,
	telepon VARCHAR,
	password VARCHAR,
	bidang VARCHAR,
	kota VARCHAR,
	deskripsi VARCHAR,
	instagram VARCHAR,
	linkedin VARCHAR,
	role VARCHAR(10) DEFAULT 'company',
	verif INT,
	otp VARCHAR
);

CREATE TABLE tbl_hire (
    id VARCHAR PRIMARY KEY,
	tujuan VARCHAR,
	company_nama VARCHAR,
	company_email VARCHAR,
	company_telepon VARCHAR,
	deskripsi VARCHAR,
    company_id VARCHAR,
	employee_id VARCHAR
);

DROP TABLE tbl_hire;

INSERT INTO tbl_company (id, fullname, email, password) 
	VALUES (1212121, 'Helmi', 'helmipradita@gmail.com', 123456);

