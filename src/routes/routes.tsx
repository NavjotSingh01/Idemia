import React, { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Master from '../container/master';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          {/* <Route path={''} element={<Example/>} /> */}
          <Route path={''} element={<Master />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default memo(MainRoutes);
