import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Splash from './components/Section/Splash'
import Nav from './components/Section/Nav'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Splash />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App