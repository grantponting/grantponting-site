import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css'

const App = () => {
  return (
    <div className='bg-dark text-light min-vh-100'>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;