import { useEffect } from "react";
import { API_GET_OPTIONS } from "../utils/constants"
import { addUpcomingMovies } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const getUpcomingMovies = async() => {
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",API_GET_OPTIONS);
        const jsonData = await data.json();
        dispatch(addUpcomingMovies(jsonData.results));
    }

    useEffect(()=>{
        getUpcomingMovies();
    },[])
    
}

export default useUpcomingMovies;