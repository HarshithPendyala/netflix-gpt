import { useDispatch, useSelector } from "react-redux";
import { API_GET_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
	const dispatch = useDispatch();
	const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
	const getTopRatedMovies = async () => {
		const data = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/topRatedMovies`,
			API_GET_OPTIONS
		);
		const jsonData = await data.json();
		dispatch(addTopRatedMovies(jsonData.results));
	};

	useEffect(() => {
		!topRatedMovies && getTopRatedMovies();
	}, []);
};

export default useTopRatedMovies;
