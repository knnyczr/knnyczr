import React, { useState, useEffect } from "react";
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'gatsby'
import ThemeContext from '../context/ThemeContext'

import "../components/scss/header.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import BlackLogo from '../../data/images/logo/logo.svg'
import Logo from '../../data/images/logo/logo2.svg'



const Header = () => {

// found this code @ https://usehooks.com/useWindowSize/
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 400,
      height: 700,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      // Add event listener
      window.addEventListener("resize", handleResize);
      
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

  const size = windowSize;

  const [menuCheck, setmenuCheck] = useState(false)

  const changeMenu = () => {
    setmenuCheck(!menuCheck)
  }

  return(
    <ThemeContext.Consumer>
      {
        theme => (
            <header>
              <Navbar.Brand>
                <Link className="logo" href="/">
                  {!theme.dark ? <BlackLogo /> : <Logo /> }
                </Link>
              </Navbar.Brand>
              <Navbar 
                variant={theme.dark ? "dark" : "light"} 
                fixed={size.width >= 768 ? 'top' : 'bottom'}
                // fixed={'bottom'}
                expand="md" 
              >
                <Navbar.Toggle 
                onClick={() => changeMenu()} 
                style={{ 
                  backgroundColor: `${theme.dark ? "#fefefe" : "#2a2b2d"}`, 
                  color: `${theme.dark ? "#2a2b2d" : "#fefefe"}` 
                }}
                >
                  {
                    menuCheck === true ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />
                  }
                </Navbar.Toggle>
                <Navbar.Collapse 
                  id="basic-navbar-nav" 
                  style={{
                    backgroundColor: `
                    ${
                      size.width >= 768 ?
                      `rgba(0, 0, 0, 0)`
                      :
                      !theme.dark ? "#fefefe" : "#2a2b2d"
                    }
                    `,
                    // backgroundColor: `
                    // ${!theme.dark ? "#fefefe" : "#2a2b2d"}
                    // `,
                    color: `${!theme.dark ? "#2a2b2d" : "#fefefe"}` 
                    }}
                  >
                  <Nav className="ml-auto">
                    <Nav.Link href="/works">works</Nav.Link>
                    <Nav.Link href="/about">about</Nav.Link>
                    <Nav.Link href="/contact">contact</Nav.Link>
                    <Nav.Link onClick={theme.toggleDark} href="#">
                      {theme.dark ? <span>{`lightMode()`}</span> : <span>{`darkMode()`}</span>}
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </header>
        )
      }
    </ThemeContext.Consumer>
  )
}

export default Header
