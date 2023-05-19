import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import 'antd/es/app/style/index';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Item } = Menu;

const NavBar = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState('/');

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    store.logout();
    if (store.isAdmin) {
      store.setAdmin(false);
    }
    navigate('/');
  };

  return (
    <Header className="bg-white border-bottom">
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        className="ms-1 ms-lg-3"
        style={{ justifyContent: 'space-between' }}
        selectedKeys={[currentLocation]}
      >
        <Item key="1" className="text-dark" items={['1']}>
          <strong>
            <a href="/" className="fw-bold text-dark">
              ЖК Атлант
            </a>
          </strong>
        </Item>
        <Item key="2" className="text-dark" items={['2']}>
          <a href="/flats">Квартиры</a>
        </Item>
        <Item key="3" className="text-dark" items={['3']}>
          <a href="/advantages">Обустройство ЖК</a>
        </Item>
        <Item key="4" className="text-dark" items={['4']}>
          <a href="/contacts">Контакты</a>
        </Item>
        {store.isAdmin && (
          <Item key="5" className="text-dark" items={['5']}>
            <a href="/admin">Панель администратора</a>
          </Item>
        )}
        <div className="d-flex align-items-center">
          {store.isAuth ? (
            <>
              <Button
                href="/favorite"
                type="link"
                className={`px-3 me-2 ${currentLocation === '/favorite' ? 'text-primary' : 'text-dark'}`}
              >
                Избранное
              </Button>
              <Button
                href="/profile"
                type="link"
                className={`px-3 me-2 ${currentLocation === '/profile' ? 'text-primary' : 'text-dark'}`}
              >
                <strong>Профиль</strong>
              </Button>
              <Button onClick={handleLogout} type="primary" danger>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button
                href="/login"
                type="link"
                className={`px-3 me-2 ${currentLocation === '/login' ? 'text-primary' : 'text-dark'}`}
              >
                Вход
              </Button>
              <Button href="/signup" style={{ background: 'rgba(25, 25, 112, 0.8)' }} className="text-white">
                Регистрация
              </Button>
            </>
          )}
        </div>
      </Menu>
    </Header>
  );
};

export default observer(NavBar);