import { useContext } from 'react'
/*Suppression du UseState et UseEffect au profit du Hook UseFetch
  import { useState, useEffect } from 'react'
*/
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'

// Importation du Hook useFetch
import { useFetch, useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  //text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const LinkBox = styled.span`
  border: none;
  height: 30px;
  width: 180px;
  text-align: center;
  color: ${({ theme }) => (theme === 'light' ? '000000' : '#ffffff')};
  cursor: pointer;
  transition: all 200ms;
  &:first-child {
    margin-right: 10px;
  }
  &:last-of-type {
    margin-left: 10px;
  }
  &:hover {
    text-shadow: 1px 0px 0px ${({ theme }) => (theme === 'light' ? 'LightGrey' : 'WhiteSmoke' )};
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? 'white' : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `2px 2px 1px 2px DarkTurquoise` : `1px 1px 2px #e2e3e9`};
  transition: all 200ms;
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
  &:hover {
    box-shadow: 2px 2px 6px ${({ theme }) => (theme === 'light' ? 'LightGray' : '#ffffff' )};
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { theme } = useTheme()
  const { saveAnswers, answers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const surveyData = data?.surveyData

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber} / 6</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData && surveyData[questionNumber]}
        </QuestionContent>
      )}
      {answers && (
        <ReplyWrapper>
          <ReplyBox
            onClick={() => saveReply(true)}
            isSelected={answers[questionNumber] === true}
            theme={theme}
          >
            OUI
          </ReplyBox>
          <ReplyBox
            onClick={() => saveReply(false)}
            isSelected={answers[questionNumber] === false}
            theme={theme}
          >
            NON
          </ReplyBox>
        </ReplyWrapper>
      )}
      <LinkWrapper theme={theme}>
        {surveyData && surveyData[questionNumberInt - 1] ? (
          <Link to={`/votre-projet/${prevQuestionNumber}`}>
            <LinkBox theme={theme}>⬅️ Question précédente </LinkBox>
          </Link> 
        ): ( 
          null
        )}
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/votre-projet/${nextQuestionNumber}`}>
            <LinkBox theme={theme}>Question suivante ➡️</LinkBox>
          </Link> 
        ) : (
          <Link to="/resultats">
            <LinkBox theme={theme}>Voir les résultats</LinkBox>
          </Link> 
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey