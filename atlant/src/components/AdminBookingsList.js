import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Row, Col, Card, Typography, Empty } from 'antd';
import { IMG_URL } from '../http';

const { Meta } = Card;
const { Title, Text } = Typography;

const AdminBookingsList = () => {
  const { bookingStore } = useContext(Context);

  useEffect(() => {
    bookingStore.getAllBookings();
  }, [bookingStore]);

  return (
    <div style={{ marginBottom: '50px' }}>
      <div style={{ marginLeft: '20px' }}>
        <Row gutter={[16, 16]}>
          {bookingStore.bookings.length ? (
            bookingStore.bookings.map((booking) => (
              <Col key={booking.id} lg={6} md={12} sm={24}>
                <Card
                  className="h-100 mt-5"
                  style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}
                  cover={<img alt="Flat" src={IMG_URL + booking.flat.image} style={{ objectFit: 'cover', height: '300px' }} />}
                >
                  <Meta
                    title={<Title level={5}>Бронирование №{booking.id}</Title>}
                    description={
                      <>
                        <Text>
                          <strong>Пользователь:</strong> {booking.user.username}
                        </Text>
                        <br />
                        <Text>
                          <strong>Почта:</strong> {booking.user.email}
                        </Text>
                        <br />
                        <Text>
                          <strong>{booking.flat.name} {booking.flat.area} кв.м</strong> 
                        </Text>
                        <br />
                        <Text>
                          <strong>Дата начала бронирования:</strong> {booking.check_in_date}
                        </Text>
                        <br />
                        <Text>
                          <strong>Дата окончания бронирования:</strong> {booking.check_out_date}
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

export default AdminBookingsList;