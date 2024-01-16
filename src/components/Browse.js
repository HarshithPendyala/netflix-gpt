import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTSearch";

const Browse = () => {
	useNowPlayingMovies();
	usePopularMovies();
	useTopRatedMovies();
	useUpcomingMovies();
	const showGptSearch = useSelector((store) => store.gptSearch.showGptSearch);
	return (
		<>
			<Header />
			{showGptSearch ? (
				<GPTSearch />
			) : (
				<>
					<MainContainer />
					<SecondaryContainer />
				</>
			)}
		</>
	);
};

export default Browse;
