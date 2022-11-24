-- Active: 1669203562756@@topsy.db.elephantsql.com@5432@ryfxunak@public
create table test(id INT, name VARCHAR(35));

create table roles(
    id SERIAL PRIMARY KEY, 
    nama VARCHAR NOT NULL
);

INSERT INTO roles (id, nama) VALUES (1, 'perekrut'), (2, 'pekerja');

DROP TABLE compay;

create table company(
    id SERIAL PRIMARY KEY, 
    nama VARCHAR NOT NULL,
    bidang VARCHAR NOT NULL,
    kota VARCHAR NOT NULL,
    deskripsi VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    instagram VARCHAR NOT NULL,
    telepon VARCHAR NOT NULL,
    linkedin VARCHAR NOT NULL
);

INSERT INTO company ( nama, bidang, kota, deskripsi, email, instagram, telepon, linkedin) 
    VALUES ('PT. Martabat Jaya Abadi', 'Financial', 'Purwokerto, Jawa Tengah', 'Perusahaan yang bergerak di bidang finance', 'martabakjaya@gmail.com', 'martabat_jaya', '0821-8190-1821', 'Martabat Jaya Abadi');