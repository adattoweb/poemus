import { useState } from 'react'

import HistoryItem from "../ui/HistoryItem"

export default function History({isEn}){
    const [isRender, setIsRender] = useState(false)

    let localKeys = Object.keys(localStorage).filter(el => el.includes("poemus-item-"))
    localKeys = localKeys.sort((a, b) => +localStorage.getItem(b).split("@")[6] - +localStorage.getItem(a).split("@")[6]) // сортування по даті
    const errors = +localStorage.getItem("poemus-errors")  // якщо буде бажання, то перепиши на власний хук useLocal()
    const views = +localStorage.getItem("poemus-views")
    const poems = +localStorage.getItem("poemus-poems")
    const len = +localStorage.getItem("poemus-len")

    const calcPer = 100 - Math.round((errors / len) * 100)
    const percent = calcPer < 0 ? 0 : calcPer

    const elementsOnPage = 20;
    const [page, setPage] = useState(1)
    let pages = []
    for(let i = 0; i < Math.ceil(localKeys.length / elementsOnPage); i++){
        pages.push(i+1)
    }
    console.log((page-1)*elementsOnPage)
    console.log(page*elementsOnPage-1)
    console.log(localKeys)

    return (
        <div className="history__wrapper flex flex-col items-center">
            <div className="history__header flex flex-col md:flex-row justify-center  p-[10px] gap-[5px] md:gap-[15px] poemus w-[200px] md:w-[70vw] rounded-[15px] md:items-center py-[15px] mona">
                <p>{isEn ? "Poems" : "Віршів"}: {poems}</p>
                <p>{isEn ? "Lines" : "Рядків"}: {len}</p>
                <p>{isEn ? "Mistakes" : "Помилок"}: {errors}</p>
                <p>{isEn ? "Reveals" : "Підглядувань"}: {views}</p>
                <p>
                    {isEn ? "Success" : "Успіх"}: {errors === 0 ? 100 : percent >= 100 ? 0 : percent}%
                </p>

            </div>
            <div className="history__list mt-[40px] gap-[15px] md:gap-[25px] flex flex-col items-center">
                {localKeys.filter((el, index) => index >= (page-1)*elementsOnPage && index <= page*elementsOnPage-1).map((el, index) => {
                    return <HistoryItem isEn={isEn} key={el+index} localKey={el} setRender={() => setIsRender(!isRender)}/>
                })}
                {localKeys.length === 0 && <p className="poemus p-[10px] rounded-[5px]">{isEn ? "It's empty here ;(" : "Тут пусто ;("}</p>}
            </div>
            <div className="history__footer w-[90vw] sm:w-[65vw] poemus rounded-[15px] h-[55px] mt-[70px] flex gap-[10px] items-center">
                {pages.map((el, index) => {
                    return <p key={index} className={el === page ? "active" : ""} onClick={() => setPage(el)}>{el}</p>
                })}
            </div>
        </div>
    )
}
// 1 --> 0, 24
// 2 --> 25, 49
// 3 --> 50, 74