import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from './context/user';
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

  const { user, setUser } = useContext(UserContext)

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null)
    })
  }


  if (user) {
    return (
      <div style={{ paddingBottom: "20px" }}>
        <PageNavLinks />
        <h1 style={headerStyle}>NYCPetSitters</h1>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/petsitter" element={<PetSitterPage updateUser={updateUserPetsitter} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/client" element={<ClientPage updateUser={updateUserClient} user={user} setUser={setUser} handleLogout={handleLogout} />} />
          <Route path="/petsitters" element={<PetSittersPage user={user} handleLogout={handleLogout} />} />
          <Route path="/conversations" element={<Conversations user={user} handleLogout={handleLogout} />} />
        </Routes>
        <div style={{ marginTop: '20px' }}>
          <button style={{ position: 'fixed', bottom: '0', right: '0px', marginTop: "2%" }} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="notLoggedInHome">
        <h1 style={headerStyle}>NYC Pet Sitters</h1>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default App;
