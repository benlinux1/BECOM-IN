import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../hooks'
import colors from '../style/colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
    a {
      text-decoration: none;
    }
    body {
        background-color: ${(props) =>
          props.isDarkMode ? '#2F2E41' : colors.backgroundLight};
        margin: 0;
    }
`

function GlobalStyle() {
  const { theme } = useTheme()

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle