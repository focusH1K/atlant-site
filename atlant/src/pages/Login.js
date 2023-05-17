import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);
  const navigate = useNavigate()

  const handleBack = () => {
    window.history.back();
  };

  const handleClick = () => {
    store.login(username, password)
  }

  return (
    <>
      <MDBContainer container-fluid='true' className='p-3 my-5'>

        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Авторизация</h2>
              <MDBBtn className='text-dark' color="link" onClick={handleBack}>Назад</MDBBtn>
            </div>

            <MDBInput value={username} onChange={(e) => setUsername(e.target.value)} wrapperClass='mb-4' label='Никнейм' id='formControlLg' type='text' size='lg' />
            <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4' label='Пароль' id='formControlLg' type='password' size='lg' />


            <MDBBtn color='dark' className='mb-4 w-100' size='lg' onClick={handleClick}>Войти</MDBBtn>

            <div className='d-flex justify-content-center'>
              <MDBBtn color='link' size='sm' onClick={() => navigate('/reset')}>
                Забыли пароль?
              </MDBBtn>
              <p className='fw-bold mx-3 mb-0'>или</p>
              <MDBBtn color='link' size='sm' onClick={() => navigate('/username')}>
                Забыли никнейм?
              </MDBBtn>
            </div>

            <MDBBtn href='http://localhost:7000/login/vkontakte' className=' w-100 mt-5' size='lg'>
              Войти с помощью ВКонтакте <i className='fab fa-vk'></i>
            </MDBBtn>


          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>
  )
};

export default Login;