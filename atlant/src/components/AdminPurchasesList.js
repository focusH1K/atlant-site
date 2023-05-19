import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Row, Col, Card, Typography, Empty } from 'antd';
import { IMG_URL } from '../http';

const { Meta } = Card;
const { Title, Text } = Typography;

const AdminPurchasesList = () => {
  const { purchaseStore } = useContext(Context);

  useEffect(() => {
    purchaseStore.getAllPurchases();
  }, [purchaseStore]);

  return (
    <div style={{ marginBottom: '50px'}}>
      <div style={{ marginLeft: '20px' }}>
        <Row gutter={[16, 16]}>
          {purchaseStore.purchases.length ? (
            purchaseStore.purchases.map((purchase) => (
              <Col key={purchase.id} lg={6} md={12} sm={24}>
                <Card
                  className="h-100 mt-5"
                  style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}
                  cover={<img alt="Flat" src={IMG_URL + purchase.flat.image} style={{ objectFit: 'cover', height: '300px' }} />}
                >
                  <Meta
                    title={<Title level={5}>Покупка №{purchase.id}</Title>}
                    description={
                      <>
                        <Text>
                          <strong>Пользователь:</strong> {purchase.user.username}
                        </Text>
                        <br />
                        <Text>
                          <strong>Почта:</strong> {purchase.user.email}
                        </Text>
                        <br />
                        <Text>
                          <strong>{purchase.flat.name} {purchase.flat.area} кв.м</strong> 
                        </Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))
          ) : (
            <div className='m-auto'>
              <Empty description="По вашему запросу ничего не найдено" className="mb-3" />
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default AdminPurchasesList;