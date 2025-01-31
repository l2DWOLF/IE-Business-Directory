import { createContext, useContext, useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import UsersCRM from './components/UsersCRM'
import SearchBar from './components/SearchBar'
import Greeting from './components/Greeting'
import Cards from './components/Cards'
import Login from './components/Login'
import NotFound from './components/NotFound'
import CardPage from './components/CardPage'
import UserPage from './components/UserPage'
import Register from './components/Register'
import CardNew from './components/CardNew'
import CardEdit from './components/CardEditModal'
import { ToastContainer } from 'react-toastify'
import { TokenContext } from './services/createContext'
import About from './components/About'
import CardsByUser from './components/CardsByUser'
import CardsByLiked from './components/CardByLiked'

const themes = {
  dark: {
    background: "#191919",
    color: "white"
  },
  light: {
    background: "#526D82",
    color: "black"
  }
};
export const siteTheme = createContext(themes.dark);
export const searchContext = createContext("");

function App() {
  const theme = useContext(siteTheme);
  
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  let developer = "IE-Devs";
  let userName = "John McCoy";


  

  return (
    <siteTheme.Provider value={darkMode ? themes.dark : themes.light}>
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
    <div className="App" style={{ backgroundColor: theme.background, color: theme.color }}>
    
      
        <div className="main-wrapper" style={{ backgroundColor: theme.background, color: theme.color }}>
          <div className="wrapper" style={{ backgroundColor: theme.background, color: theme.color }} >

            <Router>
              <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
              <ToastContainer className="toastifier"
                newestOnTop
                pauseOnFocusLoss
                pauseOnHover
              />

              <Routes>
                <Route path="/">
                  <Route index element={<Home userName={userName} />} />
                  <Route path="/business/:id" element={<CardPage />} />
                  <Route path="/business/user" element={<CardsByUser />} />
                  <Route path="/business/add-business" element={<CardNew  />} />
                </Route>

                <Route path="/about" element={<About />} />
                <Route path="/liked-cards" element={<CardsByLiked />} />

                <Route path="/sandbox-crm">
                  <Route index element={<UsersCRM />} />
                  <Route path="user/:id" element={<UserPage />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer developer={developer} />
            </Router>

          <p className="read-the-docs">
            Thanks for using IE Business Directory!
          </p>
        </div>
      </div>
    </div>
    </searchContext.Provider>
    </siteTheme.Provider>)
};
export default App;