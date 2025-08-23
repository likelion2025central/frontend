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

const App = () => {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
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


            </Routes>
        </BrowserRouter>
    )
}

export default App