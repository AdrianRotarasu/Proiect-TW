const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Client } = require('pg');
const url = require('url');
const { exec } = require("child_process");
const ejs = require('ejs');

var app = express();//am creat serverul

const client = new Client({
	host: 'localhost',
	user: 'adi',
	password: 'Adi',
	database: 'postgres',
	port: 5432,

})
client.connect()

app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use("/js", express.static(path.join(__dirname, "js")));
app.set("view engine", "ejs");
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/videos", express.static(path.join(__dirname, "videos")));


function verificaImagini() {
	var textFisier = fs.readFileSync("views/json/galerie.json")
	var jsi = JSON.parse(textFisier); //am transformat in obiect

	var date = new Date()

	var caleGalerie = jsi.cale_galerie;
	let vectImagini = [];


	for (let im of jsi.imagini) {
		var imVeche = path.join(caleGalerie, im.cale_relativa);//obtin claea completa (im.fisier are doar numele fisierului din folderul caleGalerie)
		var ext = path.extname(im.cale_relativa);//obtin extensia
		var numeFisier = path.basename(im.cale_relativa, ext)//obtin numele fara extensie
		let imNoua = path.join(caleGalerie + "/mic/", numeFisier + "-mic" + ".webp");//creez cale apentru imaginea noua; prin extensia wbp stabilesc si tipul ei

		if (!im.timp.localeCompare("dimineata") && 5 <= date.getHours() && date.getHours() < 12) {
			
			vectImagini.push({ mare: imVeche, mic: imNoua, descriere: im.descriere, nume: im.nume }); //adauga in vector un element
		}
		else if (!im.timp.localeCompare("zi") && 12 <= date.getHours() && date.getHours() < 20) {
			
			vectImagini.push({ mare: imVeche, mic: imNoua, descriere: im.descriere, nume: im.nume }); //adauga in vector un element
		}
		else if (!im.timp.localeCompare("noapte") && (20 <= date.getHours() || date.getHours() < 5)) {
			
			vectImagini.push({ mare: imVeche, mic: imNoua, descriere: im.descriere, nume: im.nume }); //adauga in vector un element
		}


		if (!fs.existsSync(imNoua))//daca nu exista imaginea, mai jos o voi crea
			sharp(imVeche)
				.resize(150) //daca dau doar width(primul param) atunci height-ul e proportional
				.toFile(imNoua, function (err) {
					if (err)
						console.log("eroare conversie", imVeche, "->", imNoua, err);
				});
	}
	// [ {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}  ]
	return vectImagini;
}

app.get(["/", "/index"], function (req, res) {
	res.render("pagini/index", { imagini: verificaImagini(),ip:req.ip });

});


app.get("/galerie", function (req, res) {
	res.render("pagini/galerie", { imagini: verificaImagini() })
});



app.get("/carti", function (req, res) {

	var conditie = req.query.tip ? " where tip_carti='" + req.query.tip + "'" : "";
	client.query("select * from carti" + conditie, function (err, rez) {
		client.query("select unnest(enum_range( null::tipuri_carti)) as categ", function (err, rezCateg) {
			client.query("select unnest(enum_range( null::categ_carti)) as gen", function (err, rezGen) {
				res.render("pagini/carti", { carti: rez.rows, categorii: rezCateg.rows, genuri: rezGen.rows });
			});
		});
	});
});
app.get("/produs/:id_carti", function (req, res) {
	console.log(req.params);

	const rezultat = client.query("select * from carti where id=" + req.params.id_carti, function (err, rez) {
		//console.log(err, rez);
		//console.log(rez.rows);
		res.render("pagini/produs", { prod: rez.rows[0] });
	});


});
app.get("*/galerie.json", function (req, res) { res.render("pagini/403") });
app.get("/*", function (req, res) {
	res.render("pagini" + req.url, function (err, rezultatRandare) {
		if (err) {
			if (err.message.includes("Failed to lookup view")) {
				res.status(404).render("pagini/404");
			}
			else
				throw err;
		}
		else {
			res.send(rezultatRandare);
		}
	});
});

app.listen(8080);
console.log("A pornit serverul.");