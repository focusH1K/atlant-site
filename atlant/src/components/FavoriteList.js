import React, { useEffect, useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const FavoriteList = () => {
    const { favoriteStore, store } = useContext(Context)

    useEffect(() => {
        if (store.user) {
            favoriteStore.getAllFavoritesFlats(store.user.id);
        }
    }, [favoriteStore, store]);

    return (
        <div>
            {favoriteStore.favorites && favoriteStore.favorites.length ? (
                favoriteStore.favorites.map((favorite) => (
                    <div key={favorite.id}>
                        <p>{favorite.flat.name}</p>
                        <p>{favorite.flat.price}</p>
                    </div>
                ))
            ) : (
                <p>Раздел пуст</p>
            )}
        </div>
    );
};

export default observer(FavoriteList)