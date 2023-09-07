import React, { Children } from "react";
import { styled } from "styled-components";
function List ({children}) {
  return (
    <ListContainer>
      {children}
    </ListContainer>
  );
}

export default List;

const ListContainer=styled.div`
  width:490px;
  display:flex;
  height:600px;
  background-color:white;
  margin: 0 auto;
  padding:10px;
  border-radius:25px;
  box-sizing: border-box;
  > li {
    list-style-type: none;
  }
`
