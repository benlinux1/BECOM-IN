import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import colors from '../../utils/style/colors'
import { ThemeContext } from '../../utils/context'

const ProfileWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 60px;
  margin: 40px auto;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  max-width: 1200px;
  border-radius: 40px;
`

const ProfileDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => (theme === 'light' ? colors.primary : 'white')};
`

const Description = styled.p`
  padding-top: 10px;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  flex-wrap : wrap;
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

const Availability = styled.span`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`

function Prestation() {
  const { id: queryId } = useParams()
  const [prestationData, setPrestationData] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8000/prestation?id=${queryId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setPrestationData(jsonResponse?.prestationData)
      })
  }, [queryId])

  const {
    picture,
    name,
    tjm,
    description,
    skills,
    available,
    id,
  } = prestationData

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ProfileWrapper theme={theme}>
          <Picture src={picture} alt={name} height={150} width={150} />
          <ProfileDetails theme={theme}>
            <TitleWrapper>
              <Title theme={theme}>{name}</Title>
            </TitleWrapper>
            <Description>{description}</Description>
            <SkillsWrapper>
              {skills &&
                skills.map((skill) => (
                  <Skill key={`skill-${skill}-${id}`} theme={theme}>
                    {skill}
                  </Skill>
                ))}
            </SkillsWrapper>
            <Availability available={available}>
              {available ? 'Disponible maintenant' : 'Indisponible'}
            </Availability>
            <Price>{tjm} € / jour</Price>
          </ProfileDetails>
        </ProfileWrapper>
      )}
    </ThemeContext.Consumer>
  )
}

export default Prestation