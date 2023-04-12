import React, { useEffect } from 'react'

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    console.log('ref->',ref); 

    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)){
        console.log('event.target->',event.target)
        // 모달창이 안 닫히는 경우, 그럴 땐 함수를 끝내겠다라는 내용
        return; //함수 종료
      }
        // 모달창이 닫히는 경우 (event) => {setModalOpen(false)}  <- 파라미터로 전달받은 함수.
        handler(event);
    }
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener);
  },[ref,handler]);

  return (
    <div>useOnClickOutside</div>
  )
}

export default useOnClickOutside