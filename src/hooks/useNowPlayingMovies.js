import { API_GET_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';
import { useEffect } from 'react'

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async() => {
      const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_GET_OPTIONS);
      const jsonData = await data.json();
      //console.log(jsonData.results);
      dispatch(addNowPlayingMovies(jsonData.results));
    }
  
    useEffect(() => {
      getNowPlayingMovies();
    },[]);
}

export default useNowPlayingMovies;