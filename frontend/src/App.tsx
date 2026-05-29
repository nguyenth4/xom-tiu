import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout/ClientLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

// Client Pages
import Home from './pages/client/Home/Home';
import ProductList from './pages/client/ProductList/ProductList';
import ProductDetail from './pages/client/ProductDetail/ProductDetail';
import About from './pages/client/About/About';
import Contact from './pages/client/Contact/Contact';
import Cart from './pages/client/Cart/Cart';
import Auth from './pages/client/Auth/Auth';
// Admin Pages
import Dashboard from './pages/admin/Dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<ProductList />} />
          <Route path="menu/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Auth defaultMode="login" />} />
          <Route path="register" element={<Auth defaultMode="register" />} />
          {/* Other client routes would go here: checkout */}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Other admin routes would go here: products, categories, orders */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
