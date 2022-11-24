
CREATE TABLE portofolio(
    id SERIAL PRIMARY KEY,
    name_app VARCHAR NOT NULL,
    repositori VARCHAR NOT NULL,
    type_portofolio VARCHAR NOT NULL
);

CREATE TABLE working_experince(
    id SERIAL PRIMARY KEY,
    posisi VARCHAR NOT NULL,
    nama_perusahaan VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    bulan_tahun VARCHAR NOT NULL
);
INSERT INTO working_experince(id,posisi,nama_perusahaan,description,bulan_tahun) VALUES(1,'Frontend','TES','Telah menjadi seorang frontend selama 4 tahun','4 Tahun');

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR NOT NULL,
    job_desk VARCHAR NOT NULL,
    domisili VARCHAR NOT NULL,
    tempat_kerja VARCHAR NOT NULL,
    description TEXT,
    skill REFERENCES skill(id),
    working_experince VARCHAR NOT NULL,
    portofolio VARCHAR NOT NULL
);
INSERT INTO employee(id,fullname,job_desk,domisili,tempat_kerja,description,skill,working_experince,portofolio) VALUES(1,'lidia wati',job_desk,'Jakarta','Perusahaan TES','lorem10',1,'Fullstack pada perusahaan TES 2',portofolio);


CREATE TABLE skill(id SERIAL PRIMARY KEY,category VARCHAR NOT NULL);
INSERT INTO skill(id,category) VALUES(1,'Javascript'),(2,'PHP'),(3,'Java'),(4,'Go');
















INSERT INTO products(id,name,stock,price,categorys_id) VALUES(1,'baju',20,50000,1);
INSERT INTO transactions(id,email,products_id,amount,total,status) VALUES(1,'sriyuniar541@gmail.com',1,1,30000,1);

SELECT products.name,products.stock,products.price,categorys.categorys as categorys
FROM products
INNER JOIN categorys
ON products.categorys_id = categorys.id;

INSERT INTO payment_status(id,name) VALUES (1,'unpaid'),(2,'paid');

SELECT transactions.email,products.name as products_name,
transactions.amount,products.price,transactions.total,
payment_status.name as status FROM transactions JOIN products 
ON transactions.products_id = products.id JOIN payment_status
ON transactions.status = payment_status.id; 

UPDATE transactions SET status=2 WHERE id=1;

ALTER TABLE products ADD photo VARCHAR(255);




CREATE Table users(
id VARCHAR PRIMARY KEY,
email VARCHAR NOT NULL,
password VARCHAR NOT NULL,
fullName VARCHAR,
role VARCHAR
);

INSERT INTO users(id,email,password,fullName,role) VALUES('1','sri2000@gmail.com','12345','sri-yuniar','admin');
SELECT * FROM users WHERE email='namaemail@gmail.com';




