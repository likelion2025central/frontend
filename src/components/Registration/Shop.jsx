import React, { useState, useRef } from "react";
import Dropdown from "../../assets/img/commons/arrow.svg";
import Camera from "../../assets/img/register/camera.svg"

const Shop = () => {
  const formItems = [
    {
      key: "shop_type",
      label: "업종",
      options: ["식당", "카페", "편의점", "서비스", "기타"],
    },
    {
      key: "shop_benefit",
      label: "혜택",
      options: [
        "전품목 5% 할인",
        "전품목 10% 할인",
        "일부품목 5% 할인",
        "일부품목 10% 할인",
        "추가 서비스 제공",
      ],
    },
    {
      key: "shop_term",
      label: "희망 기간",
      options: ["6개월", "12개월(1년)"],
    },
  ];

  const [selected, setSelected] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSelect = (key, option) => {
    setSelected((prev) => ({ ...prev, [key]: option }));
    setOpenDropdown(null);
  };


  const handleClick = () => {
    fileInputRef.current.click(); 
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="shop_wrap">
      <div className="title">제휴 등록하기</div>

      <div className="file " onClick={handleClick}>
        {preview ? (
          <img src={preview} alt="preview" className="preview"/>
        ) : (
          <div className="file_input"><img src={Camera} alt="" /></div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />


      <div className="seletion">
        {formItems.map((item) => (
          <div key={item.key} className={`table ${item.key}`}>
            <p className="text">{item.label}</p>
            <div className="selection box">
              <div
                className="dropdown"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
              >
                {selected[item.key] || `${item.label} 선택`}
                <img src={Dropdown} alt="" className="icon" />
              </div>

              {openDropdown === item.key && (
                <div
                  className={`dropdown-menu ${openDropdown === item.key ? "open" : ""
                    }`}
                >
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

        <div className="note table">
          <p className="text">희망 제휴 인원</p>
          <input
            className="box"
            type="text"
            placeholder="n명 이상, 단과대 단위 등"
          />
        </div>
        <div className="note table">
          <p className="text">특이사항</p>
          <input
            className="box"
            type="text"
            placeholder="소통, 제휴 경험 등"
          />
        </div>
      </div>
      <div className="button_nomal">등록하기</div>
    </div >
  );
};

export default Shop;
