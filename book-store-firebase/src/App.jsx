import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'

//Pages
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ListingPage from './pages/List'
import HomePage from './pages/Home'
import BookDetailPage from './pages/Detail'
//Components
import MyNavbar from './components/Navbar'

function App() {



  return (
    <div className='flex flex-col bg-slate-600 min-h-screen'>
      <MyNavbar />
      <Routes> 
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/listing' element={<ListingPage/>}/>
        <Route path='/book/view/:bookId' element={<BookDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App
