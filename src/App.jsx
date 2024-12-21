import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as skinteaService from "../src/services/skinteaService";
import * as authService from '../src/services/authService'; // import the authservice
import SkinteaList from './components/SkinteaList';//index.jsx name automatically gets imported so don't need to list
import SkinteaDetails from './components/SkinteaDetails';
import SkinteaNew from "./components/SkinteaNew";


export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate= useNavigate();
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
  }, [user]);

  const addNewSkintea = (newSkintea) => {
    console.log (skintea)
    setSkintea( skintea=> [newSkintea, ...skintea])};

    const handleDeleteSkintea = async (id) =>{
      console.log("id", id);
      const deletedTea= await skinteaService.deletedSkintea(id)
      setSkintea(skintea.filter((tea) => tea._id !== id));
      navigate("/skintea");
    };


  const handleUpdateSkintea = async (id,skinteaFormData ) =>{
    const updatedTea= await skinteaService.update(id,skinteaFormData);
    setSkintea(skintea.map((tea)=> (id === tea._id ? updatedTea : tea)));
    navigate(`/skintea/${id}`)
  }
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
          
          <Route path="/skintea/:id" element={ <SkinteaDetails handleDeleteSkintea={handleDeleteSkintea}/> }/>
          <Route path="/skintea" element= {<SkinteaList skintea={skintea}/>} />
          <Route path="/skintea/new" element= {<SkinteaNew addNewSkintea={addNewSkintea}/>}/>
          <Route path="/skintea/:id/edit" element= {<SkinteaNew handleUpdateSkintea/>}/>
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;