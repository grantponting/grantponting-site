// src/routes/AppRoutes.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load the route components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const UserProfile = lazy(() => import('../pages/UserProfile'));

const AppRoutes = () => (
    <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="profile/:id" element={<UserProfile />} />
        </Routes>
    </Suspense >
);

export default AppRoutes;
