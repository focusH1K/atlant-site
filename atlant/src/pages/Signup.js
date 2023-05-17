import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { Context } from '../';

const Signup = () => {
  const { store } = useContext(Context)

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Никнейм должен начинаться с латинской буквы')
      .min(5, 'Никнейм должен содержать не менее 5 символов')
      .required('Введите никнейм'),
    email: Yup.string()
      .email('Введите правильный адрес электронной почты')
      .required('Введите адрес электронной почты'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Пароль должен содержать латинские прописные и строчные буквы, цифры и быть не менее 8 символов')
      .required('Введите пароль'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, email, password } = values;
      await store.signup(username, email, password)
    },
  });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <MDBContainer container-fluid='true' className='p-3 my-5'>
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Регистрация</h2>
            <MDBBtn className='text-dark' color="link" onClick={handleBack}>Назад</MDBBtn>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {formik.touched.username && formik.errors.username && (
              <div className="text-danger">{formik.errors.username}</div>
            )}
            <MDBInput
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && formik.errors.username}
              wrapperClass='mb-4'
              label='Никнейм'
              id='formControlLg'
              type='text'
              size='lg'
            />

            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}

            <MDBInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              wrapperClass='mb-4'
              label='Почта'
              id='formControlLg'
              type='email'
              size='lg'
            />

            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}

            <MDBInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              wrapperClass='mb-4'
              label='Пароль'
              id='formControlLg'
              type='password'
              size='lg'
            />

            <MDBBtn
              color='dark'
              className='mb-4 w-100'
              size='lg'
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Регистрация
            </MDBBtn>
          </form>
          <div className='divider d-dlex align-items-center my-4'>
            <p className='text-center fw-bold mx-3 mb-0'>ИЛИ</p>
          </div>
          <MDBBtn href='http://localhost:7000/login/vkontakte' className='mb-4 w-100' size='lg'>
            Войти с помощью ВКонтакте <i className='fab fa-vk'></i>
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;