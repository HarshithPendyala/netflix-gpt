import React from 'react'

const VideoTitle = ({title, overview}) => {
 
  return (
    <div className='absolute text-white w-screen aspect-video bg-gradient-to-r from-black'>
      <div className='pt-96 pl-16'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='w-1/4 my-2 mt-2'>{overview}</p>
        <button className='mt-2 bg-white text-black px-8 py-1 font-semibold text-lg rounded-md hover:bg-opacity-80'>▷ Play</button>
        <button className='px-8 py-1 ml-2 bg-gray-500 rounded-md text-lg hover:bg-opacity-80'> ⓘ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle