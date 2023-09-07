export function onlyKoreanWord(str) {
  // 정규 표현식을 사용하여 문자열이 한글 초성, 중성, 종성, 공백 문자 외의 문자를 포함하는지 확인
  const regex = /^[가-힣\s]*$/;
  return regex.test(str);
}