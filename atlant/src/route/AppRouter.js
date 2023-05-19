import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Context } from '../index';
import React, { useContext } from 'react';
import { Layout } from 'antd';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import NavBar from '../components/NavBar';
import FlatItem from '../components/FlatItem/FlatItem';
import Flats from '../pages/Flats';
import Favorite from '../pages/Favorite';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import Empty from '../pages/Empty.js';
import ResetUsername from '../pages/ResetUsername';
import Advantages from '../pages/Advantages';
import Contacts from  '../pages/Contacts'

const { Footer } = Layout;

const AppRouter = () => {
  const { store } = useContext(Context);

  const isAdminPage = window.location.pathname.includes('/admin');
  const isAuthPage = window.location.pathname.includes('/signup') || window.location.pathname.includes('/login');
  const isProfilePage = window.location.pathname.includes('/profile')
  const isFavoritePage = window.location.pathname.includes('/favorite')

  const shouldDisplayFooter = !(isAdminPage || isAuthPage || isProfilePage || isFavoritePage);

  return (
    <Router>
      <NavBar />
      <Routes>
        {store.isAdmin && <Route path="/admin" element={<Admin />} />}
        {store.isAuth ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={<Favorite />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginvk/:id" element={<Empty />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/reset/:reset_link" element={<ResetPasswordPage />} />
            <Route path="/username" element={<ResetUsername />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/flats" element={<Flats />} />
        <Route path="/flats/:id" element={<FlatItem />} />
        <Route path="/advantages" element={<Advantages />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      {shouldDisplayFooter && (
        <Layout>
          <Footer className="mt-3" style={{ textAlign: 'center', backgroundColor: 'rgba(25, 25, 112, 0.8)', color: 'white' }}>
            ©2023 ЖК Атлант. Все права защищены
          </Footer>
        </Layout>
      )}
    </Router>
  );
};

export default AppRouter;