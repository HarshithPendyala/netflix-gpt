import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
	const movies = useSelector((store) => store.movies);
	return (
		<>
			{movies && (
				<div className="bg-black w-screen px-6 md:px-0 py-6">
					<div className="-mt-2 lg:-mt-72 relative z-10 md:mr-6">
						<MovieList
							title="Now Playing Movies"
							movies={movies.nowPlayingMovies}
						/>
						<MovieList
							title="Top Rated Movies"
							movies={movies.topRatedMovies}
						/>
						<MovieList title="Popular Movies" movies={movies.popularMovies} />
						<MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
					</div>
				</div>
			)}
		</>
	);
};

export default SecondaryContainer;
