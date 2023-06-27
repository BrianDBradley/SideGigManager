import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard';
import Materials from './pages/materials';
import Products from './pages/products';
import Orders from './pages/orders';
import SignUp from './pages/signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path = "/"
              element = {< Login />}
            />
            <Route 
              path='/signup'
              element= { < SignUp />}
            />
            <Route 
            path = "/dashboard"
            element = {< Dashboard />}
            />
            <Route 
            path = "/materials"
            element = {< Materials />}
            />
            <Route 
            path = "/products"
            element = {< Products />}
            />
            <Route 
            path = "/orders"
            element = {< Orders />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
