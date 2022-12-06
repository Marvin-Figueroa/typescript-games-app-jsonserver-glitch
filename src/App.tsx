import { FC } from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import GameDetails from './pages/GameDetails/GameDetails';
import Login from './components/Login/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

import { useAuth } from './hooks/useAuth';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

enum Paths {
  Homepage = '/',
  Login = '/login',
  About = '/about',
  GameDetail = '/games/:id',
  NotFound = '*',
}

const App: FC = () => {
  const { user, logIn, logOut } = useAuth();

  return (
    <div className="App">
      <Navbar user={user} onLogOut={logOut} />
      <Routes>
        <Route path={Paths.Homepage} element={<Home />} />
        <Route path={Paths.About} element={<About />} />
        <Route path={Paths.Login} element={<Login onLogIn={logIn} />} />
        <Route
          path={Paths.GameDetail}
          element={
            <ProtectedRoute>
              <GameDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
