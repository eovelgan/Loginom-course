import React, { Component, useContext } from 'react'
import { Routes, Roure, Navigate, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE, MAINSVED_ROUTE, START_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context)

  console.log(user)

  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />}
          exact />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />}
          exact />
      )}
      <Route path='*' element={<Navigate to={START_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;