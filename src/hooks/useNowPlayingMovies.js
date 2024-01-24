import { API_GET_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
	const dispatch = useDispatch();
	const nowPlayingMovies = useSelector(
		(store) => store.movies?.nowPlayingMovies
	);
	const url = `${process.env.REACT_APP_SERVER_URL}/api/nowPlayingMovies`;
	console.log("nowPlaying Movies URL: ", url);
	const getNowPlayingMovies = async () => {
		const data = await fetch(
			`${process.env.REACT_APP_SERVER_URL}` + "/api/nowPlayingMovies",
			API_GET_OPTIONS
		);
		const jsonData = await data.json();
		dispatch(addNowPlayingMovies(jsonData.results));
	};

	useEffect(() => {
		!nowPlayingMovies && getNowPlayingMovies();
	}, []);
};

export default useNowPlayingMovies;
