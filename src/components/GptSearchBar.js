import React, { useState } from "react";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openAI";
import { API_GET_OPTIONS } from "../utils/constants";
import { addResults } from "../utils/gptSearchSlice";

const GptSearchBar = () => {
	const [loading, setLoading] = useState(false);
	const langValue = useSelector((store) => store.config.lang);
	const searchRef = useRef(null);
	const dispatch = useDispatch();

	const handleGptSearchClick = async () => {
		dispatch(addResults({ gptMovies: null, tmdbMovies: null }));
		setLoading(true);

		const url = "http://localhost:8080/gptSearch/" + searchRef.current.value;
		const openAIResults = await fetch(url, API_GET_OPTIONS);
		const jsonResults = await openAIResults.json();
		const gptMovies = jsonResults.choices?.[0]?.message?.content.split("~");
		const promiseArray = gptMovies.map((movie) => getRecommendedMovies(movie));
		const recommendedMovies = await Promise.all(promiseArray);
		setLoading(false);

		dispatch(
			addResults({ gptMovies: gptMovies, tmdbMovies: recommendedMovies })
		);
	};

	const getRecommendedMovies = async (movie) => {
		const data = await fetch(
			"http://localhost:8080/gptMovies/" + movie,

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
					className="p-2 m-2 rounded-lg bg-purple-600 text-white col-span-3 font-bold"
					onClick={handleGptSearchClick}
				>
					{loading ? <i>Loading....</i> : lang[langValue].button}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
