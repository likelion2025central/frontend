import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from '../../assets/img/section/logo.svg'
import Input from '../../assets/img/section/img_input.png'
import Camera from '../../assets/img/section/button_camera.svg'
import Registser_Student from './Registser_Student'
import Down from '../../assets/img/section/button_donw.svg'

const Register = () => {
    const params = useParams();
    const [preview, setPreview] = useState(null);

    const SeeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='Register_wrap container Join_Student_wrap Login_wrap'>
            <div className="header">
                <Link to='/main'>
                    <img src={Logo} alt="" />
                </Link>
                <div></div>
            </div>
            {params.type === 'student' ? (
                <Registser_Student />
            ) : (
                <>
                </>
            )}
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
                        <select>
                            <option value=""></option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className='kind'>
                    <h2>혜택</h2>
                    <div>
                        <select>
                            <option value=""></option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className='kind'>
                    <h2>희망 기간</h2>
                    <div>
                        <select>
                            <option value=""></option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className='kind'>
                    <h2>희망 대학</h2>
                    <div>
                        <select>
                            <option value=""></option>
                        </select>
                        <img src={Down} alt="" />
                    </div>
                </div>
                <div className="phone">
                    <h2>희망 제휴 인원</h2>
                    <input type="text" placeholder='n명 이상, 단과대 단위 등' />
                </div>
                <div className="etc">
                    <h2>특이사항</h2>
                    <input type="text" placeholder='소통, 제휴 경험 등' />
                </div>
                <button>등록하기</button>
            </div>
        </div>
    )
}

export default Register