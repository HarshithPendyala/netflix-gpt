import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setMovieInfo } from "../utils/configSlice";
import { IMG_CDN_PATH } from "../utils/constants";
import { Image, Breathing } from "react-shimmer";
const MovieInfo = () => {
	const { modal, movieInfo } = useSelector((store) => store.config);
	const dispatch = useDispatch();
	const handleOnClick = () => {
		dispatch(setModal(false));
		dispatch(setMovieInfo(null));
	};

	return (
		modal && (
			<div
				className="z-10 fixed inset-0  flex justify-center items-center bg-gray-900 
        bg-opacity-40 backdrop-blur-sm"
			>
				<div className="bg-stone-900 text-slate-200 p-2 lg:p-2 max-w-xl max-h-[450px] md:max-h-[400px] lg:max-w-4xl lg:max-h-[850px] flex flex-col absolute overflow-y-scroll overscroll-none">
					<p
						onClick={handleOnClick}
						className="absolute right-6 my-2 hover:cursor-pointer z-10 font-bold text-white text-2xl"
					>
						X
					</p>

					<img
						className=" w-[440px] h-[250px] md:w-[650px] md:h-[355px] lg:w-[880px] lg:h-[495px] brightness-50"
						src={IMG_CDN_PATH + movieInfo?.backdrop_path}
						alt="movie_backdrop"
					/>
					<div className="bg-gradient-to-t from-black px-6 lg:px-12 -mt-14 z-10">
						<h1 className="text-2xl lg:text-4xl font-bold py-2">
							{movieInfo?.title}
						</h1>
						<div className="flex">
							<p className="my-2 mx-2 bg-gray-800 text-gray-400 font-bold text-xl rounded-md w-fit p-2 h-10">
								{movieInfo?.release_date?.slice(0, 4)}
							</p>
							<p className="bg-gray-800 text-gray-400 font-bold text-xl rounded-md w-fit p-2 h-10 my-2 mx-2">
								{movieInfo?.runtime} mins
							</p>
							<p className="bg-gray-800 text-gray-400 font-bold text-xl rounded-md w-fit p-2 h-10 my-2 mx-2">
								HD
							</p>
							<p className="bg-gray-800 text-gray-400 font-bold text-xl rounded-md w-fit p-2 h-10 my-2 mx-2">
								5.1
							</p>
						</div>
						<p className="text-xl font-semibold py-4 italic text-gray-400">
							{movieInfo?.overview}
						</p>
					</div>
				</div>
			</div>
		)
	);
};

export default MovieInfo;
