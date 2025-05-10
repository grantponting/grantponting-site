// host/src/TestService.tsx
import React, { lazy, Suspense, useEffect } from 'react';
import { Container } from 'react-bootstrap';
// import T from 'test/Test';

const Test = lazy(() => import('test/Test'));

function TestService() {
    // useEffect(() => {
    //     import('test/Test').then((mod) => {
    //         console.log("mod.default:", mod.default);
    //     });
    // }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Test />
        </Suspense>
    );
}

export default TestService;
