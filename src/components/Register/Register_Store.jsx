import React, { useEffect, useState } from 'react'
import Down from '../../assets/img/section/button_donw.svg'
import Camera from '../../assets/img/section/button_camera.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register_Store = () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const token = localStorage.getItem('role')
    const navigation = useNavigate();
    const [preview, setPreview] = useState(null);
    const [industry, setIndustry] = useState('');
    const [boon, setBoon] = useState('');
    const [period, setPeriod] = useState('');
    const [num, setNum] = useState(0);
    const [targetSchool, setTargetSchool] = useState('');
    const [significant, setSignificant] = useState('');
    const [image, setImage] = useState('');
    const [full, setFull] = useState(false);

    const SeeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (industry && boon && period && num && targetSchool && significant) {
            setFull(true);
        } else {
            setFull(false);
        }
    }, [industry, boon, period, num, targetSchool, significant]);

    const onWrite = () => {
        if (!(industry && boon && period && num && targetSchool && significant)) {
            alert("모든 칸을 채워주세요.");
            return
        }

        const formData = new FormData();
        formData.append("industry", industry);
        formData.append("boon", boon);
        formData.append("period", period);
        formData.append("num", num);
        formData.append("targetSchool", targetSchool);
        formData.append("significant", significant);
        formData.append("image", image);

        axios.post(`${baseURL}/boss/association/register`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                if(res.status === 201){
                    alert(res.data.message)
                    navigation('/main')
                }
            })
            .catch((err) => {
                console.log(err)
            });
    };

    return (

        <div className="main">
            <h2>제휴 등록하기</h2>
            <div className='put_picture'>
                <input
                    type="file"
                    id="picture"
                    accept="image/*"
                    onChange={SeeImage}
                />
                <label htmlFor="picture">
                    {preview ? (
                        <img className='see' src={preview} alt="미리보기" />
                    ) : (
                        <img src={Camera} alt="업로드 버튼" />
                    )}
                </label>
            </div>
            <div className='kind'>
                <h2>업종</h2>
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
                <h2>혜택</h2>
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
            <div className='kind'>
                <h2>희망 대학</h2>
                <div>
                    <select value={targetSchool} onChange={(e) => { setTargetSchool(e.target.value) }} >
                        <option value=""></option>
                        <option value="성신여자대학교">성신여자대학교</option>
                    </select>
                    <img src={Down} alt="" />
                </div>
            </div>
            <div className="phone">
                <h2>희망 제휴 인원</h2>
                <input value={num} onChange={(e) => setNum(Number(e.target.value))} type="number" placeholder='n명 이상, 단과대 단위 등' />
            </div>
            <div className="etc">
                <h2>특이사항</h2>
                <input value={significant} onChange={(e) => { setSignificant(e.target.value) }} type="text" placeholder='소통, 제휴 경험 등' />
            </div>
            <button className={full ? 'full' : ''} onClick={() => { onWrite() }}>등록하기</button>
        </div>
    )
}

export default Register_Store