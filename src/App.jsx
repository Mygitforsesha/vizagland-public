import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PostPropertyPage } from './pages/PostPropertyPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { PropertySearchPage } from './pages/PropertySearchPage';
import {
  AdvertisementDetailsPage,
  AdvertisementListingPage,
} from './pages/AdvertisementListingPage';

function App() {
  return (
    //<BrowserRouter basename="/~vizagland">
    <BrowserRouter >
   
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/listings" element={<Layout><ListingsPage /></Layout>} />
        <Route path="/search" element={<Layout><PropertySearchPage /></Layout>} />
        <Route path="/property/:id" element={<Layout><PropertyDetailsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/post-property" element={<Layout><PostPropertyPage /></Layout>} />
        <Route path="/ads/:category" element={<Layout><AdvertisementListingPage /></Layout>} />
        <Route path="/ads/:category/:adId" element={<Layout><AdvertisementDetailsPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
