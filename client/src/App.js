import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import {check} from "./http/userAPI"

import { Spinner } from 'react-bootstrap';
import { fetchTypes } from './http/deviceAPI';


const App = observer (()=> {
//  const {device}=useContext(Context)
  const {user}=useContext(Context)

  const [loading, setLoading]=useState(true)

  useEffect(() => {
      check().then ( data=> {
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
  },[])

  /*
  useEffect(() => {
  fetchTypes().then(data => device.setTypes(data))
},[])
*/

  if (loading) {
    return <Spinner animation={"border"}/>
  }
  return (
    <BrowserRouter>
      <NavBar/>
    
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;