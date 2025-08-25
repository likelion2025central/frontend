import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Background from "../../assets/img/commons/background.png"
import MainLogo from "../../assets/img/commons/main_logo.png"
import Character from "../../assets/img/commons/img_character_happy.png"
import Logo from "../../assets/img/commons/nav_logo.png"

const Main = () => {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  // 버튼 세트만 공통 관리
  const roleButtons = {
    DEFAULT: [
      { text: "제휴 둘러보기", path: "/partnership/list" },
      { text: "제휴 매칭하기", path: "/partnership/match" },
    ],
    COUNCIL: [
      { text: "희망 제휴 등록하기", path: "/register/student" },
      { text: "나의 제휴 관리하기", path: "/management" },
    ],
    BOSS: [
      { text: "제휴 등록하기", path: "/register/shop" },
      { text: "나의 제휴 관리하기", path: "/management" },
    ],
  }

  const onLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log("서버 응답:", res.data)
        setUser(res.data)
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err)
      })
  }, [BASE_URL, token])


  let title = "캠퍼스와 지역 상권을\n 혜택으로 끈끈하게 연결하다!"
  if (role === "COUNCIL" && user) {
    title = `${user.council.college} ${user.council.department} ${user.council.schoolName} 학생회를 환영합니다!`
  } else if (role === "BOSS" && user) {
    title = `${user.boss.storeName} 사장님을 환영합니다!`
  }


 
  const buttons = roleButtons[role] || roleButtons.DEFAULT

  return (
    <div className='Main_wrap'>
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>

      <img src={Background} alt="bg" className='bg' />
      <div className="main_contents">
        <div className="title text">{title}</div>

        {role === "COUNCIL" ? (
          <img src={MainLogo} alt="main logo" />
        ) : (
          <img src={Character} alt="character" />
        )}

        <div className="btns">
          <Link to={buttons[0].path} className="btn button_nomal">
            {buttons[0].text}
            <div className="icon" />
          </Link>

          <Link to={buttons[1].path} className="btn button_nomal">
            {buttons[1].text}
            <div className="icon" />
          </Link>
        </div>

        <div className="auth_manage">
          <div className="logout text" onClick={onLogout}>로그아웃</div>
          <div className="exit text">회원탈퇴</div>
        </div>
      </div>
    </div>
  )
}

export default Main
