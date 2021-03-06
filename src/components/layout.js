import React from "react"
import Header from "./header"
import Footer from "./footer"

import ThemeContext from '../context/ThemeContext'

import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./scss/layout.scss"



const Layout = ({ children }) => {  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      # allFile(filter: {name:{regex: "/logo/"} , extension: {regex: "/(svg)/"}}) {
      #   edges {
      #     node {
      #       publicURL
      #     }
      #   }
      # }
    }
  `)
  console.log(data)
  return (
    <ThemeContext.Consumer>
      {
        theme => (
          <div className={theme.dark ? 'dark' : 'light'}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{children}</main>
            <Footer />
          </div>
        )
      }
    </ThemeContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
