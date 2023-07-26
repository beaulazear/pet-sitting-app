import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import PageNavLinks from './components/PageNavLinks';
import PetSittersPage from './components/PetSittersPage';
import PetSitterPage from './components/PetSitterPage';
import ClientPage from './components/ClientPage';

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

  function updateUser(clientAccount) {
    const newUser = user
    newUser.client = clientAccount
    setUser(newUser)
  }

  const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2',
  };

  if (user) {
    return (
      <div>
        <PageNavLinks />
        <h1 style={headerStyle}>NYC Pet Sitters</h1>
        <Routes>
          <Route path="/" element={<PetSitterPage  updateUser={updateUser} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/client" element={<ClientPage updateUser={updateUser} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/petsitters" element={<PetSittersPage user={user} handleLogout={handleLogout} />} />
        </Routes>
        <button onClick={handleLogout}>Logout</button>
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
