import React from "react";
import { IMG_CDN_PATH } from "../utils/constants";
import { Breathing, Image } from "react-shimmer";
import { setModal, setMovieInfo } from "../utils/configSlice";
import { useDispatch } from "react-redux";
import { API_GET_OPTIONS } from "../utils/constants";

const MovieCard = ({ poster_path, title, movieId }) => {
	const dispatch = useDispatch();
	const getMovieInfo = async () => {
		const info = await fetch(
			process.env.REACT_APP_SERVER_URL + `/api/getMovieInfo/${movieId}`,
			API_GET_OPTIONS
		);
		const jsonInfo = await info.json();
		dispatch(setMovieInfo(jsonInfo));
	};

	const handleOnClick = () => {
		dispatch(setModal(true));
		getMovieInfo();
	};
	if (poster_path == null) return;
	return (
		<>
			<div
				className="w-32 md:w-44 mr-4 hover:cursor-pointer"
				onClick={handleOnClick}
			>
				<Image
					alt={title}
					src={IMG_CDN_PATH + poster_path}
					fallback={<Breathing width={176} height={264}></Breathing>}
					fadeIn={true}
				/>
			</div>
		</>
	);
};

export default MovieCard;
