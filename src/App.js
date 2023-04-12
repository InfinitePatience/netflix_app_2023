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
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          {/* 여기에 프로필 페이지 만들기 */}
        </Route>
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
