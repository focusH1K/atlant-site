import React, { useContext, useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBadge
} from 'mdb-react-ui-kit';
import UserList from './UserList'
import { observer } from 'mobx-react-lite'
import CategoryBar from './CategoryBar';
import AdminBookingsList from './AdminBookingsList';
import AdminPurchasesList from './AdminPurchasesList';
import { Context } from '../index';

const AdminSidebar = () => {
    const [fillActive, setFillActive] = useState('tab1')
    const { flatStore } = useContext(Context)

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return
        }

        setFillActive(value)
    }

    return (
        <>
            <MDBTabs color='dark' justify className='mb-3 mt-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'} className='text-dark'>
                        Список пользователей
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'} className='text-dark'>
                        Квартиры
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'} className='text-dark'>
                        Покупки
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab4')} active={fillActive === 'tab4'} className='text-dark'>
                        Бронирования
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={fillActive === 'tab1'}>
                    <UserList />
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === 'tab2'}>
                    <CategoryBar />
                    <div className="text-center mt-5">
                        <MDBBadge color='dark' className="me-3" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                            Всего квартир: {flatStore.totalFlatsCount}
                        </MDBBadge>
                        <MDBBadge color='dark' className="me-3" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                            Куплено: {flatStore.purchasedCount}
                        </MDBBadge>
                        <MDBBadge color='dark' style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                            Забронировано: {flatStore.reservedCount}
                        </MDBBadge>
                    </div>
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === 'tab3'}>
                    <AdminPurchasesList />
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === 'tab4'}>
                    <AdminBookingsList />
                </MDBTabsPane>
            </MDBTabsContent>

        </>
    )
};

export default observer(AdminSidebar)