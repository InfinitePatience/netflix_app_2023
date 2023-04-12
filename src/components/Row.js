import axios from 'api/axios';
import React, { useEffect, useState } from 'react';
import "styles/Row.css";
import MovieModal from './MovieModal';

function Row({isLargeRow, title, id, fetchUrl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});  //영화 정보의 해당되는 객체

  useEffect(() => {
    fetchMovieData();
  },[fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log('request->', request)
  }

  const handleClick = (movie) => {
    console.log('나는 영화다->',movie)
    setModalOpen(true);
    setMovieSelected(movie); // 영화정보가 들어간다.
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow left'>
          <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft -= (window.innerWidth - 80);}}>
           {"<"}
          </span>
        </div>
        <div id={id} className='row__posters'>
         {movies.map((movie) => (
          <img
          key={movie.id}
          onClick={() => handleClick(movie)}
          className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
          loading='lazy'
          alt={movie.title || movie.name || movie.original_name}
          />
         ))}
        </div>
        <div className='slider__arrow right'>
          <span className='arrow' onClick={() => {document.getElementById(id).scrollLeft += (window.innerWidth - 80);}}>
            {">"}
          </span>
        </div>
      </div>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  )
}

export default Row