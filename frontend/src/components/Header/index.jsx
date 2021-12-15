import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import DarkLogo from '../../assets/dark-logo2.png'
import LightLogo from '../../assets/light-logo2.png'
import { useTheme } from '../../utils/hooks'
import React, {useState, useEffect} from 'react'
import { FaBars } from 'react-icons/fa'


const NavContainer = styled.nav`
  position: initial;
  top: 0;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => (theme === 'light' ? `linear-gradient(360deg, #e2ffdb 0, #d7ffd9 10%, #cafed8 20%, #bdfad6 30%, #aef6d5 40%, #9df2d5 50%, #8beed5 60%, #79e9d7 70%, #66e5da 80%, #51e1de 90%, #39dde2 100%)` : `linear-gradient(270deg, #303395 0%,Ivory 100%)`)};
`

const HomeLogo = styled.img`
  height: 60px;
  position: absolute;
  left: 20px;
  top: 0px;
  z-index: 2;
`

const Brand = styled.p`
  position: absolute;
  left: 64px;
  font-family: 'Smooch', cursive;
  font-size: 45px;
  margin: 0;
  z-index: 2;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#000000')};
`

const NavMenu = styled.ul`
  list-style-type: none;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  margin: 0px;
  @media screen and (max-width: 810px){
    flex-direction: column;
    height: auto;
    position: relative;
    top: 60px;
    padding-left: 0px;
    background: linear-gradient(275deg, rgb(255, 250, 205), #FAF0E6);
    z-index: 1;
  }
`

const NavItem = styled.li`
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  transition: all 400ms;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  &:hover{
    color: ${({ theme }) => (theme === 'light' ? `${colors.primary}` : 'Gold')};
  }
  @media screen and (max-width: 810px){
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.555);
    text-align: center;
    margin-right: 0px;
    padding: 15px 0;
  }
  &.first-item {
    border-style: hidden;
  }
`

const Hamburger = styled(FaBars)`
  display: none;
  position: absolute;
  right: 20px;
  top: 12px;
  padding: 5px;
  color: #000;
  font-size: 26px;
  cursor: pointer;
  @media screen and (max-width: 810px){
    display: block;
  }
`

function Header() {
  const { theme } = useTheme()

  const [toggleMenu, setToggleMenu] = useState(false)

  const toggleNav = () => {
    setToggleMenu(!toggleMenu)
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

  }, [])



  return (
    <NavContainer theme={theme}>
      <Link to="/" title="Retour à l'accueil">
        <HomeLogo src={theme === 'light' ? DarkLogo : LightLogo}/>
        <Brand theme={theme}>ecom'In</Brand>
      </Link>
      {(toggleMenu || screenWidth > 810) && (
      <NavMenu onClick={toggleNav}>
        <Link to="/" title="Accueil">
          <NavItem className="first-item" theme={theme} onClick={toggleNav}>Accueil</NavItem>
        </Link>
        <Link to="/portfolio" title="Portfolio">
          <NavItem theme={theme} onClick={toggleNav} >Réalisations</NavItem>
        </Link>
        <Link to="/competences" title="Compétences">
          <NavItem theme={theme} onClick={toggleNav} >Compétences</NavItem>
        </Link>
        <Link to="/votre-projet/1" title="Quel est votre projet ?">
          <NavItem theme={theme} onClick={toggleNav}>Votre projet</NavItem>
        </Link>
        <Link to="/contact" title="Contactez-nous">
          <NavItem theme={theme} onClick={toggleNav}>Contact</NavItem>
        </Link>
      </NavMenu>
      )}
      <Hamburger onClick={toggleNav} title="Menu"></Hamburger>
    </NavContainer>
  )
}

export default Header