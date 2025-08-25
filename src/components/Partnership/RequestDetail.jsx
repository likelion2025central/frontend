import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RequestDetail = ({ item, onClose }) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const [user, setUser] = useState(null)


    console.log(item);
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role").toLocaleLowerCase()

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
        if (!item) return null
    return (
        <div className='requestdetail_wrap container'>
            <div className="wrap">
                {(role === "council") ?
                    <>
                        <div className="info">
                            <div className="name">{item.targetSchool} {item.targetCollege} {item.targetDepartment}</div>
                            <div className="cate">{user?.council?.email}</div>
                        </div>
                        <div className="table_list">
                            <div className="table">
                                <div className="section">업종</div>
                                <p>{item.industry}</p>
                            </div>
                            <div className="table">
                                <div className="section">혜택</div>
                                <p>{item.boon}</p>
                            </div>
                            <div className="table">
                                <div className="section">기간</div>
                                <p>{item.period}</p>
                            </div>
                            <div className="table">
                                <div className="section">제휴 희망 인원</div>
                                <p>{item.num} 명</p>
                            </div>
                            <div className="table note">
                                <div className="section">특이사항</div>
                                <p>{item.significant}</p>
                            </div>

                        </div>
                    </>
                    :
                    <>
                        <img src={item.imgUrl} alt="" />
                        <div className="info">
                            <div className="name">{user?.boss?.storeName}</div>
                            <div className="cate">{user?.boss?.phone}</div>
                        </div>
                        <div className="table_list">
                            <div className="table">
                                <div className="section">업종</div>
                                <p>{item.industry}</p>
                            </div>
                            <div className="table">
                                <div className="section">혜택</div>
                                <p>{item.boon}</p>
                            </div>
                            <div className="table">
                                <div className="section">기간</div>
                                <p>{item.period}</p>
                            </div>
                            <div className="table">
                                <div className="section">제휴 희망 인원</div>
                                <p>{item.num} 명</p>
                            </div>
                            <div className="table note">
                                <div className="section">특이사항</div>
                                <p>{item.significant}</p>
                            </div>

                        </div>

                    </>}
                <div className="btn" onClick={onClose}>확인</div>
            </div>
        </div>
    )
}

export default RequestDetail
