import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css'

const App = () => {
  return (
    <div className='bg-secondary text-white' data-bs-theme="secondary">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <main style={{ marginTop: '75px' }}>
            <AppRoutes />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;