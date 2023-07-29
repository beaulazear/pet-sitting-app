import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import PageNavLinks from './components/PageNavLinks';
import Home from './components/Home';
import PetSittersPage from './components/PetSittersPage';
import PetSitterPage from './components/PetSitterPage';
import ClientPage from './components/ClientPage';
import Conversations from './components/Conversations';

const headerStyle = {
  textAlign: 'center',
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: '#9e9e9e',
  width: '100%',
  fontSize: '36px',
  lineHeight: '1.2',
};

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

  function updateUserClient(clientAccount) {
    const newUser = user
    newUser.client = clientAccount
    setUser(newUser)
  }

  function updateUserPetsitter(petsitterAccount) {
    const newUser = user
    newUser.petsitter = petsitterAccount
    setUser(newUser)
  }


  if (user) {
    return (
      <div>
        <PageNavLinks />
        <h1 style={headerStyle}>NYC Pet Sitters</h1>
        <Routes>
          <Route path="/" element={<Home updateUser={updateUserPetsitter} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/petsitter" element={<PetSitterPage updateUser={updateUserPetsitter} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/client" element={<ClientPage updateUser={updateUserClient} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/petsitters" element={<PetSittersPage user={user} handleLogout={handleLogout} />} />
          <Route path="/conversations" element={<Conversations user={user} handleLogout={handleLogout} />} />
        </Routes>
        <div style={{ marginTop: '20px' }}> {/* Add some space above the button */}
          <button style={{ position: 'fixed', bottom: '0px', right: '0px' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="notLoggedInHome">
        <h1 style={headerStyle}>NYC Pet Sitters</h1>
        <Login onLogin={setUser} />
        <Signup onLogin={setUser} />
      </div>
    );
  }
}

export default App;
