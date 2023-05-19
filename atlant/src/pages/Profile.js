import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../index';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBtn,
    MDBTypography,
    MDBCardImage,
    MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBModalDialog,
    MDBModalContent,
    MDBModalTitle,
} from 'mdb-react-ui-kit';
import AuthService from '../service/authService';
import { observer } from 'mobx-react-lite'
import { IMG_URL } from '../http/index';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../notifications/Toast';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Бронирования');
    const { store, bookingStore, purchaseStore } = useContext(Context);
    const [editingUsername, setEditingUsername] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editingPassword, setEditingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false); // Added state for password modal
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleDeleteUser = () => {
        try {
            store.deleteUser(store.user.id);
            store.logout();
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (store.user) {
            bookingStore.getBookingById(store.user.id);
        }
    }, [bookingStore, store]);

    useEffect(() => {
        if (store.user) {
            purchaseStore.getOnePurchase(store.user.id);
        }
    }, [purchaseStore, store]);

    useEffect(() => {
        const response = AuthService.getUserById(store.user.id);
        return response.data;
    });

    const handleCancelBooking = async (id) => {
        try {
            await bookingStore.cancelBooking(id);
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditUsername = () => {
        setEditedUsername(store.user.username);
        setEditingUsername(true);
    };

    const handleSaveUsername = async () => {
        try {
            await AuthService.refreshUsername(store.user.id, editedUsername);
            store.setUser({
                ...store.user,
                username: editedUsername,
            });
            setEditingUsername(false);
            showSuccessToast('Изменения сохранены');
        } catch (error) {
            showErrorToast(error.response.data.message)
        }
    };

    const handleCancelEdit = () => {
        setEditingUsername(false);
    };

    const handleSavePassword = () => {
        store.changePassword(store.user.id, oldPassword, newPassword);
        setEditingPassword(false);
        setOldPassword('');
        setNewPassword('');
    };

    const toggleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    };

    const togglePasswordModal = () => {
        setPasswordModalOpen(!passwordModalOpen);
    };

    const handleConfirmDelete = () => {
        handleDeleteUser();
        setDeleteModalOpen()
    };

    return (
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="9" xl="7">
                    <MDBCard style={{ border: '1px solid black' }}>
                        <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#363434', height: '200px' }}>
                            <div className="ms-4 mt-5 d-flex flex-column">
                                {editingUsername ? (
                                    <>
                                        <MDBBtn outline color="light" style={{ overflow: 'visible' }} onClick={handleSaveUsername}>
                                        <strong>Сохранить</strong>
                                        </MDBBtn>
                                        <MDBBtn className="mt-3" color="light" style={{ overflow: 'visible' }} onClick={handleCancelEdit}>
                                        <strong>Отмена</strong>
                                        </MDBBtn>
                                    </>
                                ) : (
                                    <MDBBtn  color="light" style={{ overflow: 'visible' }} onClick={handleEditUsername}>
                                        <strong>Редактировать</strong>
                                    </MDBBtn>
                                )}
                                {!editingPassword ? (
                                    <MDBBtn onClick={togglePasswordModal} className="mt-3"  color="primary" style={{ overflow: 'visible', background: 'rgba(25, 25, 112, 0.8' }}>
                                        <strong>Сменить пароль</strong>
                                    </MDBBtn>
                                ) : null}
                            </div>
                            <div className="ms-5 me-5 d-flex flex-column justify-content-center">
                                    {editingUsername ? (
                                        <MDBInput type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} className="mb-2" />
                                    ) : (
                                        <MDBCardText>Никнейм: {store.user.username}</MDBCardText>
                                    )}
                                    <MDBCardText>Почта: {store.user.email}</MDBCardText>
                            </div>
                            <div className="text-end mt-5 d-flex flex-column">
                                    <MDBBtn onClick={toggleDeleteModal} color="danger" style={{ overflow: 'visible' }}>
                                    <strong>Удалить аккаунт</strong>
                                    </MDBBtn>
                                </div>
                        </div>
                        <MDBCardBody className="text-black p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBBtn
                                    color="light"
                                    className="lead fw-normal mb-0"
                                    onClick={() => handleTabChange('Бронирования')}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: activeTab === 'Бронирования' ? '#333' : '#f8f9fa',
                                        color: activeTab === 'Бронирования' ? '#fff' : '#333',
                                    }}
                                >
                                    Бронирования
                                </MDBBtn>
                                <MDBBtn
                                    color="light"
                                    className="lead fw-normal mb-0"
                                    onClick={() => handleTabChange('Покупки')}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: activeTab === 'Покупки' ? '#333' : '#f8f9fa',
                                        color: activeTab === 'Покупки' ? '#fff' : '#333',
                                    }}
                                >
                                    Покупки
                                </MDBBtn>
                            </div>
                            {activeTab === 'Бронирования' && (
                                <>
                                    {bookingStore.bookings.length ? (
                                        bookingStore.bookings.map((booking) => (
                                            <MDBCard key={booking.id} className="mb-3">
                                                <MDBCardBody
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <MDBTypography variant="h5" className="mb-2">
                                                        {booking.flatInfo.name} {booking.flatInfo.area} кв.м
                                                    </MDBTypography>
                                                    <MDBCardImage
                                                        src={IMG_URL + booking.flatInfo.image}
                                                        style={{ width: 300, height: 300 }}
                                                        className="mt-3"
                                                    />
                                                    <div style={{ marginTop: '1rem' }}>
                                                        <span>Дата начала: {booking.checkInDate}</span>
                                                        <br />
                                                        <span>Дата конца: {booking.checkOutDate}</span>
                                                    </div>
                                                    <MDBBtn
                                                        color="danger"
                                                        className="mt-3"
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                    >
                                                        Отменить бронирование
                                                    </MDBBtn>
                                                </MDBCardBody>
                                            </MDBCard>
                                        ))
                                    ) : (
                                        <p className="mt-3">Вы пока ничего не забронировали</p>
                                    )}
                                </>
                            )}
                            {activeTab === 'Покупки' && (
                                <>
                                    {purchaseStore.purchases.length ? (
                                        purchaseStore.purchases.map((purchase) => (
                                            <MDBCard key={purchase.id} className="mb-3">
                                                <MDBCardBody
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <MDBTypography variant="h5" className="mb-2">
                                                        {purchase.flat.name} {purchase.flat.area} кв.м
                                                    </MDBTypography>
                                                    <MDBCardImage
                                                        src={IMG_URL + purchase.flat.image}
                                                        style={{ width: 300, height: 300 }}
                                                        className="mt-3"
                                                    />
                                                    <MDBCardText className="mt-3">
                                                        Цена: {purchase.flat.price} руб.
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        ))
                                    ) : (
                                        <p className="mt-3">Вы пока ничего не приобрели</p>
                                    )}
                                </>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBModal show={deleteModalOpen} setShow={setDeleteModalOpen}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Удаление аккаунта</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleDeleteModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>Вы действительно хотите удалить аккаунт?</p>
                            <p>Все ваши данные будут безвозвратно удалены.</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="light" onClick={toggleDeleteModal}>
                                Отмена
                            </MDBBtn>
                            <MDBBtn color="danger" onClick={handleConfirmDelete}>
                                Удалить
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={passwordModalOpen} setShow={setPasswordModalOpen}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Смена пароля</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={togglePasswordModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                type="password"
                                label="Старый пароль"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <MDBInput
                                type="password"
                                label="Новый пароль"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='mt-3'
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="danger" onClick={togglePasswordModal}>
                                Отмена
                            </MDBBtn>
                            <MDBBtn color="light" onClick={handleSavePassword}>
                                Сохранить
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </MDBContainer>
    );
};

export default observer(Profile);