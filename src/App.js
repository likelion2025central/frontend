import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Splash from './components/Section/Splash'
import Nav from './components/Section/Nav'
import Main from './components/Section/Main'
import Management from './components/Management/Management'
import RegPart from './components/Management/RegPart'
import CurPart from './components/Management/CurPart'
import EditDocx from './components/Management/EditDocx'
import RecommendList from './components/Recommend/RecommendList'


const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/main' element={<Main />} />
        <Route path='/management' element={<Management />} />
        <Route path='/management/regpart' element={<RegPart />} />
        <Route path='/management/currentpartner/:id?' element={<CurPart />} />
        <Route path='/management/editdocx/:id?' element={<EditDocx />} />
        <Route path='/recommendlist' element={<RecommendList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App