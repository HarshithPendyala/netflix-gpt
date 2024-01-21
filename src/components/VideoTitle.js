import React from "react";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="absolute text-white w-screen aspect-video bg-gradient-to-r from-black">
			<div className="pt-28 md:pt-64 lg:pt-96 pl-4 lg:pl-16">
				<h1 className="text-lg md:text-2xl lg:text-4xl font-bold">{title}</h1>
				<p className="hidden lg:block w-1/4 my-2 mt-2">{overview}</p>
				<button className="mt-2 bg-white text-black px-8 py-1 font-semibold text-sm lg:text-lg rounded-md hover:bg-opacity-80">
					▷ Play
				</button>
				<button className="hidden lg:inline-block px-8 py-1 ml-2 bg-gray-500 rounded-md text-lg hover:bg-opacity-80">
					{" "}
					ⓘ More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
