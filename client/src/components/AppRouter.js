import React, { Component, useContext } from 'react'
import { Routes, Navigate, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { START_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context)

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