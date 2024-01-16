import { useDispatch } from "react-redux";
import { API_GET_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const usePopularMovies = async() =>{
    const dispatch = useDispatch();
    const getPopularMovies = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=2",API_GET_OPTIONS);
        const jsonData = await data.json();
        dispatch(addPopularMovies(jsonData.results));
    }

    useEffect(()=>{
        getPopularMovies();
    },[])
}

export default usePopularMovies;