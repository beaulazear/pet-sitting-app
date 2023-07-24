import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import PageNavLinks from './components/PageNavLinks';
import PetSittersPage from './components/PetSittersPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(setUser(null))
  }

  // <button onClick={handleLogout}>Logout</button>

  if (user) {
    return (
      <div>
        <PageNavLinks />
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} handleLogout={handleLogout}/>} />
          <Route path="/petsitters" element={<PetSittersPage handleLogout={handleLogout} />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div id="notLoggedInHome">
        <h1 className='page-header'>NYC Pet Sitters</h1>
        <Login onLogin={setUser} />
        <Signup onLogin={setUser} />
      </div>
    );
  }
}

export default App;
