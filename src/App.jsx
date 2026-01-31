import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from '../Components/Login'
import Dashboard from '../Components/Dashboard';
import Relogin from '../Components/Relogin';
import UserProfile from '../Components/UserProfile';
import ModifyItem from '../Components/ModifyItem';

function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/relogin' element={<Relogin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route path='userProfile' element={<UserProfile/>}/>
              <Route path='modify' element={<ModifyItem/>}/>
            </Route>
        </Routes>
    </Router>
    </>
  )
}

export default App
