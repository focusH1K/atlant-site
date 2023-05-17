import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const NavBar = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = () => {
        store.logout();
        if (store.isAdmin) {
            store.setAdmin(false);
        } 
        navigate('/')
    }

    return (
        <MDBNavbar expand='lg' light className="bg-white border-bottom">
            <MDBContainer fluid>
                <MDBNavbarBrand className='ms-1 ms-lg-3 d-flex align-items-center' href='/'>
                    <MDBIcon icon='flask' className='text-dark me-2' />
                    <small className='fw-bold text-dark'>ЖК Атлант</small>
                </MDBNavbarBrand>

                <MDBCollapse navbar>
                    <MDBNavbarNav className="ms-auto">
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/flats' className="text-dark">
                                Квартиры
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/advantages' className="text-dark">Обустройство ЖК</MDBNavbarLink>
                        </MDBNavbarItem>

                        <MDBNavbarItem>
                            <MDBNavbarLink href='/contacts' className="text-dark">
                                Контакты
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                        {store.isAdmin && (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/admin' className="text-dark">
                                    Панель администратора
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>

                    {store.isAuth ? (
                        <div className='d-flex align-items-center ms-2 ms-lg-3'>
                            <MDBNavbarLink href='/favorite'>
                                <FaHeart className='fa-2x text-danger me-2' />
                            </MDBNavbarLink>
                            <MDBBtn href='/profile' color='link' className='px-3 me-2 text-dark'>
                                Профиль
                            </MDBBtn>
                            <MDBBtn onClick={handleLogout} color='danger'>
                                Выйти
                            </MDBBtn>
                        </div>
                    ) : (
                        <div className='d-flex align-items-center ms-2 ms-lg-3'>
                            <MDBBtn href='/login' color='link' className='px-3 me-2 text-dark'>
                                Вход
                            </MDBBtn>
                            <MDBBtn href='/signup' color='dark'>
                                Регистрация
                            </MDBBtn>
                        </div>
                    )}
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default observer(NavBar)