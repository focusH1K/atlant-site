import React, { useContext, useState } from 'react';
import { Tabs, Badge } from 'antd';
import UserList from './UserList';
import { observer } from 'mobx-react-lite';
import CategoryBar from './CategoryBar';
import AdminBookingsList from './AdminBookingsList';
import AdminPurchasesList from './AdminPurchasesList';
import { Context } from '../index';

const { TabPane } = Tabs;

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState('1');
  const { flatStore } = useContext(Context);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tabs activeKey={activeTab} onChange={handleTabChange} className="m-3">
        <TabPane tab="Список пользователей" key="1" className="text-dark">
          <UserList />
        </TabPane>
        <TabPane tab="Квартиры" key="2" className="text-dark">
          <CategoryBar />
          <div className="text-center mt-5">
            <Badge color="dark" className="me-3" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              Всего квартир: {flatStore.totalFlatsCount}
            </Badge>
            <Badge color="dark" className="me-3" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              Куплено: {flatStore.purchasedCount}
            </Badge>
            <Badge color="dark" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              Забронировано: {flatStore.reservedCount}
            </Badge>
          </div>
        </TabPane>
        <TabPane tab="Покупки" key="3" className="text-dark">
          <AdminPurchasesList />
        </TabPane>
        <TabPane tab="Бронирования" key="4" className="text-dark">
          <AdminBookingsList />
        </TabPane>
      </Tabs>
    </>
  );
};

export default observer(AdminSidebar);