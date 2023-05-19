import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Col, Form, Input, Row } from 'antd';
import { Context } from '../';

const Signup = () => {
  const { store } = useContext(Context);

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Никнейм должен содержать только латинские буквы, цифры и символ подчеркивания')
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
      await store.signup(username, email, password);
    },
  });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="p-3 my-5">
      <Row justify="center">
        <Col span={14} md={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Регистрация</h2>
            <Button type="link" className="text-dark" onClick={handleBack}>
              Назад
            </Button>
          </div>
          <Form onFinish={formik.handleSubmit}>
            <Form.Item
              label="Никнейм"
              name="username"
              hasFeedback
              validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
              help={formik.touched.username && formik.errors.username}
            >
              <Input
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Почта"
              name="email"
              hasFeedback
              validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
              help={formik.touched.email && formik.errors.email}
            >
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              hasFeedback
              validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
              help={formik.touched.password && formik.errors.password}
            >
              <Input.Password
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="dark"
                className="mb-4 w-100"
                size="large"
                htmlType="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Регистрация
              </Button>
            </Form.Item>
          </Form>

          <Button href="http://localhost:7000/login/vkontakte" className="mb-4 w-100" size="large">
            Войти с помощью ВКонтакте <i className="fab fa-vk"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;