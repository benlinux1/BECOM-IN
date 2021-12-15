import styled from 'styled-components'
import { Loader } from '../../utils/style/Atoms'
import colors from '../../utils/style/colors'
import { useFetch, useTheme } from '../../utils/hooks'
 
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EntityContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`

const FooterTitle = styled.h4`
  margin-top: 0px;
`

const Entity = styled.article`
  text-align: center;
  padding: 30px 30px;
  border-radius: 25px;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  box-shadow: ${({ theme }) =>
    theme === 'light' ? '1px 1px 6px #e2e3e9' : 'none'}; 
  transition: all 200ms;
  @media screen and (min-width : 540px) {
    padding: 30px 150px;
  }
`

const LegalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  @media screen and (min-width: 810px) {
    flex-direction: row;
  }
`

const FooterLink = styled.a`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  padding: 0px 35px;
  position: initial;
  text-align: center;
  margin: 10px auto;
  transition: all 100ms;
  @media screen and (min-width: 810px) {
    position: relative;
    right: 20px;
    margin: auto;
  }
  &:hover {
    text-shadow: 1px 0 0 ${({ theme }) => (theme === 'light' ? '#8186A0' : '#ffffff')};
    transform: scale(1.04);
  }
`

const Bar = styled.hr`
  width: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
`
 
const NightModeButton = styled.button`
  background: linear-gradient(275deg, rgb(0, 206, 209), GreenYellow);
  cursor: pointer;
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px;
  border-width: 0px;
  min-width: 200px;
  max-width: 250px;
  margin-top: 20px;
  &:hover {
    box-shadow: 2px 2px 6px ${({ theme }) => (theme === 'light' ? 'Turquoise' : '#e2e3e9' )};
    transition: all 200ms;
  }
`

const Copyright = styled.section`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  margin-top: 30px;
  text-align: center;
`
 
function Footer() {
  const { toggleTheme, theme } = useTheme()

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/entity`
  )

  const contactInformations = data?.contactInformations

  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <FooterContainer>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <EntityContainer>
          {contactInformations?.map((contact) => (
            <Entity theme={theme} key={`card-${contact.id}`}>
              <FooterTitle>Comment nous contacter ?</FooterTitle>
              <Bar></Bar>
              <h4>{contact.name.toUpperCase()}</h4>
              <p>{contact.adress}</p>
              <p>{contact.CP} {contact.city}</p>
              <p className='phone-number'>{contact.phone1}</p>
              <p className='email'>{contact.email}</p>
            </Entity>
          ))}
        </EntityContainer>
      )}
      <LegalContainer>
        <FooterLink theme={theme} href='/'>Conditions générales de vente</FooterLink>
        <FooterLink theme={theme} href='/'>Mentions légales</FooterLink>
        <FooterLink theme={theme} href='/'>Politique de confidentialité</FooterLink>
      </LegalContainer>
      <NightModeButton theme={theme} onClick={() => toggleTheme()}>
          Changer de thème : {theme === 'light' ? '☀️' : '🌛'} 
      </NightModeButton>

      {contactInformations?.map((contact) => (
        <Copyright key={`copyright-${contact.id}`} theme={theme}> © {contact.name.toUpperCase()} - Tous droits réservés - 2021</Copyright>
      ))}
      
    </FooterContainer>
  )
}
export default Footer