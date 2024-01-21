import React from "react";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openAI";
import { API_GET_OPTIONS } from "../utils/constants";
import { addResults } from "../utils/gptSearchSlice";

const GptSearchBar = () => {
	const langValue = useSelector((store) => store.config.lang);
	const searchRef = useRef(null);
	const dispatch = useDispatch();

	const handleGptSearchClick = async () => {
		dispatch(addResults({ gptMovies: null, tmdbMovies: null }));

		const gptQuery =
			"Act like a movie recommendation system. Sugges me 5 movies, comma seperated for this query:" +
			searchRef.current.value +
			" Example Result: The Avengers, The Batman, Herapheri, John Wick, Bullet Train";

		const chatCompletion = await openai.chat.completions.create({
			messages: [{ role: "user", content: gptQuery }],
			model: "gpt-3.5-turbo",
		});
		const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(", ");
		const promiseArray = gptMovies.map((movie) => getRecommendedMovies(movie));
		const recommendedMovies = await Promise.all(promiseArray);
		const filterData = recommendedMovies.map((rc, index) =>
			rc.results?.filter((movie) => movie.original_title == gptMovies[index])
		);
		dispatch(
			addResults({ gptMovies: gptMovies, tmdbMovies: recommendedMovies })
		);
	};

	const getRecommendedMovies = async (movie) => {
		const data = await fetch(
			"https://api.themoviedb.org/3/search/movie?query=" +
				movie +
				"&include_adult=false&language=en-US&page=1",
			API_GET_OPTIONS
		);

		const jsonData = await data.json();
		return jsonData;
	};

	return (
		<div className="pt-[50%] md:pt-[10%] flex justify-center">
			<form
				className=" grid grid-cols-12 w-full md:w-1/2 mx-2"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					className="p-2 m-2 rounded-lg col-span-9"
					type="text"
					ref={searchRef}
					placeholder={lang[langValue].placeholder}
				/>
				<button
					className="p-2 m-2 rounded-lg bg-purple-600 text-white col-span-3"
					onClick={handleGptSearchClick}
				>
					{lang[langValue].button}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
