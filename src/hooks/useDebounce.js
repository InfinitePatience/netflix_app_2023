import React, { useEffect, useState } from 'react'

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  //hook 함수는 어느 시점에 끼어들어 실행되는 함수
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
  

  return () => { // 더 이상 실행 안될 때 return문을 실행
    clearTimeout(handler);
  }

},[value, delay]);


  return debounceValue; //바뀐 debounceValue 값을 내보낸다.
}

export default useDebounce