import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
  --black-blue: #04141C;
  --dark-blue: #001e2b;
  --dark-light-blue: #003045;
  --neutral: #575757;
  --light: #828282;
  --white: #ffffff;
  --error-hover: #9d1919;
  --error: #d83060;
  --warning: #ffc010;
  --info-hover: #00357b;
  --info: #015bf8;
  --primary: #00ed64;
  --primary-dark: #00684a;
  --habit-hover: var(--info);
  --habit-active: var(--info-hover);
}

[data-theme="light"] {
  /* Backgrounds */
  --black-blue: #dce3ed;        /* sidebar — cinza azulado médio */
  --dark-blue: #e8edf5;         /* background das páginas */
  --dark-light-blue: #b0bdd0;   /* dias do calendário — cinza azulado visível */

  /* Textos */
  --white: #1e3a5f;             /* textos principais */
  --light: #4a6080;             /* textos secundários */
  --neutral: #7a8fa6;           /* ícone de tema */

  /* Ações */
  --habit-hover: #e2e8f0;
  --habit-active: #cbd5e1;
  --info: #015bf8;
  --info-hover: #00357b;
  --error: #d83060;
  --error-hover: #9d1919;
  --warning: #ffc010;
  --primary: #00ed64;
  --primary-dark: #00684a;
}

  *{
    box-sizing: border-box;
    margin: 0;
    border: 0;
    padding: 0;
    font-family: "Lexend", sans-serif;

  }

  button {
    cursor: pointer;
  }

  `;
