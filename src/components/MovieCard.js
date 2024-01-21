import React from "react";
import { IMG_CDN_PATH } from "../utils/constants";
import { Breathing, Image, Shimmer } from "react-shimmer";

const MovieCard = ({ poster_path, title }) => {
	if (poster_path == null) return;
	return (
		<div className="w-32 md:w-44 mr-4">
			<Image
				alt={title}
				src={IMG_CDN_PATH + poster_path}
				fallback={<Breathing width={176} height={264}></Breathing>}
				fadeIn={true}
			/>
		</div>
	);
};

export default MovieCard;
