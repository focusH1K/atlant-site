import UserService from "../service/userService";
import React, { useState, useEffect, useContext } from 'react';
import { observer } from "mobx-react-lite";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
} from 'mdb-react-ui-kit';
import { Context } from "../index";
import FlatList from "./FlatList";
import { Form } from "react-bootstrap";

const CategoryBar = () => {
    const { store } = useContext(Context)
    const [categories, setCategories] = useState([]);
    const [verticalActive, setVerticalActive] = useState('');
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [area, setArea] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const { flatStore } = useContext(Context);

    const toggleShow = () => setModalOpen(!modalOpen)

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await UserService.fetchCategories();
                setCategories(response.data);
                setVerticalActive('')
                await flatStore.fetchFlats('')
            } catch (e) {
                console.log(e);
            }
        }

        getCategories();
    }, []);

    const handleCreate = async () => {
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('price', price);
            data.append('area', area);
            if (selectedCategoryId) {
                data.append('category_id', selectedCategoryId);
            }
            data.append('image', image, image.name);
            await flatStore.createFlat(data);
            await flatStore.fetchFlats()
            setModalOpen(false);
            console.log(name, description, area, price, selectedCategoryId, image);
    };

    const handleVerticalClick = async (category_id) => {
        if (category_id === verticalActive) {
            return;
        }

        try {
            if (category_id === '') {
                await flatStore.fetchFlats();
            } else {
                await flatStore.fetchFlats(category_id);
            }
            setVerticalActive(category_id);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <MDBRow className="mt-5">
                <MDBCol size='3'>
                    <MDBTabs pills className='flex-column text-center'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('')} active={verticalActive === ''}>
                                Все
                            </MDBTabsLink>
                        </MDBTabsItem>
                        {categories.map(item => (
                            <MDBTabsItem key={item.id}>
                                <MDBTabsLink onClick={() => handleVerticalClick(item.id)} active={verticalActive === item.id}>
                                    {item.name}
                                </MDBTabsLink>
                            </MDBTabsItem>
                        ))}
                        <MDBTabsItem>
                            {store.isAdmin && (
                                <MDBBtn size='md' rounded color='primary' className='me-2 mt-2' onClick={toggleShow}>
                                    Добавить квартиру
                                </MDBBtn>
                            )}
                        </MDBTabsItem>
                    </MDBTabs>
                </MDBCol>
                <MDBCol size='9'>
                    <MDBTabsContent>
                        <MDBTabsPane show={verticalActive === ''}>
                            <FlatList />
                        </MDBTabsPane>
                        {categories.map(item => (
                            <MDBTabsPane key={item.id} show={verticalActive === item.id}>
                                <FlatList category_id={item.id} />
                            </MDBTabsPane>
                        ))}
                    </MDBTabsContent>
                </MDBCol>
                <MDBModal show={modalOpen} setShow={setModalOpen}>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Добавление квартиры</MDBModalTitle>
                                <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput label='Название' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                <MDBInput label='Описание' type='text' value={description} onChange={(e) => setDescription(e.target.value)} className="mt-3" />
                                <MDBInput label='Площадь' type='number' value={area} onChange={(e) => setArea(e.target.value)} className="mt-3" />
                                <MDBInput label='Цена' type='number' value={price} onChange={(e) => setPrice(e.target.value)} className="mt-3" />
                                <Form.Select
                                    className="mt-3"
                                    value={selectedCategoryId}
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                                >
                                    <option value="">Категория</option>
                                    {categories &&
                                        categories.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </Form.Select>

                                <MDBInput
                                    label=""
                                    type="file"
                                    accept=".jpg"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="mt-3"
                                />

                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='danger' onClick={toggleShow}>
                                    Закрыть
                                </MDBBtn>
                                <MDBBtn color='light' onClick={handleCreate}>Добавить</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </MDBRow>
        </>
    );
};

export default observer(CategoryBar);