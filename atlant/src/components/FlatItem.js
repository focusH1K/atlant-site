import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import { Context } from "../index";
import { observer } from 'mobx-react-lite'
import { IMG_URL } from '../http'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from "react-bootstrap";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBSpinner
} from 'mdb-react-ui-kit';

const FlatItem = () => {
    const { favoriteStore } = useContext(Context)
    const { store } = useContext(Context);
    const { flatStore, bookingStore, purchaseStore } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(favoriteStore.isFavorite(flatStore.flat?.id))
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('available')

    const [modalBooking, setModalBooking] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [passport, setPassport] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 14)

    const [modalPurchase, setModalPurchase] = useState(false)

    const toggleShow = () => setModalOpen(!modalOpen)
    const toggleShowBooking = () => setModalBooking(!modalBooking)
    const toggleShowPurchase = () => setModalPurchase(!modalPurchase)

    const handleBooking = () => {
        bookingStore.bookFlat(store.user.id, flatStore.flat.id, startDate, endDate, firstName, lastName, passport)
        setModalBooking(false)
    }

    const handlePurchase = () => {
        purchaseStore.createPurchase(store.user.id, flatStore.flat.id, new Date(), firstName, lastName)
        setModalPurchase(false)   
    }

    const handleAddToFavorite = async () => {
        if (isFavorite) {
            await favoriteStore.deleteOneFlat(flatStore.flat.id, store.user.id)
            setIsFavorite(false);
        } else {
            await favoriteStore.addToFavorite(flatStore.flat.id, store.user.id)
            setIsFavorite(true) 
        }
    }

    useEffect(() => {
        setIsFavorite(favoriteStore.isFavorite(flatStore.flat.id))
    }, [favoriteStore.favorites, flatStore.flat])

    useEffect(() => {
        flatStore.fetchFlatById(id);
    }, [id, flatStore]);

    const handleSave = () => {
        const data = new FormData();
        data.append("price", price);
        data.append("status", status)
        if (image) {
            data.append("image", image, image.name);
        }
        flatStore.updateFlat(id, data);
        setModalOpen(false);
    };

    if (!flatStore.flat) {
        return <p>Загрузка...</p>
    }

    return (
        <MDBContainer className='my-5'>
            <MDBCard>
                <div className="row">
                    <div className="col-md-6">
                        {flatStore.flat.image ? (
                            <MDBCardImage overlay src={IMG_URL + flatStore.flat?.image} alt={flatStore.flat?.name} style={{ width: 500, height: 500 }} position='' />
                        ) : (
                            <MDBSpinner grow color='dark' />
                        )}
                    </div>
                    <div className="col-md-6">
                        <MDBCardBody>
                            <h2 className='fw-bold'>{flatStore.flat?.name}</h2>
                            <p className='fs-2 fw-bold'>{flatStore.flat?.area} кв. м</p>
                            <p className='fs-4'>{flatStore.flat?.description}</p>
                            <p className='fs-2 fw-bold'>{flatStore.flat?.price} руб.</p>
                            {store.isAuth ? (
                                <React.Fragment>
                                    <div className='justify-content-end'>
                                        {!isFavorite ? (
                                            <div>
                                                <MDBBtn onClick={handleAddToFavorite}>Добавить в избранное</MDBBtn>
                                            </div>
                                        ) : (
                                            <MDBBtn onClick={handleAddToFavorite}>Удалить из избранного</MDBBtn>
                                        )}
                                    </div>

                                    {store.isAdmin && (
                                        <MDBBtn size='md' rounded color='dark' className='me-2' onClick={toggleShow}>
                                            Редактировать
                                        </MDBBtn>
                                    )}
                                    {flatStore.flat.status === 'reserved' ? (
                                        <>
                                            <MDBBtn size='md' disabled rounded color='primary' className='me-2'>
                                                Забронирована
                                            </MDBBtn>
                                            <MDBBtn size='md' rounded color='primary' className='me-2' onClick={toggleShowPurchase}>
                                                Приобрести
                                            </MDBBtn>
                                        </>
                                    ) : flatStore.flat.status === 'not available' ? (
                                        <MDBBtn size='md' disabled rounded color='primary' className='me-2'>
                                            Приобретена
                                        </MDBBtn>
                                    ) : (
                                        <>
                                            <MDBBtn size='md' rounded color='primary' className='me-2' onClick={toggleShowBooking}>
                                                Забронировать
                                            </MDBBtn>
                                            <MDBBtn size='md' rounded color='primary' className='me-2' onClick={toggleShowPurchase}>
                                                Приобрести
                                            </MDBBtn>
                                        </>
                                    )}
                                </React.Fragment>
                            ) : (
                                <div></div>
                            )}
                        </MDBCardBody>
                    </div>
                </div>
            </MDBCard>
            <MDBModal show={modalPurchase} setShow={setModalPurchase}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Оставление заявки</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleShowPurchase}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label='Имя' type="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <MDBInput label='Фамилия' type="name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-3" />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="danger" onClick={toggleShowPurchase}>
                                Отмена
                            </MDBBtn>
                            <div>
                                <MDBBtn color="light" onClick={handlePurchase}>
                                    Оставить заявку
                                </MDBBtn>
                            </div>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal show={modalBooking} setShow={setModalBooking}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Бронирование квартиры</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleShowBooking}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label='Имя' type="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <MDBInput label='Фамилия' type="name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-3" />
                            <MDBInput label='Пасспортные данные' type="text" value={passport} onChange={(e) => setPassport(e.target.value)} className="mt-3" />
                            <div className='d-flex mt-3'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={maxDate}
                                    placeholderText="Выберите дату начала бронирования"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    showMonthDropdown
                                    className="border border-gray-400 p-2 rounded-md"
                                    style={{ outline: "none", boxShadow: "0 0 0 2px #90cdf4" }}
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={maxDate}
                                    placeholderText="Выберите дату конца бронирования"
                                    showYearDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={100}
                                    showMonthDropdown
                                    className="bg-gray-100 border border-gray-400 p-2 rounded-md"
                                />
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="danger" onClick={toggleShowBooking}>
                                Отмена
                            </MDBBtn>
                            <MDBBtn color="light" onClick={handleBooking}>
                                Забронировать
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal show={modalOpen} setShow={setModalOpen}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Редактирование квартиры</MDBModalTitle>
                            <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label='Цена' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                            <MDBInput label='' type='file' accept='.jpg' onChange={(e) => setImage(e.target.files[0])} className="mt-3" />
                            <Form.Select className="mt-3" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="available">Доступна</option>
                                <option value="reserved">Забронирована</option>
                                <option value="not available">Не доступна</option>
                            </Form.Select>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleShow}>
                                Закрыть
                            </MDBBtn>
                            <MDBBtn color='light' onClick={handleSave}>Сохранить</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </MDBContainer >
    )
}

export default observer(FlatItem)