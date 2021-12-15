import Card from '../../components/Card'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'
import '../../css/styles.css'

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

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? '#000000' : 'DarkTurquoise')};
  color : ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
`

function Languages() {

  const { theme } = useTheme()
  const { data, isLoading, error } = useFetch(
    `http://localhost:8000/languages`
  )

  const languagesList = data?.languagesList

  if (error) {
    return <span>Oups, il y a eu un problème</span>
  }

  
  return (
    <main>
      <PageTitle theme={theme}>Nos compétences</PageTitle>
      <PageSubtitle theme={theme}>
        Voici l'ensemble de nos compétences
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} data-testid="loader" />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {languagesList?.map((language) => (
            <section className={`card-${language.id}`} key={`card-${language.id}`} title={`${language.name} - ${language.description}`}>
              <Card key={language.id} 
                title={language.name}
                picture={language.picture}
                skills={language.skills &&
                  language.skills.map((skill) => (
                    <Skill key={`skill-${skill}`} theme={theme}>
                      {skill}
                    </Skill>
                ))}
                theme={theme}
                label={language.description}
              />
            </section>
          ))}
        </CardsContainer>
      )}
    </main>
  )
}

export default Languages