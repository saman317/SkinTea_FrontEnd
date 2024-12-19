import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as skinteaService from "../src/services/skinteaService";
import * as authService from '../src/services/authService'; // import the authservice
import SkinteaList from './components/SkinteaList';//index.jsx name automatically gets imported so don't need to list



export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [skintea, setSkintea]= useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }

  useEffect(() => {
    const fetchAllSkintea = async () => {
      const {skintea}= await skinteaService.getSkintea()
      setSkintea(skintea);

    };
    if(user) fetchAllSkintea()
  }, [user])
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard user={user} />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/skintea" element= {<SkinteaList skintea={skintea}/>} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
