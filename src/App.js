import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Splash from './components/Section/Splash'
import Nav from './components/Section/Nav'
import Login from './components/User/Login/Login'
import Join from './components/User/Join/Join'
import Splash_Step from './components/Section/Splash_Step'
import Join_Student from './components/User/Join/Join_Student'
import Join_Store from './components/User/Join/Join_Store'
import Normal from './components/User/Normal/Normal'
import Normal_Detail from './components/User/Normal/Normal_Detail'

import Main from './components/Section/Main'
import Management from './components/Management/Management'
import RegPart from './components/Management/RegPart'
import CurPart from './components/Management/CurPart'
import RecommendList from './components/Recommend/RecommendList'
import ManageDetail from './components/Management/ManageDetail'
import Partnership from './components/Partnership/Partnership'
import Register from './components/Register/Register'
import Associations from './components/Partnership/Associations'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {/* Splash */}
        <Route path='/' element={<Splash />} />
        <Route path='/splash_step' element={<Splash_Step />} />

        {/* login/join */}
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/join_student' element={<Join_Student />} />
        <Route path='/join_store' element={<Join_Store />} />

        {/* 일반 학생들 사용 */}
        <Route path='/normal_main' element={<Normal />} />
        <Route path='/normal_detail/:college/:faculty/:major' element={<Normal_Detail />} />

        {/* main */}
        <Route path='/main' element={<Main />} />
        <Route path='/management' element={<Management />} />
        <Route path='/management/regpart' element={<RegPart />} />
        <Route path='/management/currentpartner/:id?' element={<CurPart />} />
        <Route path='/management/detail/:id?' element={<ManageDetail />} />
        <Route path='/recommendlist/:id' element={<RecommendList />} />
        <Route path='/partnership' element={<Partnership />} />
        <Route path='/partnership/write/:id' element={<Partnership />} />
        <Route path='/partnership/detail/:id' element={<Associations />} />


        {/* Register */}
        <Route path='/register/:type' element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App