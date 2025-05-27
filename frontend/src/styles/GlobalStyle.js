// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

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

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`;

export default GlobalStyle;