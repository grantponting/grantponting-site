// src/routes/AppRoutes.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

// Lazy load the route components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const TestService = lazy(() => import('../pages/TestService'));
const AutomationTest = lazy(() => import('../pages/AutomationTest'));
const RealEstateTest = lazy(() => import('../pages/real-estate-test/RealEstateTest'));
const RealEstateGalleryTest = lazy(() => import('../pages/real-estate-test/gallery'));
const RealEstatePricesTest = lazy(() => import('../pages/real-estate-test/Prices'));
const RealEstateReviewsTest = lazy(() => import('../pages/real-estate-test/Reviews'));
const BookTest = lazy(() => import('../pages/BookTest'));


const AppRoutes = () => (
    <Suspense
        fallback={
            <Container className="text-center my-2">
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
                <Route path="automation-test" element={<AutomationTest />} />
                <Route path="real-estate-test" element={<RealEstateTest />} />
                <Route path="real-estate-test/gallery" element={<RealEstateGalleryTest />} />
                <Route path="real-estate-test/reviews" element={<RealEstateReviewsTest />} />
                <Route path="real-estate-test/prices" element={<RealEstatePricesTest />} />
                <Route path="book-test" element={<BookTest />} />
                <Route path="profile/:id" element={<UserProfile />} />
                <Route path="test-service" element={<TestService />} />
            </Routes>
        </Container>
    </Suspense>
);

export default AppRoutes;
