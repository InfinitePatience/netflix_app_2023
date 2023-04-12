import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "styles/SearchPage.css"
import useDebounce from 'hooks/useDebounce';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigete = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search); // 
  }
  console.log("useLocation()->", useLocation());

  let query = useQuery();  // ?q=spidman 가 저장되어 있는 상태

  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500); // useDebounce 를 통해 변수에 spiderman 이라는 글자가 한꺼번에 들어오게 된다.
  console.log('searchTerm ->', searchTerm); // spiderman
  console.log('debounceSearchTerm->', debounceSearchTerm); //spiderman

  useEffect(() => { // 검색어를 입력 할 때마다 계속 내용이 뜨기 때문에 성능저하가 일어날 수 있다. 따라서 hook 함수를 만들어서 성능을 올린다.
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try{
      //https://api.themoviedb.org/3/search/movie?&query=
      const request = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      console.log('request',request)
      setSearchResults(request.data.results);

    } catch (error) {
      console.log("error", error)
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                return ( //포스터 이미지
                  <div className='movie'>
                    <div clasName='movie__column-poster' onClick={() => navigete(`/${movie.id}`)}>
                      <img src={movieImageUrl} alt={movie.title} classname='movie__poster' />
                    </div>
                  </div>
                )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }
  return renderSearchResults();
}
export default SearchPage