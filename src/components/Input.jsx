import React from "react";
import { styled } from "styled-components";

import {HiMagnifyingGlass} from "react-icons/hi2";

function Input(props) {
  const iconStyle = {
    fontSize: '20px', // 아이콘의 크기 설정
    color: 'white',   // 아이콘의 색상 설정
  };
  return (
    <InputContainer>
    <label htmlFor="Input"></label>
      <ElInput onKeyDown={props.onKeyDown} id="Input" placeholder={`질환명을 입력해주세요`} onChange={props.onChange}></ElInput>
      <Button><HiMagnifyingGlass style={iconStyle}/></Button>
    </InputContainer>
  );
}

export default Input;

const InputContainer=styled.div`
  width:490px;
  display:flex;
  margin: 20px auto;
  background-color:white;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;

`
const ElInput=styled.input`
  flex:1;
  border: none;
  outline: none;
`

const Button= styled.button`
  width:35px;
  height:35px;
  border-radius : 20px;
  background-color:#007be9ff;
  border:transparent;
`