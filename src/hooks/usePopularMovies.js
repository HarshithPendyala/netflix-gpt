import { useDispatch, useSelector } from "react-redux";
import { API_GET_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = async () => {
	const dispatch = useDispatch();
	const popularMovies = useSelector((store) => store.movies?.popularMovies);
	const getPopularMovies = async () => {
		const data = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/popularMovies`,
			API_GET_OPTIONS
		);
		const jsonData = await data.json();
		dispatch(addPopularMovies(jsonData.results));
	};

	useEffect(() => {
		!popularMovies && getPopularMovies();
	}, []);
};

export default usePopularMovies;
