import React, { useEffect, useState } from 'react'
import axios from 'api/axios';
import requests from 'api/requests';
import "styles/Banner.css";
import styled from 'styled-components';

function Banner() {
  const [movie,setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(20개 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    console.log("request->",request)

    // 20개 영화중 영화 하나의 ID를 랜덤하게 가져오기
    const movieId = request.data.results[ //request.data.results 에 있는 값을 밑(20줄)에 함수를 사용하여 랜덤으로 가져오는 방법
      Math.floor(Math.random() * request.data.results.length + 0) //0~19
    ].id;

    // 특정 영화의 더 상세한 정보를 가져오기(videos 비디오 정보도 포함)
    //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US&append_to_resoponse=videos
    const {data:
      movieDetail  // 데이터 에다가 movieDetail 이름을 지정해 준 것.
    } = await axios.get(`/movie/${movieId}`,{
      params : {append_to_response : "videos"}
    });
    console.log(":movieDetail->",movieDetail);
      setMovie(movieDetail);
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  } // 옵셔널 체이닝  ? 붙으면 str이라는 값이 있든 없든 error가 뜨지 않는다.  붙어있지 않으면 error가 뜬다.  있든 없든 상관은 없다.

  //https://image.tmdb.org/t/p/w500/kqjL17yufvn90VLyXYpvtyrFfak.jpg
  if(!isClicked){
  return (
    <header className='banner' 
    style={{
    backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, 
    backgroundPosition:"top center", 
    backgroundSize:"cover"}}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button play' onClick={() => setIsClicked(true)}>
            play
          </button>
          <button className='banner__button info'>
            More Information
          </button>
        </div>
        <p className='banner__description'>
          {truncate(movie.overview, 100)}
        </p>
      </div>
      <div className='banner--fadeBottom'></div>
    </header>
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
// 컴포넌트 하나 만들고, 스타일 div 컴포넌트를 하나 만들어서 CSS 처럼 사용한다.
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
export default Banner