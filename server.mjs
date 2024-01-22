//express, cors, axiom, dotenv, nodemon
const PORT = 8080;

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.listen(8080, () => {
	console.log("Sever is running at ", PORT);
});

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: "Bearer " + `${process.env.REACT_APP_TMDB_KEY}`,
	},
};

app.get("/trailer/:query", (req, res) => {
	const url = `https://api.themoviedb.org/3/movie/${req.params.query}/videos?language=en-US`;

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => {
			res.send(json);
		})
		.catch((err) => console.error("error:" + err));
});
app.get("/nowPlayingMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});

app.get("/popularMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2";

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});
app.get("/topRatedMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});
app.get("/upComingMovies", (req, res) => {
	const url =
		"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
	fetch(url, options)
		.then((response) => response.json())
		.then((json) => res.send(json))
		.catch((err) => console.error("error:" + err));
});

//OPEN AI Integration and calls
const openai = new OpenAI({
	apiKey: process.env.REACT_APP_OPENAPI_KEY,
});

app.get("/gptSearch/:query", async (req, res) => {
	const gptQuery =
		"Act like a movie recommendation system. Suggest me 5 movies for this query:" +
		req.params.query +
		"give me results in tilde(~) separated values, example: Rocky~Mission Impossible:2~Crazy,Stupid,Love~Predator~Kind Kong";

	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: "user", content: gptQuery }],
		model: "gpt-3.5-turbo",
	});
	res.send(chatCompletion);
});
