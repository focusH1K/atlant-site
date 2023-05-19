import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from '../index';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBBtn, MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const { reset_link } = useParams();

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                'Пароль должен содержать латинские прописные и строчные буквы, цифры и быть не менее 8 символов'
            )
            .required('Введите пароль'),
        verifyNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать')
            .required('Введите пароль для подтверждения'),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            verifyNewPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const { newPassword, verifyNewPassword } = values;
            await store.resetPassword(reset_link, newPassword, verifyNewPassword);
            navigate('/login');
        },
    });

    const handleBack = () => {
        navigate('/login')
    };

    return (
        <>
        <div className="d-flex justify-content-center align-items-start min-vh-100 mt-5">
            <MDBContainer>
                <MDBRow className='justify-content-center'>
                    <MDBCol col='4' md='6'>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h2 className='fw-bold mb-0'>Восстановление пароля</h2>
                            <MDBBtn className='text-dark' color='link' onClick={handleBack}>
                                Назад
                            </MDBBtn>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            {formik.touched.newPassword && formik.errors.newPassword && (
                                <div className='text-danger'>{formik.errors.newPassword}</div>
                            )}
                            <MDBInput
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.newPassword && formik.errors.newPassword
                                }
                                wrapperClass='mb-4'
                                label='Пароль'
                                id='formControlLg'
                                type='password'
                                size='lg'
                            />

                            {formik.touched.verifyNewPassword &&
                                formik.errors.verifyNewPassword && (
                                    <div className='text-danger'>
                                        {formik.errors.verifyNewPassword}
                                    </div>
                                )}
                            <MDBInput
                                name='verifyNewPassword'
                                value={formik.values.verifyNewPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.verifyNewPassword &&
                                    formik.errors.verifyNewPassword
                                }
                                wrapperClass='mb-4'
                                label='Подтвердите пароль'
                                id='formControlLg'
                                type='password'
                                size='lg'
                            />
                            <MDBBtn color='dark' className='mb-4 w-100' size='lg' type='submit' style={{ background: 'rgba(25, 25, 112, 0.8)'}}>
                                Восстановить
                            </MDBBtn>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        </>
    );
};

export default ResetPasswordPage;