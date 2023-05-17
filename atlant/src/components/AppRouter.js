import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { Context } from '../index'
import React, { useContext } from 'react' 
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Admin from '../pages/Admin'
import NavBar from './NavBar'
import FlatItem from './FlatItem'
import Flats from '../pages/Flats'
import Favorite from '../pages/Favorite'
import ResetPassword from '../pages/ResetPassword'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import Empty from '../pages/Empty.js'
import ResetUsername from '../pages/ResetUsername'

const AppRouter = () => {
    const { store } = useContext(Context)

    return (
        <Router>
            <NavBar />
            <Routes>
                {store.isAdmin && (
                    <>
                        <Route path='/admin' element={<Admin />} />
                    </> 
                )}
                {store.isAuth ? (
                    <>
                    <Route path='/profile' element={<Profile />} /> 
                    <Route path='/favorite' element={<Favorite />} />
                    </>
                ) : (
                    <>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/loginvk/:id' element={<Empty />} />
                    <Route path='/reset' element={<ResetPassword />} />
                    <Route path='/reset/:reset_link' element={<ResetPasswordPage />} />
                    <Route path='/username' element={<ResetUsername />} />
                    </>
                )}
                <Route path='/' element={<Home />} />
                <Route path='/flats' element={<Flats />} />
                <Route path='/flats/:id' element={<FlatItem />} />
            </Routes>
        </Router>
    )
}

export default AppRouter