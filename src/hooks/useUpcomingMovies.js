import { useEffect } from "react";
import { API_GET_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useUpcomingMovies = () => {
	const dispatch = useDispatch();
	const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
	const getUpcomingMovies = async () => {
		const data = await fetch(
			`${process.env.REACT_APP_SERVER_URL}/api/upComingMovies`,
			API_GET_OPTIONS
		);
		const jsonData = await data.json();
		dispatch(addUpcomingMovies(jsonData.results));
	};

	useEffect(() => {
		!upcomingMovies && getUpcomingMovies();
	}, []);
};

export default useUpcomingMovies;
