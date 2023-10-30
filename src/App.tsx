import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/misc/PrivateRoute';
import './App.css';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { HomePage } from './layouts/HomePage/HomePage';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';

export const App = () => {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <div className='flex-grow-1'>
        <Navbar />            
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/search' element={<SearchBooksPage />}/>
          <Route path='/reviewlist/:bookId' element={<ReviewListPage />}/>
          <Route path='/checkout/:bookId' element={<BookCheckoutPage />}/>            
          <Route path='/shelf' element={<PrivateRoute><ShelfPage/></PrivateRoute>}/>
          <Route path='/messages' element={<PrivateRoute><MessagesPage/></PrivateRoute>}/>
          <Route path='/admin' element={<PrivateRoute><ManageLibraryPage/></PrivateRoute>}/>
        </Routes>
        </div>        
      <Footer />      
    </div>
  );
}
