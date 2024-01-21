//express, cors, axiom, dotenv, nodemon
const PORT = 8080;

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.listen(8080, () => {
	console.log("Sever is running at ", PORT);
});

app.get("/nowPlayingMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + `${process.env.REACT_APP_TMDB_KEY}`,
		},
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});

app.get("/popularMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + `${process.env.REACT_APP_TMDB_KEY}`,
		},
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});
app.get("/topRatedMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + `${process.env.REACT_APP_TMDB_KEY}`,
		},
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});
app.get("/upComingMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + `${process.env.REACT_APP_TMDB_KEY}`,
		},
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});
