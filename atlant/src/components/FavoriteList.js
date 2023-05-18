import React, { useEffect, useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';

const FavoriteList = () => {
    const { favoriteStore, store } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.user) {
            favoriteStore.getAllFavoritesFlats(store.user.id);
        }
    }, [favoriteStore, store]);

    const handleClearFavorite = () => {
        if (store.user) {
            favoriteStore.clearFavorite(store.user.id)
        }
    }

    return (
        <>
        <div>
            {favoriteStore.favorites && favoriteStore.favorites.length ? (
                favoriteStore.favorites.map((favorite) => (
                    <div key={favorite.id} onClick={() => navigate(`/flats/${favorite.flat_id}`)}>
                        <p>{favorite.flat.name}</p>
                        <p>{favorite.flat.price}</p>
                    </div>
                ))
                
            ) : (
                <p>Вам пока что ничего не понравилось и это печально</p>
            )}
        </div>
        <button onClick={handleClearFavorite}>Очистить раздел</button>
        </>
    );
};

export default observer(FavoriteList)