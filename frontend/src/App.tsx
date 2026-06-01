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
import Feed from './pages/client/Feed/Feed';
import FeedDetail from './pages/client/FeedDetail/FeedDetail';
import Activities from './pages/client/Activities/Activities';
import Success from './pages/client/Checkout/Success';
// Admin Pages
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AdminProducts from './pages/admin/Products/Products';
import AdminOrders from './pages/admin/Orders/Orders';
import OrderDetail from './pages/admin/OrderDetail/OrderDetail';
import AdminCustomers from './pages/admin/Customers/Customers';
import AdminCategories from './pages/admin/Categories/Categories';

import './App.css';

import CustomerService from './pages/client/CustomerService/CustomerService';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<ProductList />} />
          <Route path="menu/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<FeedDetail />} />
          <Route path="activities" element={<Activities />} />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          <Route path="login" element={<Auth defaultMode="login" />} />
          <Route path="register" element={<Auth defaultMode="register" />} />
          <Route path="customer-service" element={<CustomerService />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="categories" element={<AdminCategories />} />
          {/* Other admin routes would go here: categories */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
