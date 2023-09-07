import React, { useEffect, useState, useCallback,useRef } from "react";
import {markText} from './util/mark';
import {SessionStorageManager} from './util/sessionRepo';
import { styled, createGlobalStyle } from "styled-components";
import {onlyKoreanWord} from "./util/iskorean"
import Input from "./components/Input";
import List from "./components/List";
import {HiMagnifyingGlass} from "react-icons/hi2";
function App() {
  const Client=new HttpClient("http://localhost:4000/sick")
  const Session=new SessionStorageManager();
  const nowTime = new Date().getTime();
  const oneMinuteInMillis = 60 * 1000; // 1분을 밀리초로 계산
  const [inputValue, setInputValue] = useState('');
  const [list,setList]=useState([]);
  const [focusIdx, setFocusIdx] = useState(-1);
  function clearExpiredSessionData() {
  
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      // console.log('key: ',key);
      const expireData= JSON.parse(value)['expire'];

      if (expireData) {
        try {
          if (expireData && (expireData + oneMinuteInMillis) <= nowTime) {
            sessionStorage.removeItem(key);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
  }
  

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // useCallback을 사용하여 debounce 함수를 메모이제이션
  const debouncedHandleInputChange = useCallback(
    debounce((value) => {
      if(value.trim()!=='' && onlyKoreanWord(value.trim())){
        const itemValue=Session.getItem(value);
        if(!itemValue){
          console.log('value: ',value)
          Client.fetch(`?q=${value}&_page=1`).then(res=>res.json()).then(json=>{
          setList((pre)=>[...json]);
          console.info("calling api");
          const sickNmArray = [...json].map(obj => obj.sickNm);
          Session.setItem(value,{value:sickNmArray,expire: nowTime + oneMinuteInMillis});
          setFocusIdx(-1); //검색어 변동시 foucusidx 초기화
      }).catch(err=>console.log(err));
        }
        else{
          console.log('get from session');
          setList(itemValue.value);
        }
      }
      }, 1000),
    []
  );

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    debouncedHandleInputChange(event.target.value);
  };

  function handleKeyArrow(e) {
    if (list.length > 0) {
      switch (e.key) {
        case 'ArrowDown': // 키보드 아래 키
          setFocusIdx(focusIdx+1);
          if (list.length === focusIdx + 1) {setFocusIdx(0);}

          break;
        case 'ArrowUp': // 키보드 위쪽 키
          setFocusIdx(focusIdx - 1);
          if (focusIdx <= 0) {
            setFocusIdx(list.length-1);
          }
          break;
        case 'Escape': // ESC 키를 눌렀을 때
          setInputValue('');
          setFocusIdx(-1);
          break;
        default:
          break;
      }
    }
  }
  useEffect(()=>{
    console.log('render');
    clearExpiredSessionData();
    // console.log(inputValue);
  }
  ,[list,inputValue,debouncedHandleInputChange])
  return (<Layout>
    <Wrapper>
      <h2>국내 모든 임상실험 검색하고<br/> 온라인으로 참여하기</h2>
    </Wrapper>
    <div>
      <Input onKeyDown={handleKeyArrow} onChange={handleInputChange}></Input>
    </div>
    {inputValue.length!==0?<List>
    {list.length===0?<span>검색어가 없습니다</span>:  <UnionList>추천검색어
        {list.map((item, index) => {
          return <Listtype key={index} focus={focusIdx === index?"true":"false"}><HiMagnifyingGlass/>{markText(`${item.sickNm?item.sickNm:item}`,inputValue)}</Listtype>
        })}</UnionList>}
    </List>:<></>}
  
  </Layout>);
}

export default App;

class HttpClient{
  #baseURL;
  constructor(baseURL){
    this.#baseURL=baseURL;
  };

  fetch(endPoint, option={}){
    return window.fetch(this.#baseURL+endPoint,{
      ...option,
      headers:{

      }
    });
  }
}

const Layout=styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 700px;
  height: 1000px;
  background-color:#cae9ffff;
`

const Wrapper=styled.div`
  margin: 0 auto;
  // width: 700px;
  background-color:#cae9ffff;
  > h2 {
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.6;
  }
`
const Listtype=styled.li`
  list-style-type: none;
  display:flex;
  flex-direction :row;
  gap:10px;
  margin: 10px 5px;
  vertical-align: middle; /* 텍스트와 아이콘이 수직으로 정렬 */
  padding:10px;
  border: ${(props) => props.focus==='true'? '1px solid':'none'};
`
const UnionList=styled.ul`
  paddding:10px 0 0 0;
`

