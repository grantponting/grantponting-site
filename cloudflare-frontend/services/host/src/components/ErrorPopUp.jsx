import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function ErrorPopUp({ errorMessage, errorTitle, variant = "danger" }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);  // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timer);  // Clear the timer when component unmounts
    });
    return (
        <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{errorTitle}</Alert.Heading>
            <p>{errorMessage}</p>
        </Alert>
    );
}


export default ErrorPopUp;