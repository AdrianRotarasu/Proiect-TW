CREATE USER Adi WITH ENCRYPTED PASSWORD 'Adi';
GRANT ALL PRIVILEGES ON DATABASE database1 TO Adi;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to Adi;

DROP TYPE categ_carti;
DROP TYPE tipuri_carti;

CREATE TYPE categ_carti AS ENUM( 'SF', 'Politiste', 'Drama', 'Actiune-Aventura', 'Graphic-Novel','Istorie','Altele');
CREATE TYPE tipuri_carti AS ENUM('Roman', 'Colectie-Nuvele', 'Poezie','Altele');

DROP TABLE carti;

CREATE TABLE IF NOT EXISTS carti (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   nr_pg INT NOT NULL CHECK (nr_pg>0),   
   tip_carti tipuri_carti DEFAULT 'Altele',
   categorie categ_carti DEFAULT 'Altele',
   autori VARCHAR [],
   in_stoc BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into carti (nume,descriere,pret,nr_pg,tip_carti,categorie,autori,in_stoc,imagine) VALUES 
('Maitreyi','dasdas',100,255,'Roman','Drama','{"Mircea Eliade"}',True,'Maitreyi.png'),
('1984','dasdas',210,400,'Roman','SF','{"George Orwell"}',True,'1984.png'),
('Batranul si Marea','dasdas',50,120,'Colectie-Nuvele','Drama','{"Ernest Hemingway"}',False,'BsM.png'),
('Ferma Animalelor','dasdas',150,100,'Poezie','SF','{"George Orwell"}',True,'FA.png'),
('Carte Generica1','dasdas',212,150,'Altele','Altele','{"Frate Grimm 1","Frate Grimm 2"}',True,'CG1.png'),
('Carte Generica2','dasdas',21,50,'Altele','Altele','{"Frate Grimm 1","Frate Grimm 2"}',True,'CG2.png'),
('Carte Generica3','dasdas',300,502,'Roman','Drama','{"George Orwell","Ernest Hemingway"}',True,'CG3.png'),
('Carte Generica4','dasdas',350,402,'Colectie-Nuvele','Graphic-Novel','{"George Orwell","Ernest Hemingway"}',True,'CG4.png'),
('Carte Generica5','dasdas',210,420,'Poezie','Actiune-Aventura','{"Mircea Eliade","Mircea Eliade 2"}',False,'CG5.png'),
('Carte Generica6','dasdas',132,231,'Altele','Politiste','{"Mircea Eliade","Mircea Eliade 2"}',True,'CG6.png'),
('Carte Generica7','dasdas',1230,1230,'Altele','Istorie','{"Lucian Boia","Gabriel Liceanu"}',False,'CG7.png'),
('Carte Generica8','dasdas',2341,123,'Colectie-Nuvele','Politiste','{"Mircea Eliade","Mircea Eliade 2"}',False,'CG8.png'),
('Carte Generica9','dasdas',210,420,'Poezie','Drama','{"Eminescu","Ion Creanga"}',True,'CG9.png'),
('Carte Generica10','dasdas',241,765,'Roman','Actiune-Aventura','{"Mircea Eliade"}',False,'CG10.png'),
('Carte Generica11','dasdas',560,2341,'Roman','Drama','{"Mircea Eliade","Mircea Eliade 2"}',False,'CG11.png'),
('Carte Generica12','dasdas',210,420,'Poezie','Actiune-Aventura','{"Mircea Eliade","George Orwell"}',True,'CG12.png'),
('Carte Generica13','dasdas',2132,543,'Colectie-Nuvele','SF','{"Stan Lee"}',True,'CG13.png'),
('Carte Generica14','asdas',567,893,'Poezie','Actiune-Aventura','{"Mircea Eliade","Mircea Eliade 2"}',True,'CG14.png'),
('Carte Generica15','dasdas',654,91,'Colectie-Nuvele','Politiste','{"Mircea Eliade","Mircea Eliade 2"}',False,'CG15.png'),
('Ultima Noapte De Dragoste, Intaia Noapte De Razboi','asdasdad',213,876,'Colectie-Nuvele','Istorie','{"Camil Petrescu"}',True,'UNDDPNDR.png');




















































































