import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledLink } from '../../utils/style/Atoms'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'
import Card from '../../components/Card'
import '../../css/styles.css'

const HomeWrapper = styled.section`
  margin: auto;
  max-width: 1400px;
`

const HomeContainer = styled.section`
  margin: auto;
  text-align: center;
`

const StyledText = styled.p`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  padding: 0px 60px;
`

const StyledTitle = styled.h2`
  line-height: 50px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const CardsContainer = styled.section`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: 50px 25px;
  flex-wrap: wrap;
  animation: apparition-prog 800ms linear 400ms both;
  transition: all 400ms;
  @media screen and (min-width: 811px){
    gap: 80px;
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const TestContainer = styled.section`
  margin: auto;
  text-align: center;
  max-width: 1400px;
  ${StyledLink} {
    max-width: 250px;
    min-width: 120px;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    transition: all 200ms;
    &:hover {
      box-shadow: 2px 2px 10px  ${({ theme }) => (theme === 'light' ? 'Turquoise' : '#ffffff' )};
    }
  }
`

function Home() {
  const { theme } = useTheme()

  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/prestations`
  )

  const prestationsList = data?.prestationsList

  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <HomeWrapper>
      <HomeContainer theme={theme}>
        <StyledTitle theme={theme}>
          Bienvenue chez BeCom'In
        </StyledTitle>
        <StyledText theme={theme}>
          BeCom'In vous accompagne dans la réalisaton de vos projets de développement Web. <br />
          Quels sont vos besoins ?
        </StyledText>
      </HomeContainer>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {prestationsList?.map((prestation) => (
            <Link className={`card-${prestation.id}`} key={`prestation-${prestation.id}`} to={`/prestation/${prestation.id}`} title={prestation.name}>
              <Card
                title={prestation.name}
                picture={prestation.picture}
                theme={theme}
                label={prestation.shortDescription}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
      <TestContainer theme={theme}>
        <StyledText theme={theme}>
          Vous êtes perdu(e) ? Ce test rapide est fait pour vous !
        </StyledText>
        <StyledLink to="/votre-projet/1" $isFullLink theme={theme}>
          Je passe le test
        </StyledLink>
      </TestContainer>
    </HomeWrapper>
  )
}

export default Home