import React, { useEffect, useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Empty, Button, Card } from 'antd';
import { IMG_URL } from '../http';

const { Meta } = Card;

const FavoriteList = () => {
  const { favoriteStore, store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.user) {
      favoriteStore.getAllFavoritesFlats(store.user.id);
    }
  }, [favoriteStore, store]);

  const handleClearFavorite = () => {
    if (store.user) {
      favoriteStore.clearFavorite(store.user.id);
    }
  };

  return (
    <>
      <div className='d-flex'>
        {favoriteStore.favorites && favoriteStore.favorites.length ? (
          favoriteStore.favorites.map((favorite) => (
            <Card
              key={favorite.id}
              onClick={() => navigate(`/flats/${favorite.flat_id}`)}
              hoverable
              style={{ marginBottom: '10px', cursor: 'pointer', marginLeft: '20px' }}
            >
                <img alt={favorite.flat.name} src={IMG_URL + favorite.flat.image}  width={300}/>
              <Meta title={favorite.flat.name} description={`Цена: ${favorite.flat.price} руб. | Площадь: ${favorite.flat.area} кв.м`} />
            </Card>
          ))
        ) : (
            <div className='m-auto'>
              <Empty description="Вам пока что ничего не понравилось, и это печально" />
            </div>
          
        )}
      </div>
      <div className='ms-3'>
      <Button type="primary" danger onClick={handleClearFavorite}>
        Очистить раздел
      </Button>
      </div>
    </>
  );
};

export default observer(FavoriteList);