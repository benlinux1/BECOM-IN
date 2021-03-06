import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DefaultPicture from '../../assets/profile.png'
import { useTheme } from '../../utils/hooks'

// Stylisation des Eléments
const CardTitle = styled.h2`
color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  align-self: center;
  margin: 0px auto;
`

const CardImage = styled.img`
  height: 100px;
  width: 100px;
  align-self: center;
  border-radius: 20px;
  object-fit: cover top;
  margin-top: 25px;
`

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  margin: auto;
  padding: 0 20px;
`

const CardSkills = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? 'white' : colors.backgroundDark};
  border-radius: 30px;
  min-width: 200px;
  max-width: 280px;
  min-height: 250px;
  transition: all 200ms;
  box-shadow: ${({ theme }) =>
    theme === 'light' ? '1px 1px 6px #e2e3e9' : 'none'}; 
  &:hover {
    box-shadow: ${({ theme }) =>
    theme === 'light' ? '4px 4px 16px LightSteelBlue' : '2px 2px 10px #e2e3e9'}; 
  }
`

function PortfolioCard({ label, title, picture, skills }) {
  const { theme } = useTheme()
 

  return (
    <CardWrapper theme={theme}>
      <CardTitle theme={theme}>
       {title}
      </CardTitle>
      <CardImage src={picture} alt="prestation" />
      <CardLabel theme={theme}>{label}</CardLabel>
      <CardSkills theme={theme}>{skills}</CardSkills>
    </CardWrapper>
  )
}

// Typage des données
PortfolioCard.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  skills: PropTypes.array,
}

// Nommage par défaut des données
PortfolioCard.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
  skills: [],
}

export default PortfolioCard