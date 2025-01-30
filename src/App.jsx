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

const themes = {
  dark: {
    background: "#191919",
    color: "white"
  },
  light: {
    background: "#1B1A55",
    color: "black"
  }
};
export const siteTheme = createContext(themes.dark);



function App() {
  const theme = useContext(siteTheme);
  const [user, setUser] = useState({ name: { first: "dude", last: "sir" } });
  const [darkMode, setDarkMode] = useState(true);

  let developer = "IE-Devs";
  let userName = "John McCoy";
  let sessionToken = sessionStorage.getItem("x-auth-token");

  return (
    <div className="App" style={{ backgroundColor: theme.background, color: theme.color }}>
      <div className="themer" style={{ position: "fixed", top: "65px", right: "5px", zIndex: "100", background: "#5C469C" }}>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          defaultChecked="true"
          onChange={(e) => {
            setDarkMode(!darkMode); console.log(darkMode);
          }}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Dark Mode
        </label>
      </div>

      <div className="main-wrapper" >
        <div className="wrapper" >
          {/*  <TokenContext.Provider value={[token, setToken]}> */}
          <siteTheme.Provider value={darkMode ? themes.dark : themes.light}>


            <Router>
              <Navbar userName={userName} darkMode={[setDarkMode]} />
              <ToastContainer
                newestOnTop
                pauseOnFocusLoss
                pauseOnHover
              />

              <Routes>
                <Route path="/">
                  <Route index element={<Home userName={userName} />} />
                  <Route path="/business/:id" element={<CardPage />} />
                  <Route path="/business/user" element={<CardsByUser sessionToken={sessionToken} />} />
                  <Route path="/business/add-business" element={<CardNew sessionToken={sessionToken} />} />
                  <Route path="/business/edit-business" element={<CardEdit />} />
                </Route>

                <Route path="/about" element={<About />} />

                <Route path="/sandbox-crm">
                  <Route index element={<UsersCRM sessionToken={sessionToken} />} />
                  <Route path="user/:id" element={<UserPage user={user} setUser={setUser} />} />
                </Route>

                <Route path="/login" element={<Login sessionToken={sessionToken} />} />

                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer developer={developer} />
            </Router>

          </siteTheme.Provider>
          {/*  </TokenContext.Provider> */}
          <p className="read-the-docs">
            Thanks for using IE Business Directory!
          </p>
        </div>

        {console.log("Global Token: " + sessionToken)}

      </div>
    </div>)
};
export default App;