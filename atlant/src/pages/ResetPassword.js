import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Row, Col } from 'antd';
import { Context } from '../index';

const ResetPassword = () => {
  const { store } = useContext(Context);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Неверный формат email').required('Поле обязательно для заполнения'),
    }),
    onSubmit: async (values) => {
      await store.requestPasswordReset(values.email);
    },
  });

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
      <div>
        <Row justify="center">
          <Col span={24}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">Восстановление аккаунта</h2>
              <Button className="text-dark" type="link" onClick={handleBack}>
                Назад
              </Button>
            </div>
            <p className="mt-3">Введите почту вашего аккаунта</p>

            <form onSubmit={formik.handleSubmit}>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mb-4"
                placeholder="Почта"
                size="large"
              />

              <Button
                type="primary"
                className="mb-4 w-100"
                size="large"
                htmlType="submit"
                disabled={!formik.isValid}
                style={{ background: 'rgba(25, 25, 112, 0.8)' }}
              >
                Подтвердить
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ResetPassword;