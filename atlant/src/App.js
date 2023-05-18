import React, { useContext, useEffect, useState } from "react";
import { Context } from "./index";
import { observer } from 'mobx-react-lite';
import AppRouter from "./route/AppRouter"
import { MDBSpinner } from "mdb-react-ui-kit";
import { ToastContainer } from "react-toastify";


const App = () => {
  const { store } = useContext(Context);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  useEffect(() => {
    if (!store.isLoading) {
      setAuthChecked(true);
    }
  }, [store.isLoading]);

  if (!authChecked) {
    return (
      <MDBSpinner grow className='ms-2' color='dark'>
            <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default observer(App);