import requests from "api/requests";
import Nav from "components/Nav";
import Banner from "components/Banner";
import Row from "components/Row";
import Footer from "components/Footer";
import "styles/App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import MainPage from "routes/MainPage";
import DetailPage from "routes/DetailPage";
import SearchPage from "routes/SearchPage";
import { useEffect, useState } from "react";
import { authService } from './fbase';
import { onAuthStateChanged } from "firebase/auth";
import Auth from "routes/Auth";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faGoogle, faGithub );
// import ChattingList from './components/ChattingList';

// 중첩라우팅(Nested Routes)
// 부모에서 Outlet 을 쓰면 그 Outlet 자리에 자식 Route 들이 렌더링 된다.
// 자식 경로 요소를 렌더링 하려면 부모경로 요소에서 Outlet 을 사용

// index => localhost:3000/  -  index는 홈이랑 같다.

const Layout = () => { 
  return(
    <div>
      <Nav />  
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log('authService.currentUser ->',authService.currentUser) // currnetUser 현재 로그인한 사람 확인하는 함수 null(false)

  const [userObj, setUserObj] = useState(null);

  useEffect(() => { // 컴포넌트가 렌더링 될 때 딱 한번 실행되는 함수 ( [] <- 이곳에 아무것도 없을경우 ) componentDidMount 시점
    onAuthStateChanged(authService, (user) => {// 로그인한 사용자의 정보를 가져오는 함수
      console.log('user->',user);
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
      }
    });
  },[]);


  return (
    <div className="app">
      <Routes>
        {isLoggedIn ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          {/* 여기에 프로필 페이지 만들기 */}
        </Route>
        ) : (
          <Route path='/' element={<Auth />} />
        )}
      </Routes>

      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Science Fiction" id="SM" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction} />
      <Footer /> */}
    </div>
  );
}

export default App;
