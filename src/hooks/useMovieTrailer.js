import { useEffect } from "react";
import { API_GET_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
	const dispatch = useDispatch();
	const trailer = useSelector((store) => store.movies?.trailer);
	const movieVideos = async () => {
		const movieVideosData = await fetch(
			process.env.REACT_APP_SERVER_URL + `/api/trailer/${movieId}`,
			API_GET_OPTIONS
		);
		const jsonData = await movieVideosData.json();
		const filterData = jsonData.results?.filter(
			(video) => video.type === "Trailer"
		);
		const trailer = filterData.length ? filterData[0] : jsonData.results[0];
		dispatch(addTrailerVideo(trailer));
	};
	useEffect(() => {
		!trailer && movieVideos();
	}, []);
};

export default useMovieTrailer;
