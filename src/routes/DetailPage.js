import requests from 'api/requests';
import axios from 'api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import "styles/detailpage.css"

function DetailPage() {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  let {movieId} = useParams();
  console.log('useParams()->', useParams());
  console.log("movieId->", movieId);

  useEffect(() => {
    fetchData();
  }, [movieId]); // [] <- 여기에 아무것도 없을경우, 값이 하나만 찍힌다. 아이디 값이 바뀔때 마다 새로 불러 와야 한다.

  const fetchData = async () => {
    const request = await axios.get(`/movie/${movieId}`);
    console.log("request->", request);
    setMovie(request.data);
  };
  
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  if(!movie) return <div>...loading</div>;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  
  if(!isClicked){
  return (
    <section>
      <img className='modal__poster-img'
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      alt={movie.title || movie.name || movie.original_name} />
      <div className='detailpage__contents'>
        <h1 className='detailpage__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <p className='detailpage__description'>
          {truncate(movie.overview, 100)}
        </p>
        <button className='banner__button play' onClick={() => setIsClicked(true)}>
            play
        </button>
      </div>
    </section>
  )
}else{
  return (
    <Container>
      <HomeContainer>
        <Iframe
        src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}
        ?controls=0&autoplay=1%loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
        width='640'
        height='360'
        frameBorder='0'
        allow='autoplay; fullscreen'
        ></Iframe>
      </HomeContainer>
    </Container>
    )
  }
}

const Container = styled.div`  
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;
`;

const HomeContainer = styled.div`
  width:100%;
  height:100%;
`;

const Iframe = styled.iframe`
  width:100%;
  height:100%;
  z-index:-1;
  opacity:0.8;
  border:none;
  &::after{
    content:"";
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
`

export default DetailPage