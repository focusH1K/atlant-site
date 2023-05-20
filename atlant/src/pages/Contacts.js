import React from 'react';
import { Card, Descriptions, Space } from 'antd';
import { FaVk, FaTelegram, FaInstagram } from 'react-icons/fa';

const Contacts = () => {
    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>Наши контакты</h2>
            <Card style={{ width: '600px', margin: '20px auto' }}>
                <Descriptions column={1} labelStyle={{ fontSize: '16px', fontWeight: 'bold' }}>
                    <Descriptions.Item label="Адрес">
                        г. Санкт-Петербург, просп. Александровской фермы, д. 29к3Б
                    </Descriptions.Item>
                    <Descriptions.Item label="Телефон">+7 (999) 613-2969</Descriptions.Item>
                    <Descriptions.Item label="Email">zh.atlant@outlook.com</Descriptions.Item>
                </Descriptions>
            </Card>
            <div className='mt-4' style={{ width: '600px', margin: '20px auto' }}>
            <iframe 
                title='Yandex Map'
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A1eb61458343310d587582bd2e26e1aa9131af277187782793e727e0fe0fc9884&amp;source=constructor" 
                width="100%" 
                height="400" 
                frameborder="0">
            </iframe>
            </div>
            <div className='mt-5' style={{ width: '600px', margin: '20px auto', textAlign: 'center' }}>
                <h5 style={{ marginTop: '10px' }}>Мы в социальных сетях</h5>
                <Space size={24}>
                    <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                        <FaVk style={{ fontSize: '24px' }} />
                    </a>
                    <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                        <FaTelegram style={{ fontSize: '24px' }} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram style={{ fontSize: '24px' }} />
                    </a>
                </Space>
            </div>
        </div>
    );
};

export default Contacts;