import React from 'react';
import { styled} from "styled-components";
export function markText(text, targetWord) {
  // 대소문자를 무시하고 대상 단어를 찾습니다.
  const regex = new RegExp(targetWord, 'gi');

  // 대상 단어를 기준으로 텍스트를 분할합니다.
  const parts = text.split(regex);

  // 분할된 텍스트를 <span>으로 감싸서 볼드 처리합니다.
  const boldedText = parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 ? <Strong>{targetWord}</Strong> : null}
      {part}
    </React.Fragment>
  ));
  return (
    <div>
      {boldedText}
    </div>
  );
}

const Strong=styled.strong`
  font-weight: bold;
`