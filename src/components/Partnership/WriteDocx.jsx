import React, { useState, useEffect } from 'react'
import Dropdown from "../../assets/img/commons/arrow.svg"
import Calendar from "../../assets/img/manage/calendar.svg"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SendMail from './SendMail'

const WriteDocx = ({ id }) => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const [name, setName] = useState(null)
    const [boon, setBoon] = useState(null);
    const [storename, setStorename] = useState(null)
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange
    const [openDropdown, setOpenDropdown] = useState(null)
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [isSend, setIsSend] = useState(false); 
    const targetOptions = {
        "성신여자대학교": {
            "공과대학": ["컴퓨터공학과", "전자공학과", "화학공학과"],
            "인문대학": ["국어국문학과", "영어영문학과"],
        },
        "고려대학교": {
            "공과대학": ["기계공학과", "산업공학과"],
            "사회과학대학": ["정치외교학과", "심리학과"],
        },
        "연세대학교": {
            "공과대학": ["전기전자공학과", "신소재공학과"],
            "경영대학": ["경영학과", "회계학과"],
        }
    };
    const data = {
        councilInfo: name,
        storeName: storename,
        boon: boon,
        startDate: startDate,
        endDate: endDate,
        targetSchool: selectedUniversity,
        targetCollege: selectedCollege,
        targetDepartment: selectedDepartment,
        requester: role
    }

    const sendAssociation = () => {
        axios.post(`${BASE_URL}/associations/papers/${id}?requester=${role}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("서버 응답:", res.data)



            })
            .catch((err) => {
                console.error("제휴 요청 실패:", err)
                alert("제휴 요청 실패! 다시 시도해주세요.")
            })
    }
    useEffect(() => {
        if (isSend) {
            sendAssociation()
            setShowModal(false) 
            setIsSend(false)   
            navigate('/partnership', { state: { writeId: null } })
        }
    }, [isSend])


    return (
        <div className='writedocx_wrap '>
            <div className="title">최종 제휴 협약서</div>
            <p>최종 제휴 협약서는 직접 입력이 필요합니다.</p>

            <div className="form">

                <div className="table">
                    <p className='text'>학생회 소속</p>
                    <div className="box">
                        <input type="text" placeholder='학생회 소속' className="dropdown " onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="table">
                    <p className='text'>상호명</p>
                    <div className="box">
                        <input type="text" placeholder='상호명' className="dropdown " onChange={(e) => setStorename(e.target.value)} />
                    </div>
                </div>

                <div className="table">
                    <p className='text'>혜택</p>
                    <div className="box">
                        <input type="text" placeholder='혜택' className="dropdown " onChange={(e) => setBoon(e.target.value)} />
                    </div>
                </div>
                <div className="table">
                    <p className='text'>기간</p>
                    <div className="box">
                        <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="기간 선택"
                            className="date dropdown"
                        />
                        <img src={Calendar} alt="" className="icon" />
                    </div>
                </div>


                <div className="note selection">
                    <p className='text'>특이사항</p>
                    <input className="box" type="text" placeholder='소통, 제휴 경험 등' />
                </div>
                <div className="selection target">
                    <p className='text'>제휴 대상</p>
                    <div className="wrap">
                        <div className="dropdown-box box">
                            <div className="dropdown" onClick={() => setOpenDropdown(openDropdown === "university" ? null : "university")}>
                                <p>{selectedUniversity || "OO대학교"}</p>
                                <img src={Dropdown} alt="" className="icon" />
                            </div>
                            {openDropdown === "university" && (
                                <div className="dropdown-menu open">
                                    {Object.keys(targetOptions).map((uni) => (
                                        <div key={uni} className="dropdown-item" onClick={() => {
                                            setSelectedUniversity(uni);
                                            setSelectedCollege(null);
                                            setSelectedDepartment(null);
                                            setOpenDropdown(null);
                                        }}>
                                            {uni}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="dropdown-box box">
                            <div className="dropdown" onClick={() => setOpenDropdown(openDropdown === "college" ? null : "college")}>
                                <p>{selectedCollege || "OO단과대학"}</p>
                                <img src={Dropdown} alt="" className="icon" />
                            </div>
                            {openDropdown === "college" && selectedUniversity && (
                                <div className="dropdown-menu open">
                                    {Object.keys(targetOptions[selectedUniversity]).map((col) => (
                                        <div key={col} className="dropdown-item" onClick={() => {
                                            setSelectedCollege(col);
                                            setSelectedDepartment(null);
                                            setOpenDropdown(null);
                                        }}>
                                            {col}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <div className="dropdown-box box">
                            <div className="dropdown" onClick={() => setOpenDropdown(openDropdown === "department" ? null : "department")}>
                                <p>{selectedDepartment || "OO학과"}</p>
                                <img src={Dropdown} alt="" className="icon" />

                            </div>
                            {openDropdown === "department" && selectedUniversity && selectedCollege && (
                                <div className="dropdown-menu open">
                                    {targetOptions[selectedUniversity][selectedCollege].map((dept) => (
                                        <div key={dept} className="dropdown-item" onClick={() => {
                                            setSelectedDepartment(dept);
                                            setOpenDropdown(null);
                                        }}>
                                            {dept}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className="button_nomal" onClick={() => setShowModal(true)}>저장하기</div>
            {showModal && <SendMail item={data}  onSend={(val) => setIsSend(val)} />}

        </div>
    )
}

export default WriteDocx
