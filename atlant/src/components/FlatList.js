import { useContext, useEffect } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { IMG_URL } from '../http';

const FlatList = () => {
  const { flatStore } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    flatStore.fetchFlats();
  }, [flatStore]);

  return (
    <MDBRow className='g-4'>
      {flatStore.flats.length ? (
        flatStore.flats.map((item) => (
          <MDBCol key={item.id} lg='4' onClick={() => navigate(`/flats/${item.id}`)}>
            <div>
              <h3>{item.name}</h3>
              <h5>Площадь: {item.area} кв. м</h5>
              {item.image && <img style={{ width: 300, height: 300 }} src={IMG_URL + item.image} alt={item.name} />}
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          </MDBCol>
        ))
      ) : (
        <p className='mb-3'>По вашему запросу ничего не найдено</p>
      )}
    </MDBRow>
  );
};

export default observer(FlatList);