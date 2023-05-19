import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { Button, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Password } = Input;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.back();
  };

  const handleClick = () => {
    store.login(username, password);
  };

  return (
    <div className="p-3 my-5">
  <Row justify="center">
    <Col span={14} md={6}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Авторизация</h2>
        <Button type="link" className="text-dark" onClick={handleBack}>
          Назад
        </Button>
      </div>

      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4"
        placeholder="Никнейм"
        size="large"
      />
      <Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
        placeholder="Пароль"
        size="large"
      />

      <Button type="dark" className="mb-4 w-100" size="large" onClick={handleClick}>
        Войти
      </Button>

      <div className="d-flex justify-content-center">
        <Button type="link" size="small" onClick={() => navigate('/reset')}>
          Забыли пароль?
        </Button>
        <p className="fw-bold mx-3 mb-0">или</p>
        <Button type="link" size="small" onClick={() => navigate('/username')}>
          Забыли никнейм?
        </Button>
      </div>

      <Button href="http://localhost:7000/login/vkontakte" className="w-100 mt-5" size="large">
        Войти с помощью ВКонтакте <i className="fab fa-vk"></i>
      </Button>
    </Col>
  </Row>
</div>
  );
};

export default Login;