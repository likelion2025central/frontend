import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Logo from "../../assets/img/commons/nav_logo.png"
import Refresh from "../../assets/img/manage/refresh.svg"
import CheckOff from "../../assets/img/commons/button_check_off.svg"
import CheckOn from "../../assets/img/commons/button_check.svg"

import SendRequest from './SendRequest'
import Modal from './Modal'
import Loading from '../Management/Loading'
import Detail from './Detail'

const RecommendList = () => {
  const { id } = useParams()
  const BASE_URL = process.env.REACT_APP_API_BASE_URL

  const [partners, setPartners] = useState([])
  const [checked, setChecked] = useState([])
  const [showRequest, setShowRequest] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedPartner, setSelectedPartner] = useState(null)

  const fetchPartners = () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role").toLowerCase()
    axios.get(`${BASE_URL}/match/${role}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("추천 리스트 응답:", res.data)
        const list = res.data || []
        setPartners(list)
        setChecked(Array(list.length).fill(false))
      })
      .catch((err) => {
        console.error("추천 리스트 불러오기 실패:", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPartners()
  }, [id, BASE_URL])

  const toggleCheck = (index, e) => {
    e.stopPropagation() // 체크 시 모달 안 열리게
    setChecked((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]
      return newState
    })
  }

  const handleRequest = () => {
    const count = checked.filter(Boolean).length
    if (count > 0) {
      setShowRequest(true)
    } else {
      alert("제휴사를 하나 이상 선택해주세요.")
    }
  }

  const role = localStorage.getItem("role")?.toLowerCase()

  return (
    <div className='recommendlist_wrap container'>
      {loading && <Loading Loading={loading} />}
      <Link to='/'>
        <img src={Logo} alt="logo" className="logo" />
      </Link>
      <div className="contents">
        <div className="title">
          제휴사 추천 리스트
          <div
            className="tag"
            onClick={fetchPartners}
            style={{ cursor: "pointer" }}
          >
            새로고침
            <img src={Refresh} alt="" />
          </div>
        </div>

        {/* ✅ 스크롤 리스트 */}
        <div className="list_scroll">
          {partners.map((partner, index) => (
            <div
              className="box_nomal"
              key={`${role}-${index}-${partner.bossAssocId || partner.councilAssocId}`}
              onClick={() => {
                setSelectedPartner(partner)
                setShowModal(true)
              }}
            >
              <div
                className="checkbox"
                onClick={(e) => toggleCheck(index, e)}
                style={{ cursor: "pointer" }}
              >
                <img src={checked[index] ? CheckOn : CheckOff} alt="" />
              </div>

              {role === "council" ? (
                <>
                  <img src={partner.storeImg} alt={partner.storeName} />
                  <div className="info">
                    <div className="inner">
                      <div className="name">
                        <p className='cate'>{partner.industry}</p>
                        {partner.storeName}
                      </div>
                      <div className="tag">
                        추천도 {(partner.suitability * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="icon"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="info shop">
                    <div className="inner">
                      <div className="name">
                        {`${partner.targetSchool} ${partner.targetCollege} ${partner.targetDepartment}`}
                      </div>
                      <div className="tag">
                        추천도 {(partner.suitability * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="icon"></div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="button_nomal" onClick={handleRequest}>
        제휴 요청하기
      </div>

      {showRequest && (
        <SendRequest
          id={id}
          partners={partners
            .filter((_, idx) => checked[idx])
            .map((p) => {
              if (role === "council") {
                return { id: p.bossAssocId, name: p.storeName }
              } else {
                return {
                  id: p.councilAssocId,
                  name: `${p.targetSchool} ${p.targetCollege} ${p.targetDepartment}`,
                }
              }
            })}
          onClose={() => setShowRequest(false)}
          onConfirm={() => setShowSuccess(true)}
        />
      )}

      {showSuccess && <Modal onClose={() => setShowSuccess(false)} />}

      {showModal && (
        <Detail
          info={selectedPartner}
          onClose={() => {
            setShowModal(false)
            setSelectedPartner(null)
          }}
        />
      )}
    </div>
  )
}

export default RecommendList
