import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'

const CardsContainer = styled.section`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
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

  // Ici le "?" permet de s'assurer que data existe bien.
  // Vous pouvez en apprendre davantage sur cette notation ici :
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const portfolioList = data?.portfolioList

  /* SYNTAXE ES7 avec Try / Catch / Finally et UseEffect
    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(false)
    const [freelancersList, setFreelancesList] = useState([])

    useEffect(() => {
      async function fetchFreelances() {
        setDataLoading(true)
        try {
          const response = await fetch(`http://localhost:8000/freelances`)
          const { freelancersList } = await response.json()
          setFreelancesList(freelancersList)
        } catch (err) {
          console.log('===== error =====', err)
          setError(true)
        } finally {
          setDataLoading(false)
        }
      }
      fetchFreelances()
    }, [])
  */

  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }


  return (
    <div>
      <PageTitle theme={theme}>Voici quelques-unes de nos réalisations</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Becom', nous vous accompagnons dans la réalisation de vos projets de développement web et multimédia
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {portfolioList?.map((example) => (
            <Link key={`example-${example.id}`} to={`/portfolio/${example.id}`}>
              <Card
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