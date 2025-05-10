import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css'

const App = () => {
  return (
    <div className='bg-dark text-white min-vh-100' data-bs-theme="dark">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main style={{ marginTop: '70px' }}>
            <AppRoutes />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;