import React, { useEffect, useState } from 'react'
import Down from '../../assets/img/section/button_donw.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registser_Student = () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const token = localStorage.getItem('token');
    const navigation = useNavigate();
    const [industry, setIndustry] = useState('');
    const [boon, setBoon] = useState('');
    const [period, setPeriod] = useState('');
    const [num, setNum] = useState(0);
    const [targetSchool, setTargetSchool] = useState('');
    const [targetCollege, setTargetCollege] = useState('');
    const [targetDepartment, setTargetDepartment] = useState('');
    const [significant, setSignificant] = useState('');
    const [full, setFull] = useState(false);

    const onWrite = () => {
        if (!(industry && boon && period && num && targetSchool && targetCollege && targetDepartment && significant)) {
            alert("모든 칸을 채워주세요.");
            return
        }

        const body = {
            "industry": industry,
            "boon": boon,
            "period": period,
            "num": num,
            "targetSchool": targetSchool,
            "targetCollege": targetCollege,
            "targetDepartment": targetDepartment,
            "significant": significant
        }

        axios.post(`${baseURL}/council/association/register`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if(res.status === 201){
                    alert(res.data.message);
                    navigation('/main')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (industry && boon && period && num && targetSchool && targetCollege && targetDepartment && significant) {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [industry, boon, period, num, targetSchool, targetCollege, targetDepartment, significant]);


    return (
        <div className="main">
            <h2>제휴 등록하기</h2>
            <div className='kind'>
                <h2>희망 업종</h2>
                <div>
                    <select value={industry} onChange={(e) => { setIndustry(e.target.value) }} >
                        <option value=""></option>
                        <option value="식사">식사</option>
                        <option value="카페">카페</option>
                        <option value="여가">여가</option>
                        <option value="생활">생활</option>
                        <option value="서비스">서비스</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className='kind'>
                <h2>희망 혜택</h2>
                <div>
                    <select value={boon} onChange={(e) => { setBoon(e.target.value) }} >
                        <option value=""></option>
                        <option value="전품목 10% 할인">전품목 10% 할인</option>
                        <option value="전품목 5% 할인">전품목 5% 할인</option>
                        <option value="일부 품목 5% 할인">일부 품목 5% 할인</option>
                        <option value="일부 품목 10% 할인">일부 품목 10% 할인</option>
                        <option value="추가 서비스 제공">추가 서비스 제공</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className='kind'>
                <h2>희망 기간</h2>
                <div>
                    <select value={period} onChange={(e) => { setPeriod(e.target.value) }} >
                        <option value=""></option>
                        <option value="6개월">6개월</option>
                        <option value="12개월 (1년)">12개월 (1년)</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className="college">
                <h2>제휴 대상</h2>
                <div>
                    <div>
                        <select value={targetSchool} onChange={(e) => { setTargetSchool(e.target.value) }} >
                            <option value="">OO대학교</option>
                            <option value="성신여자대학교">성신여자대학교</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                    <div>
                        <select value={targetCollege} onChange={(e) => { setTargetCollege(e.target.value) }} >
                            <option value="">OO대학</option>
                            <option value="공학대학">공학대학</option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className='major'>
                    <select value={targetDepartment} onChange={(e) => { setTargetDepartment(e.target.value) }} >
                        <option value="">OO학과</option>
                        <option value="컴퓨터공학과">컴퓨터공학과</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className="phone">
                <h2>제휴 인원</h2>
                <input value={num} onChange={(e) => setNum(Number(e.target.value))} type="number" placeholder='n명' />
            </div>
            <div className="etc">
                <h2>특이사항</h2>
                <input value={significant} onChange={(e) => { setSignificant(e.target.value) }} type="text" placeholder='소통, 제휴 경험 등' />
            </div>
            <button className={full ? 'full' : ''} onClick={() => { onWrite() }}>등록하기</button>
        </div>
    )
}

export default Registser_Student