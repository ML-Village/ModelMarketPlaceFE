import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from './constants/routing/routes';
import { Home, CreateResource, CreateModel } from './pages';

function App() {

  return (
    <Router>
            <Routes>
                {/* <Route path='/' element={<Home/>}/> */}
                <Route path={ROUTES.home} element={<Home />} />
                <Route path={ROUTES.createresource} element={<CreateResource />} />
                <Route path={ROUTES.createmodel} element={<CreateModel />} />
            </Routes>
        </Router>
  )
}

export default App
