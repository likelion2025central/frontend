import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Background from "../../assets/img/commons/background.png"
import MainLogo from "../../assets/img/commons/main_logo.png"
import Character from "../../assets/img/commons/img_character_happy.png"
import Logo from "../../assets/img/commons/nav_logo.png"

const Main = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL
  const [user, setUser] = useState(null) 
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")

    axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setUser(res.data)  
      })
      .catch((err) => {
        console.error("user/me 불러오기 실패:", err)
		navigate('/login')
		
      })
      .finally(() => {
        setLoading(false)
      })
  }, [BASE_URL])

  if (loading) {
    return <div className="loading">로딩중...</div>
  }



  let title = ""
  let btn1 = {}
  let btn2 = {}

  if (user.role === "STUDENT") {
    title = `캠퍼스와 지역 상권을\n 혜택으로 끈끈하게 연결하다!`
    btn1 = { text: "제휴 둘러보기", path: "/partnership/list" }
    btn2 = { text: "제휴 매칭하기", path: "/partnership/match" }
  } else if (user.role === "COUNCIL") {
    title = `‘${user.council?.schoolName} ${user.council?.college} ${user.council?.department}’ \n 학생회를 환영합니다!`
    btn1 = { text: "희망 제휴 등록하기", path: "/register/student" }
    btn2 = { text: "나의 제휴 관리하기", path: "/management" }
  } else if (user.role === "BOSS") {
    title = `‘${user.boss?.storeName}’ \n 사장님을 환영합니다!`
    btn1 = { text: "제휴 등록하기", path: "/register/shop" }
    btn2 = { text: "나의 제휴 관리하기", path: "/management" }
  }

  return (
    <div className='Main_wrap'>
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>

      <img src={Background} alt="bg" className='bg' />
      <div className="main_contents">
        <div className="title text">{title}</div>

        {user.role === "STUDENT" ? (
          <img src={MainLogo} alt="main logo" />
        ) : (
          <img src={Character} alt="character" />
        )}

        <div className="btns">
          <Link to={btn1.path} className="btn button_nomal">
            {btn1.text}
            <div className="icon" />
          </Link>

          <Link to={btn2.path} className="btn button_nomal">
            {btn2.text}
            <div className="icon" />
          </Link>
        </div>

        <div className="auth_manage">
          <div className="logout text">로그아웃</div>
          <div className="exit text">회원탈퇴</div>
        </div>
      </div>
    </div>
  )
}

export default Main
