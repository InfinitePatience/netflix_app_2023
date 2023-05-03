import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "styles/Nav.css";
import MypageModal from './MypageModal';

function Nav() {

  const [myModal, setMyModal] = useState(false);
  const [attachment, setAttachment] = useState("");

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setShow(true);
      }else{
        setShow(false);
      }
    });
    return () => { // 컴포넌트를 사용하지 않을 때 지워주겠다는 뜻
      window.removeEventListener("scroll", () => {});
    }
  },[]);

  const onChange = (e) => {
    setSearchValue(e.target.value); 
    navigate(`/search?q=${e.target.value}`);  // q - query
  }

  const toggleEditing = () => setMyModal((prev) => !prev);

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='Netflix' className='nav__logo' 
      onClick={() => {window.location.href= "/netflix_app_2023/"}}/>

      <input type='search' placeholder='영화를 검색해주세요' className='nav__input' 
      onChange={onChange}  value={searchValue} />
    <div onClick={toggleEditing}>
      <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41' alt='User logged' className='nav__avatar' />
    </div>
    {myModal && (
      <MypageModal setMyModal={setMyModal}/>
    )}
    </nav>
  )
}

export default Nav

// 위치 23  -  JS : reload 누를 때마다 새로고침이 된다.