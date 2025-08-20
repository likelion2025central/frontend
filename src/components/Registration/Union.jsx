import React, { useState } from 'react'
import Dropdown from "../../assets/img/commons/arrow.svg"

const Union = () => {
  const formItems = [
    {
      key: "hope_type",
      label: "희망 업종",
      options: ["식사", "카페", "여가", "생활", "서비스"],
    },
    {
      key: "hope_benefit",
      label: "희망 혜택",
      options: ["전품목 5% 할인",
        "전품목 10% 할인",
        "일부품목 5% 할인",
        "일부품목 10% 할인",
        "추가 서비스 제공"],
    },
    {
      key: "hope_term",
      label: "희망 기간",
      options: ["6개월", "12개월(1년)"],
    },
  ]
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


  const [selected, setSelected] = useState({})
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleSelect = (key, option) => {
    setSelected(prev => ({ ...prev, [key]: option }))
    setOpenDropdown(null)
  }

  return (
    <div className='union_wrap'>
      <div className="title">제휴 등록하기</div>

      <div className="form">
        {formItems.map(item => (
          <div key={item.key} className={`table ${item.key}`}
            onClick={() =>
              setOpenDropdown(openDropdown === item.key ? null : item.key)
            }>
            <p className='text'>{item.label}</p>
            <div className="selection box">
              <div
                className="dropdown text"

              >
                {selected[item.key] || ""}
                <img src={Dropdown} alt="" className="icon" />
              </div>

              {openDropdown === item.key && (
                <div className={`dropdown-menu text ${openDropdown === item.key ? "open" : ""}`}>
                  {item.options.map((opt, i) => (
                    <div
                      key={i}
                      className="dropdown-item"
                      onClick={() => handleSelect(item.key, opt)}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
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
        <div className="note selection">
          <p className='text'>특이사항</p>
          <input className="box" type="text" placeholder='소통, 제휴 경험 등' />
        </div>
      </div>
      <div className="button_nomal">등록하기</div>
    </div>
  )
}

export default Union
