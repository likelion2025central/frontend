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
import ManageDetail from './components/Management/ManageDetail'
import Partnership from './components/Partnership/Partnership'


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
        <Route path='/management/detail/:id?' element={<ManageDetail />} />
        <Route path='/management/editdocx/:id?' element={<EditDocx />} />
        <Route path='/recommendlist' element={<RecommendList />} />
        <Route path='/partnership' element={<Partnership />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App