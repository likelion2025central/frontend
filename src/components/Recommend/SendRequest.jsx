import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const SendRequest = ({ id, partners, onClose, onConfirm }) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const [user, setUser] = useState(null)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

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
    }, [BASE_URL])

    const sendMail = () => {
        axios.post(`${BASE_URL}/associations`, {
            requesterType: role,
            requesterId: id,
            targetIds: partners.map(p => p.id)
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("서버 응답:", res.data)
                onConfirm()
                onClose(true);
            })
            .catch((err) => {
                console.error("제휴 요청 실패:", err)
                alert("제휴 요청 실패! 다시 시도해주세요.")
            })
    }


    return (
        <div className='sendrequest_wrap container'>
            <div className="wrap">
                <div className="title">
                    아래 내용으로 {partners.length}곳의 제휴처에 <br />
                    요청을 보내시겠습니까?
                </div>
                <div className="sub_title">
                    본 내용은 상대방 대표 이메일(또는 가게 연락처)로 전송합니다.
                </div>

                <div className="tag">
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                    >
                        {partners.map((p) => (
                            <SwiperSlide key={p.id}>
                                [제휴고리 알림] 제휴 요청이 도착했습니다.
                                <br />
                                <br />[{p.name}] ↔ {user?.role === "COUNCIL"
                                    ? `[${user?.council?.schoolName} ${user?.council?.college} ${user?.council?.department}]`
                                    : `[${user?.boss?.storeName}]`
                                }
                                <br />
                                <br />
                                {user?.role === "COUNCIL" && (
                                    <>👉 학생회 이메일 | {user?.council?.email}</>
                                )}
                                {user?.role === "BOSS" && (
                                    <>👉 가게 연락처 | {user?.boss?.phone}</>
                                )}
                                <br />👉 간단 협약서 바로가기 | https://jehugori.com
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

                <div className="btns">
                    <div className="btn close" onClick={onClose}>취소</div>
                    <div className="btn" onClick={sendMail}>확인</div>
                </div>
            </div>
        </div>
    )
}

export default SendRequest
