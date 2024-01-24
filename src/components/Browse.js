import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTSearch";
import MovieInfo from "./MovieInfo";

const Browse = () => {
	useNowPlayingMovies();
	usePopularMovies();
	useTopRatedMovies();
	useUpcomingMovies();
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	return (
		<>
			<Header />
			{showGptSearch ? (
				<>
					<GPTSearch />
					<MovieInfo />
				</>
			) : (
				<>
					<MainContainer />
					<SecondaryContainer />
					<MovieInfo />
				</>
			)}
		</>
	);
};

export default Browse;
