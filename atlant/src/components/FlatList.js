import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { Row, Col, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from '../http';

const FlatList = () => {
  const { flatStore } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    flatStore.fetchFlats();
  }, [flatStore]);

  return (
    <div className='container' style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        {flatStore.flats.length ? (
          flatStore.flats.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={8} onClick={() => navigate(`/flats/${item.id}`)}>
              <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px', cursor: 'pointer' }}>
                <h4>{item.name}</h4>
                <h5>Площадь: {item.area} кв. м</h5>
                {item.image && <img style={{ width: '100%', height: 'auto', marginBottom: '10px' }} src={IMG_URL + item.image} alt={item.name} />}
                <p className='fw-bold' style={{ fontSize: '20px'}}>{item.price} руб.</p>
              </div>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty description='По вашему запросу ничего не найдено' />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default observer(FlatList);