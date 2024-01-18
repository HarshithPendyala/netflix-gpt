import React from "react";
import { IMG_CDN_PATH } from "../utils/constants";

const MovieCard = ({ poster_path, title }) => {
	if (poster_path == null) return;
	return (
		<div className="w-44 mr-4">
			<img alt={title} src={IMG_CDN_PATH + poster_path} />
		</div>
	);
};

export default MovieCard;
