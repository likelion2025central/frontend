import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Splash from './components/Section/Splash'
import Nav from './components/Section/Nav'
import Main from './components/Section/Main'


const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/main' element={<Main />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App