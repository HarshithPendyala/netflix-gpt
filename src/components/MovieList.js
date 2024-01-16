import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({movies,title}) => {
  console.log("from movieList",movies);
  return (
    <div className='text-white'>
        <h1 className='pl-8 font-bold text-2xl py-2 mt-2'>{title}</h1>
      <div className='flex overflow-x-scroll scroll-smooth no-scrollbar'>
        <div className='flex pl-8'>
            {movies?.map((movie) => (
              <MovieCard poster_path={movie.poster_path} key={movie.id} title={movie.title}/>
              ))}
        
        </div>
      </div>
    </div>
  )
}

export default MovieList