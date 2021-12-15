import { Link } from 'react-router-dom'
import PortfolioCard from '../../components/PortfolioCard'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'

const CardsContainer = styled.section`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin: 25px;
  flex-wrap: wrap;
  animation: apparition-prog 800ms linear 400ms both;
  transition: all 400ms;
  @media screen and (min-width: 1280px){
    gap: 80px;
  }
`

const PageTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LoaderWrapper = styled.section`
  display: flex;
  justify-content: center;
`


function Portfolio() {

  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/portfolio`
  )

  const portfolioList = data?.portfolioList

  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Voici quelques-unes de nos réalisations</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Becom'In, nous vous accompagnons dans la réalisation de vos projets de développement web et multimédia
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {portfolioList?.map((example) => (
            <Link key={`example-${example.id}`} to={`/portfolio/${example.id}`}>
              <PortfolioCard
                title={example.name}
                picture={example.cover}
                label={example.description}
                theme={theme}
              />
            </Link>
          ))}
        </CardsContainer>
      )}
    </div>
  )
}

export default Portfolio