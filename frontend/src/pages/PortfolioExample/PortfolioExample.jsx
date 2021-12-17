import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { ThemeContext } from '../../utils/context'

const ProjectWrapper = styled.section`
  margin: 40px auto 0;
  background-color: ${({ theme }) =>
    theme === 'light' ? 'none' : 'none'};
  max-width: 1400px;
  border-radius: 40px;
  padding: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
`
const EntityWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 40px;
  transition: all 200ms;
`

const Logo = styled.img`
  max-width: 100px;
  object-fit: fill;
  margin: auto;
`


const PreviousPage = styled.button`
  margin-right: 30px;
`


const ProjectDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`


const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => (theme === 'light' ? colors.primary : 'white')};
`

const Description = styled.p`
  padding: 10px 30px 0 0;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`


const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  flex-wrap : wrap;
  padding-right: 30px;
  transition: all 400ms;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.primary : 'white')};
  color : ${({ theme }) => (theme === 'light' ? colors.primary : 'white')};
  margin-top: 5px;
`


const MultimediaWrapper = styled.section`
  margin: 30px 30px 0 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? 'white' : colors.backgroundDark};
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: ${({ theme }) =>
    theme === 'light' ? '1px 1px 6px #e2e3e9' : 'none'}; 
`


const CategoryTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? colors.primary : 'white')};
  width: 100%;
`


const PicturesWrapper = styled.section`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 auto;
  align-self: top;
`


const Picture = styled.img`
  max-height: 240px;
  max-width: 240px;
  border-radius: 20px;
  margin : 20px 20px;
  object-fit: fill;
  transition: all 200ms;
`

const VideosWrapper = styled.section`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 auto;
  align-self: top;
`

const Video = styled.video`
  max-height: 360px;
  max-width: 360px;
  border-radius: 20px;
  margin: 30px 30px;
  vertical-align: middle;
  object-fit: contain;
`


function PortfolioExample() {
  const { id: queryId } = useParams()
  const [portfolioExample, setPortfolioExample] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8000/example?id=${queryId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setPortfolioExample(jsonResponse?.portfolioExample)
      })
  }, [queryId])

  const {
    name,
    description,
    skills,
    id,
    logo,
    pictures,
    videos,
  } = portfolioExample

  let history = useHistory();

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ProjectWrapper theme={theme}>
          <EntityWrapper>
            <LogoWrapper>
              <PreviousPage onClick={history.goBack} title='Page précédente'>Retour</PreviousPage>
              <Logo src={logo} alt={name} />
            </LogoWrapper>
            <ProjectDetails theme={theme}>
              <TitleWrapper>
                <Title theme={theme}>{name}</Title>
              </TitleWrapper>
              <Description>{description}</Description>
              <SkillsWrapper>
                {skills && skills.map((skill) => (
                  <Skill key={`skill-${skill}-${id}`} theme={theme}>
                    {skill}
                  </Skill>
                ))}
              </SkillsWrapper>
            </ProjectDetails>
          </EntityWrapper>
          <MultimediaWrapper theme={theme}>
            <PicturesWrapper >
            <CategoryTitle theme={theme}>Illustrations</CategoryTitle>
              {pictures && pictures.map((picture) => (
                <Picture key={`picture-${picture}`} theme={theme}
                  src={picture}
                />
              ))}
            </PicturesWrapper>
            <VideosWrapper>
              <CategoryTitle theme={theme}>Demo rapide</CategoryTitle>
              {videos && videos.map((video) => (
                <Video key={`video-${video}`} theme={theme} autoPlay loop controls>
                  <source src={video} type='video/mp4'></source>
                </Video>
              ))}
            </VideosWrapper>
          </MultimediaWrapper>
        </ProjectWrapper>
      )}
    </ThemeContext.Consumer>
  )
}

export default PortfolioExample