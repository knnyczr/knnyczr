import React, { Component, createContext } from "react"

const defaultState = {
  dark: false,
  toggleDark: () => {},
}

const ThemeContext = createContext(defaultState)

// THE FOLLOWING IS FROM GATSBY USECONTEXT/CREATECONTEXT USING LOCALSTORAGE

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.


class ThemeProvider extends Component {
  state = {
    dark: false,
  }

  toggleDark = () => {
    let dark = !this.state.dark
    localStorage.setItem("dark", JSON.stringify(dark))
    this.setState({ dark })
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem("dark"))
    if (lsDark) {
      this.setState({ dark: lsDark })
    } 
    // THE FOLLOWING IS A BUG WHEN SWITCHING PAGES
    // else if (supportsDarkMode()) {
    //   this.setState({ dark: true })
    // }
  }

  render() {
    const { children } = this.props
    const { dark } = this.state
    return (
      <ThemeContext.Provider
        value={{
          dark,
          toggleDark: this.toggleDark,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }