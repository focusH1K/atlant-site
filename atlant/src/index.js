import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';
import FlatStore from './store/flatStore';
import FavoriteStore from './store/favoriteStore'
import BookingStore from './store/bookingStore';
import PurchaseStore from './store/purchaseStore'

const store = new Store();
const flatStore = new FlatStore()
const favoriteStore = new FavoriteStore()
const bookingStore = new BookingStore()
const purchaseStore = new PurchaseStore()

export const Context = createContext({
  store,
  flatStore, 
  favoriteStore,
  bookingStore,
  purchaseStore
});


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Context.Provider value={{ store, flatStore, favoriteStore, bookingStore, purchaseStore }}>
    <App />
  </Context.Provider>
)