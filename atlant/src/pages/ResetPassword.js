import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MDBBtn, MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { Context } from '../index';

const ResetPassword = () => {
    const { store } = useContext(Context)
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
            <MDBContainer>
                <MDBRow className="justify-content-center">
                    <MDBCol col="4" md="6">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold mb-0">Восстановление аккаунта</h2>
                            <MDBBtn className="text-dark" color="link" onClick={handleBack}>
                                Назад
                            </MDBBtn>
                        </div>
                        <p className="mt-3">Введите почту вашего аккаунта</p>

                        <form onSubmit={formik.handleSubmit}>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ) : null}
                            <MDBInput
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                wrapperClass='mb-4'
                                label='Почта'
                                id='formControlLg'
                                type='text'
                                size='lg'
                            />


                            <MDBBtn color='dark' className='mb-4 w-100' size='lg' type="submit" disabled={!formik.isValid}>Подтвердить</MDBBtn>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default ResetPassword;