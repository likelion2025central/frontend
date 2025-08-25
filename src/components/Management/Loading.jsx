import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Character from "../../assets/img/commons/img_character_worry.png"

const Loading = ({ Loading}) => {
  const [dots, setDots] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (Loading === false) {
      navigate('/recommendlist') 
    }
  }, [Loading, navigate])

  return (
    <div className='loading_wrap container'>
      <img src={Character} alt="" />
      <p>최적의 제휴처 매칭 중{dots}</p>
    </div>
  )
}

export default Loading
