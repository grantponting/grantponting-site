// src/routes/AppRoutes.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

// Lazy load the route components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const TestService = lazy(() => import('../pages/TestService'));


const AppRoutes = () => (
    <Suspense
        fallback={
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading page...</span>
                </Spinner>
            </Container>
        }
    >
        <Container className="my-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="profile/:id" element={<UserProfile />} />
                <Route path="test-service" element={<TestService />} />
            </Routes>
        </Container>
    </Suspense>
);

export default AppRoutes;
