import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { IMG_URL } from "../../http";
import { Card, Button, Modal, Form, Input, DatePicker, Row, Col, Spin } from 'antd';
import 'antd/es/card/style/index'
import AuthService from "../../service/authService";
import styles from './FlatItem.module.css'

const { confirm } = Modal;

const FlatItem = () => {
    const { favoriteStore } = useContext(Context);
    const { store } = useContext(Context);
    const { flatStore, bookingStore, purchaseStore } = useContext(Context);
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("available");
    const [modalBooking, setModalBooking] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passport, setPassport] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [modalPurchase, setModalPurchase] = useState(false);

    const toggleShow = () => setModalOpen(!modalOpen);
    const toggleShowBooking = () => setModalBooking(!modalBooking);
    const toggleShowPurchase = () => setModalPurchase(!modalPurchase);

    const handleBooking = () => {
        bookingStore.bookFlat(
            store.user.id,
            flatStore.flat.id,
            startDate,
            endDate,
            firstName,
            lastName,
            passport
        );
        setModalBooking(false);
        flatStore.flat.status = "reserved";
    };

    const handlePurchase = () => {
        purchaseStore.createPurchase(
            store.user.id,
            flatStore.flat.id,
            new Date(),
            firstName,
            lastName
        );
        setModalPurchase(false);
        flatStore.flat.status = "not available";
    };

    const handleAddToFavorite = async () => {
        try {
            await favoriteStore.addToFavorite(flatStore.flat.id, store.user.id);
            setIsFavorite(true);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteFromFavorite = async () => {
        try {
            await favoriteStore.deleteOneFlat(flatStore.flat.id, store.user.id);
            setIsFavorite(false);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        flatStore.fetchFlatById(id);
        const getStatus = async () => {
            try {
                const favorites = await AuthService.getStatusFavorite(
                    store.user.id,
                    id
                );
                setIsFavorite(favorites.data);
            } catch (e) {
                console.log(e);
            }
        };

        getStatus();
    }, [id, flatStore, store.user.id]);

    const handleSave = () => {
        const data = new FormData();
        data.append("price", price);
        data.append("status", status);
        if (image) {
            data.append("image", image, image.name);
        }
        flatStore.updateFlat(id, data);
        setModalOpen(false);
    };

    if (!flatStore.flat) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="my-5" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="flex-column">
                <Card
                    className={styles['custom-card']}
                    style={{
                        width: '100%',
                        maxWidth: 1200,
                        height: 'auto',
                    }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                        {flatStore.flat.image ? (
                            <img
                            src={IMG_URL + flatStore.flat.image}
                            alt={flatStore.flat.name}
                            style={{ width: '100%' }}
                        />
                        ) : (
                            <Spin />
                        )}
                            
                        </Col>
                        <Col xs={24} sm={12}>
                            <div>
                                <h2>{flatStore.flat.name} {flatStore.flat.area} кв.м</h2>
                                <p style={{ fontSize: '24px'}}>{flatStore.flat.description}</p>
                                <p className='fw-bold' style={{ fontSize: '20px'}}>Цена: {flatStore.flat.price} руб.</p>
                            </div>
                        </Col>
                    </Row>
                </Card>
                {store.isAuth ? (
                    <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem',
                    }}
                >
                    {store.user.role === 'admin' && (
                        <div>
                            <Button className={styles['button-size']} onClick={toggleShow} type="primary" danger>
                            <strong>Изменить</strong>
                            </Button>
                            <Button
                                className={styles['button-size']}
                                onClick={() =>
                                    confirm({
                                        title: 'Вы действительно хотите удалить эту квартиру?',
                                        content: 'После удаления квартира будет недоступна пользователям',
                                        okText: 'Да',
                                        okType: 'danger',
                                        cancelText: 'Отмена',
                                        onOk() {
                                            flatStore.deleteFlat(flatStore.flat.id);
                                        },
                                    })
                                }
                                type="primary"
                                danger
                            >
                                <strong>Удалить</strong>
                            </Button>
                        </div>
                    )}
                    {flatStore.flat.status === 'available' ? (
                        <>
                        <Button className={styles['button-size']} onClick={toggleShowBooking} type="primary">
                            <strong>Забронировать</strong>
                        </Button>
                        <Button className={styles['button-size']} onClick={toggleShowPurchase} type="primary">
                        <strong>Купить</strong>
                        </Button>
                        </>
                    ) : flatStore.flat.status === 'reserved' ? (
                        <Button className={styles['button-size']} onClick={toggleShowPurchase} type="primary">
                            <strong>Купить</strong>
                        </Button>
                    
                    ) : (
                        null
                    )}
                    {isFavorite ? (
                        <Button className={styles['button-size']} onClick={handleDeleteFromFavorite} type="primary" danger>
                            <strong>Удалить из избранного</strong>
                        </Button>
                    ) : (
                        <Button className={styles['button-size']} onClick={handleAddToFavorite} type="primary">
                            <strong>В избранное</strong>
                        </Button>
                    )}
                </div>
                ) : (
                    null
                )}
            </div>
            <Modal
                title="Редактировать квартиру"
                open={modalOpen}
                onCancel={toggleShow}
                footer={[
                    <Button key="back" onClick={toggleShow}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" style={{ background: 'rgba(25, 25, 112, 0.8)' }} onClick={handleSave}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Цена">
                        <Input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Статус">
                        <select
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="available">Доступно</option>
                            <option value="reserved">Забронировано</option>
                            <option value="not available">Недоступно</option>
                        </select>
                    </Form.Item>
                    <Form.Item label="Изображение">
                        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Бронирование"
                open={modalBooking}
                onCancel={toggleShowBooking}
                footer={[
                    <Button key="back" onClick={toggleShowBooking}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" style={{ background: 'rgba(25, 25, 112, 0.8)' }} onClick={handleBooking}>
                        Забронировать
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Имя">
                        <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Фамилия">
                        <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Паспорт">
                        <Input
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Дата начала бронирования">
                        <DatePicker
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </Form.Item>
                    <Form.Item label="Дата окончания бронирования">
                        <DatePicker
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Заявка на покупку"
                open={modalPurchase}
                onCancel={toggleShowPurchase}
                footer={[
                    <Button key="back" onClick={toggleShowPurchase}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" style={{ background: 'rgba(25, 25, 112, 0.8)' }} onClick={handlePurchase}>
                        Оставить заявку
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item label="Имя">
                        <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Фамилия">
                        <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default observer(FlatItem);