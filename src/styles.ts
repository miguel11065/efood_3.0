import { createGlobalStyle } from 'styled-components'

export const cores = {
  indianRed: '#E66767',
  white: '#fff',
  floralWhite: '#FFF8F2',
  antiqueWhite: '#FFEBD9'
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    text-decoration: none;
    list-style: none;
  }

  body {
    background-color: ${cores.floralWhite};
    color: ${cores.indianRed};
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`
