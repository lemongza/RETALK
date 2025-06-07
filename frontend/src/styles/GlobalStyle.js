import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* ✅ 웹 폰트 import */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

  /* ✅ BMHanna 폰트 등록 */
  @font-face {
    font-family: 'BMHanna';
    src: url('/assets/fonts/BMHANNA_11yrs.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
  font-family: "Pretendard";
  src: url("./assets/fonts/PretendardVariable.ttf") format("truetype");
  }

  /* ✅ 기본 Reset + 모든 요소에 폰트 적용 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif; /* ✅ 여기에 추가 */
  }

  /* ✅ body에 중복 지정해도 OK */
  body {
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
    color: #000;
  }
`;

export default GlobalStyle;
